import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import userpool from './userpool';
import { toast } from 'react-toastify';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        navigate('/signup')
    }

    const user = new CognitoUser({
        Username: email,
        Pool: userpool
    })

    
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    })

    const loginUser = async (event) => {
        setLoading(true)
        event.preventDefault()
        console.log(email, password)
        user.authenticateUser(authDetails, {

            onSuccess: (data) => {
                console.log(data)
                setLoading(false)
                navigate('/home')
                localStorage.setItem("usertoken",  data.getAccessToken().getJwtToken());
                localStorage.setItem("refreshToken", data.getIdToken().getJwtToken());
                localStorage.setItem("idToken", data.getRefreshToken().getToken());
                user.getUserAttributes(function(err, result) {
                    if (err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }
                    for (let i = 0; i < result.length; i++) {     
                        localStorage.setItem("userId",  result[0].getValue())
                        localStorage.setItem("userName",  result[2].getValue())
                        
                    }
                });
                // return (
                //     <Alert severity="success">This is a success alert — check it out!</Alert>)

            },
            onFailure: (err) => {
                setLoading(false)
                console.log("onFailure", err)
                return ({ statusCode: 400, response: err.message || JSON.stringify(err)});
                }
        })

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', backgroundColor: 'rgb(250,251,251)' }}
        >
            <div className='loginCard' style={{ marginTop: '50px' }}>
                <form onSubmit={loginUser}>
                    <h2 style={{ marginBottom: '10px' }}>Welcome to Serverless Tweets</h2>
                    <p>New to Serverless Tweet? <b style={{ color: '#363062', cursor: 'pointer' }} onClick={handleClick}>Create an account</b> </p>
                    <div className='email'>
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}></input>
                    </div>
                    <div className='password'>
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}></input>
                    </div>
                    {loading ?
                        <div className='loadingButton' >
                            <button type="submit"><CircularProgress style={{ width: '30px', color: '#fff' }} /></button>
                        </div>
                        :
                        <div className='loginButton' >
                            <button type="submit"> Login</button>
                        </div>
                    }
                </form>
            </div>

        </div>
    )
}

export default Login