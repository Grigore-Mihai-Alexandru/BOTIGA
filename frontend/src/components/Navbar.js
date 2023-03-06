import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "../styles/Navbar.css";
import SidebarNav from "./SidebarNav";
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Navbar = ({deviceSize, cartProducts, admin}) => {
    const [collapse, setCollapse] = useState(false);
    const [productsAmount, setProductsAmount] = useState(0)

    useEffect(()=>{
        if(deviceSize<995)
            setCollapse(false)
        },[deviceSize])
        
    useEffect(()=>{
        if (collapse && typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }else if(!collapse)
            document.body.style.overflow = 'auto';
    },[collapse])

    const changeCollapse = () => {
        setCollapse(!collapse);
    }

    useEffect(()=>{
        if(cartProducts.length>0)
            cartProducts.forEach(product => {
                setProductsAmount(prev => prev + product.quantity)
            })
    },[cartProducts])
    //hide navbar after link or body were clicked
    useEffect(()=>{
        document.addEventListener("click", e => {
            const button = e.target.closest("#sidebar-button")
            const sideLinks = e.target.closest("#sidenav div ul li a")
            const sidenav = e.target.closest("#sidenav")
            if(sidenav===null && button===null){
                setCollapse(false)
            }else if(sideLinks!==null)
                setCollapse(false)
        })
    },[collapse])

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <Link className="navbar-brand position-absolute start-50 fw-semibold fs-3" style={{marginLeft:"-70px"}} to="/">B O T I G A</Link>
            {deviceSize>995 &&
                <div>
                    <div className="mx-5 d-flex">
                        <ul className="navbar-nav d-flex mb-lg-0 fs-5">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" >Blog</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-lg-0 position-absolute end-0 mx-5">
                            <li className="nav-item">
                                <Link className="nav-link mx-2" to="/"><SearchRoundedIcon fontSize="large"/></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-2" to="/account"><PermIdentityIcon fontSize="large"/></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link mx-2 position-relative" to="/cart">
                                    <ShoppingCartOutlinedIcon fontSize="large"/>
                                    <span className="position-absolute fs-6 products-count">{productsAmount < 10 ? productsAmount:"9+"}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            {deviceSize<=995 &&
            <>
                <SidebarNav collapse={collapse} setCollapse={setCollapse} width={deviceSize} productsAmount={productsAmount}/>
            
                <MenuIcon id="sidebar-button" fontSize="large" className="position-absolute end-0 mx-4" style={{cursor:"pointer"}} onClick={changeCollapse}/>
            </>
            }   
        </nav>
    );
}
export default Navbar;

//springBoot  java docker 