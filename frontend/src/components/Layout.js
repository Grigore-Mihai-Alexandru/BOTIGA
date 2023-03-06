import { useLocation } from "react-router-dom";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from "react";

const Layout = ({children, cartProducts, admin, deviceSize}) => {
    let mybutton = document.getElementById("myBtn");

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 || window.screenTop >20) 
            mybutton.style.display = "block";
        else 
            mybutton.style.display = "none";
    }

    //everytime on routeChange scroll to top
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="d-flex flex-column justify-between position-relative" style={{minHeight:"100vh"}}>
            <Navbar cartProducts={cartProducts} deviceSize={deviceSize} admin={admin}/>
            {children}
            <Footer/>
            <button id="myBtn" className="position-fixed"
                style={{
                    right:"10px", 
                    bottom:"20px", 
                    color:"white", 
                    zIndex:"99",
                    border:"black 1px solid ",
                    borderRadius:"20px"
                }}
                onClick={()=> {window.scroll(0,0)}}
            >
                <KeyboardArrowUpIcon fontColo fontSize="large"/>
            </button>
        </div>
     );
}
 
export default Layout;