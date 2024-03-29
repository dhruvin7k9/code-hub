import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cpform from './components/Cpform/index';
import ViewQuestion from './components/ViewQuestion';
import AddQuestions from './components/AddQuestions';
import AddBlog from './components/AddBlog';
import ViewBlog from './components/ViewBlog';
import EditQuestion from './components/EditQuestion';
import EditBlog from './components/EditBlog';
import EditProfile from './components/EditProfile';
import Auth from './components/Auth/Auth';
import Users from './components/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import UserProfile from './components/UserProfile/UserProfile';

// Create a context to manage authentication state globally
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({
          uid: user.uid,
          photo: user.photoURL,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>;
};

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
            <Header />
            <Routes>
              <Route
                path="/auth"
                element={
                  user ? <Navigate to="/" /> : <Auth />
                }
              />
              <Route
                path="/add-question"
                element={
                  user ? <AddQuestions /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/edit-question/:id"
                element={
                  user ? <EditQuestion /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/question/:id"
                element={
                  user ? <ViewQuestion /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/users"
                element={
                  <Users />
                }
              />
              <Route
                path="/user/:id"
                element={
                  <UserProfile />
                }
              />
              <Route
                path="/edit-user/:id"
                element={
                  user ? <EditProfile /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/blog/:id"
                element={
                  user ? <ViewBlog /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/add-blog"
                element={
                  user ? <AddBlog /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/edit-blog/:id"
                element={
                  user ? <EditBlog /> : <Navigate to="/auth" />
                }
              />
              <Route
                path="/blogs"
                element={
                  <Cpform />
                }
              />
              <Route
                path="/"
                element={
                  <Cpform />
                }
              />
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
