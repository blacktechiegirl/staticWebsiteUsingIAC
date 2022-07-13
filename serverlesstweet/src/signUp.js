import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import userpool from './userpool';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const SignUp = () => {
    const attributeList = []
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    var dataUsername = {
        Name: 'name',
        Value: username,
    };

    var attributeUsername = new CognitoUserAttribute(dataUsername);
    attributeList.push(attributeUsername);
    console.log(attributeList)

    const onSubmit =(event)=>{
        setLoading(true)
        event.preventDefault()
        userpool.signUp(email, password,attributeList,null,  (err, result) => {
            if (err) {              
             console.log(err);
             toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER,
              });
              setLoading('false')
            } else {
             console.log(result);
             toast.success('You have signed up successfully', {
                position: toast.POSITION.TOP_CENTER,
              });
              setLoading(false)
              navigate('/')
            }
           })
        }
   console.log(email,password)      

    return (
        <div className = 'contain' style={{ display: 'flex',height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(250,251,251)' }}
        >
            <div className='loginCard' style={{ height: '450px'}}>
                <form onSubmit={onSubmit}>
                    <h2 style={{textAlign: 'center'}}>Sign Up</h2>
                    <div className='email'>
                        <label >UserName</label>
                        <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div className='email'>
                        <label >Email</label>
                        <input
                         value={email}
                         onChange={(event) => setEmail(event.target.value)}></input>
                    </div>
                    <div className='password'>
                        <label>Enter Password</label>
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
                        <button type="submit"> SignUp</button>
                    </div>}
                    
                </form>
            </div>

        </div>
    )
}

export default SignUp