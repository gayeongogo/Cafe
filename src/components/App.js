/* import React, { useState, useEffect } from 'react'; */
import { Routes, Route } from "react-router-dom";
import GlobalStyle from './GlobalStyle';
import Home from "./Home";
import Recode from "./Recode";
import EditRecode from "./EditRecode";
import SignUp from "./SignUp";
import Login from "./Login";
/* import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth'; */

export default function App() {
  /* const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []); */

  return (
    <div>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/recode" element={<Recode />} />
        <Route path="/edit/:id" element={<EditRecode />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
