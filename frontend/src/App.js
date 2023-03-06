import "./styles/styles.css";
import "./index.css";
import { useState, useEffect, useLayoutEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Cookies, withCookies } from "react-cookie";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/404";
const URL="http://localhost:5000";


function App() {
  const [loading, setLoading] = useState(true);  
  const [deviceSize,setDeviceSize] = useState(window.innerWidth);
  const [admin,setAdmin] = useState(false);
  const [logged,setLogged] = useState(false);
  const [cartProducts,setCartProducts] = useState([]); 
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  
  async function getAuthorizationAndCartProducts(){
    const cookies = new Cookies()
    const cookie = cookies.get("loggedIn")
    
    if(typeof cookie === "string" && cookie !==""){
        const objSend = {cookie:cookie}
        const req = await axios.post(`${URL}/api/authorization`,objSend,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }})
            .then(r=>r.data)
        if(req.admin === true){
          setAdmin(true)
          setLogged(true)
        }else if(req.admin === false)
          setLogged(true)
        else if(req === false)
          setLogged(false)
        
        setUserId(req._id)
        setUsername(req.name)
        const cart = await axios.post(`${URL}/api/cart`,objSend,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }})
          .then(r=>r.data)
        setCartProducts(cart)
    }
  }
  useEffect(()=>{
    getAuthorizationAndCartProducts();
  },[])

  useLayoutEffect(()=>{
    function getDeviceSize(){
        setDeviceSize(window.innerWidth)
    }
    window.addEventListener('resize',getDeviceSize)
    return () => {
        window.removeEventListener('resize', getDeviceSize);
    };
  },[])

  useEffect(()=>{
    const loadData = async () =>{
      await new Promise((r)=>setTimeout(r,1200))
      setLoading(!loading)
    }
    loadData()
  },[])

  
  if(loading)
    return( 
      <div className="loader"></div>
    )
    else
      return (
        <Router forceRefresh={true}>
          <Layout cartProducts={cartProducts} deviceSize={deviceSize} admin={admin} logged={logged}>
            <Routes forceRefresh={true}>
              <Route exact path="/" element={<Home logged={logged} deviceSize={deviceSize}/>}/>
              <Route exact path="/admin" element={<Admin deviceSize={deviceSize} userId={userId} logged={logged} admin={admin}/>}/>
              <Route exact path="/shop" element={<Shop deviceSize={deviceSize} logged={logged} admin={admin}/>}/>
              <Route exact path="/shop/product/:id" element={<Product deviceSize={deviceSize} logged={logged}/>}/>
              <Route exact path="/account" element={<Account deviceSize={deviceSize} admin={admin} logged={logged} username={username}/>}/>
              <Route exact path="/cart" element={<Cart cartProducts={cartProducts} deviceSize={deviceSize} logged={logged} admin={admin}/>}/>
              <Route exact path="/contact" element={<Contact deviceSize={deviceSize}/>}/>
              <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
          </Layout>
        </Router>
      );
  }
export default withCookies(App);