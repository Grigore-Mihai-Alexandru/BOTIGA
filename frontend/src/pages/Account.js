import "../styles/Account.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import env from "react-dotenv";
const URL = env.FETCH_API;

const Account = ({logged, deviceSize, username, admin }) => {
    const [loginActive,setLoginActive] = useState(true);
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [loggedIn, setLoggedIn, removeLoggedIn] = useCookies(["loggedIn"]);

    //put code in app
    //send user info data (cart,admin=false/true)
    
    function activateLogin(){
        setLoginActive(true);
        setEmail("");
        setName("");
        setPassword("");
    }
    function activateRegister(){
        setLoginActive(false);
        setEmail("");
        setName("");
        setPassword("");
    }
    
    
    async function loginSubmit(e){
        e.preventDefault();
        const data = new FormData()
        data.append("name", name)
        data.append("password", password)
        const req = await axios.post(`${URL}/api/account/login`, data,{ headers: { "Content-Type": "multipart/form-data" } })
            .then((req=>req.data))
        if(typeof req == "string" && req != ""){
            setLoggedIn("loggedIn",req);
            window.location.reload();
        }else console.log("wrong password")
    }
    

    async function registerSubmit(e){
        e.preventDefault();
        const data = new FormData()
        data.append("name", name)
        data.append("password", password)
        data.append("email", email)
        setName("")
        setPassword("")
        setEmail("")
        const req = await axios.post(`${URL}/api/account/register`, data,{ headers: { "Content-Type": "multipart/form-data" } })
            .then((req=>req.data))
        if(req){
            window.location.reload()
        }
        else {
            alert("User already exists")
        }
    }

    function logout(){
        removeLoggedIn("loggedIn")
        window.location.reload()
    }
    
    return (
        <div>
            <div><p className="fs-1 fw-semibold text-center mt-4 pt-4">My account</p></div>
            {!logged &&
                <div className="row my-4 w-75 m-auto">
                    <div className="col-6">
                        <button className="btn fs-2" onClick={activateLogin}>Login</button>
                    </div>
                    <div className="col-6 text-end">
                        <button className="btn fs-2" onClick={activateRegister}>Register</button>
                    </div>
                </div>
            }
            {!logged &&
                <div className="row my-4 mx-auto">
                    <div className="account-form border border-light m-auto" style={{width:deviceSize<600?"100%":"75%"}}>
                    {loginActive && 
                            <form  className="login-form d-flex flex-column p-4" style={{width:deviceSize<600?"100%":"90%"}} onSubmit={loginSubmit}>
                                <label>Username or email address <span className="text-danger">*</span></label>
                                <input className="form-control border border-dark" type="text" required
                                    name="name/email" onChange={(e)=>setName(e.target.value)}/>
                                <label>Password <span className="text-danger">*</span></label>
                                <input className="form-control border border-dark" type="password" required
                                    name="password" onChange={(e)=>setPassword(e.target.value)}/>
                                <button type="submit" className="btn btn-dark mt-4  py-2 text-center" style={{width:"100px"}}>Login</button>
                            </form>
                    }
                    {!loginActive &&
                        <form className="register-form d-flex flex-column p-4" style={{width:deviceSize<600?"100%":"90%"}} onSubmit={registerSubmit}>
                            <label>Username<span className="text-danger">*</span></label>
                            <input className="form-control border border-dark" type="text" required
                                name="name" onChange={(e)=>setName(e.target.value)}/>
                            <label>Email<span className="text-danger">*</span></label>
                            <input className="form-control border border-dark" type="email" required
                                name="email" onChange={(e)=>setEmail(e.target.value)}/>
                            <label>Password <span className="text-danger">*</span></label>
                            <input className="form-control border border-dark" type="password" required
                                name="password" onChange={(e)=>setPassword(e.target.value)}/>
                            <button type="submit" className="btn btn-dark mt-4 py-2 text-center" style={{width:"100px"}}>Register</button>
                        </form>
                    }
                    </div>
                </div>
            }
            {logged &&
                <div className="my-4">
                    <div className="m-auto border border-dark-subtle p-3 text-center" style={{width:deviceSize>600?"50%":"80%"}}>
                        <h2>Hello {username}!</h2>
                        <div className="d-flex justify-content-between my-4">
                            <button className="link black-button" onClick={logout}>Logout</button>
                            {admin &&
                                <Link to="/admin">
                                    <button className="black-button">Go to Admin</button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Account;