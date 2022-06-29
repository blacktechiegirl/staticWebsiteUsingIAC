import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tweets from './viewTweets.js'
import Login from './Login.js';
import SignUp from './signUp'

const App = () =>{
    return(
<Router>
    <Routes>
        <Route path='/home' exact element={<Tweets/>}/>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/signup' exact element={<SignUp/>}/>
    </Routes>
</Router>
    )

}

export default App