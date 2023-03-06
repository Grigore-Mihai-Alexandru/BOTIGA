import {Link} from "react-router-dom";
import "../styles/Navbar.css";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';

const SidebarNav = ({width, productsAmount, setCollapse, collapse}) => {      
    return (
        <div id="sidenav" className="position-relative start-0 sidebar" 
            style={{
                visibility:collapse?"visible":"hidden",
                opacity:!collapse?0:1,
                transition:"all 0.3s",
                width:width>280 ?"280px":"100%",
                transform:collapse?"translateX(0px)":"translateX(-200px)"
            }}
        >
            <div className="position-relative">
                <ul className="sidebar-list my-4 fs-5">
                    <li className="nav-item">
                        <Link className="nav-link p-2" aria-current="page" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link p-2" >Blog</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link p-2" to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link p-2" to="/contact">Contact</Link>
                    </li>
                </ul>
                <div className="position-absolute top-0 end-0">
                    <button className="btn" onClick={() => setCollapse(false)}>
                        <CloseIcon/>
                    </button>
                </div>
            </div>
            <div>
                <ul className="navbar-nav d-flex flex-row justify-content-between mb-lg-0 mx-5">
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
    );
}
 
export default SidebarNav;