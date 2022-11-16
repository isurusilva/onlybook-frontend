import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar/AppBar";
import BookCard from "./components/BookCard/BookCard";

import Home from "./pages/Home/Home";
import UserContext, { UserProvider } from "./Utill/UserContext";
import { useContext, useState } from "react";
import HomePage from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import AboutUs from "./pages/AboutUs/AboutUs";
import AppBar from "./components/AppBar/AppBar";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const [user, setUser] = useState({
    userId: null,
    role: null,
  });
  return (
    <UserProvider setUser={setUser} user={user}>
      <Router>
             
         
            {user.userId != null && user.role != null ? (
              <>
              <AppBar/>
              {/* <Routes>    
                <Route exact path="/" element={<HomePage />}></Route>
                <Route exact path="/profile" element={<Profile />}></Route>
                <Route exact path="/search" element={<Search />}></Route>
                <Route exact path="/aboutus" element={<AboutUs />}></Route>
                </Routes> */}
              </>
            ) : (
              <>
               <Routes>  
                <Route exact path="/" element={<SignIn />}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
                </Routes>
              </>
            )}
        
      
      </Router>
    </UserProvider>
  );
}

export default App;
