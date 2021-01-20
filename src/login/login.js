import React from "react"
import {Link} from "react-router-dom"
import './login.css'


export default class LoginPage extends React.Component {
    render() {
        const {email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,setHasAccount,emailError,passwordError} = this.props;
    
        return (
            <section className="login">
                <div className = "loginContainer">
                    <label>Username</label>
                    <input type = "text" autoFocus required value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                    <p className="errorMsg">{emailError}</p>
                    <label>Password</label>
                    <input type="password" required value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>
                    <p className="errorMsg">{passwordError}</p>
                    <div className="btnContainer">
                        { hasAccount ? <div>
                            
                            <button className="login-1" onClick={handleLogin}>Login</button>
                            <p> Don't have an account?<span onClick={()=> setHasAccount(!hasAccount)}>Sign Up</span></p>
                            
                        </div> :
                        <div>
                            
                            <button className="login-2" onClick={handleSignup}>Sign Up</button>
                            <p> Have an account?<span onClick={()=> setHasAccount(!hasAccount)}>Sign In</span></p>
                            
                        </div>

                        }
                    </div>
                </div>

            </section>
        )
    }
}

