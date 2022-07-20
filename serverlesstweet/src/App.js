import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tweets from './viewTweets.js'
import Login from './Login.js';
import SignUp from './signUp';
import ForgotPass from './ForgotPass.js';



const App = () =>{
    return(
<Router>
    <Routes>
        <Route path='/home' exact element={<Tweets/>}/>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/signup' exact element={<SignUp/>}/>
        <Route path='/reset/password' exact element={<ForgotPass/>}/>
    </Routes>
</Router>
    )

}

export default App