import { Link } from "react-router-dom";
import "../styles/Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer className="mt-auto">
            <div className="row">
                <div className="col-md-6 p-4">
                    <h3>Botiga</h3>
                    <p>Give your customers insight into your product collection.</p>
                </div>
                <div className="col-md-3 p-4">
                    <h4>Quick links</h4>
                    <Link to="/" className="nav-link py-2">Home</Link>
                    <Link className="nav-link py-2">Blog</Link>
                    <Link to="/shop" className="nav-link py-2">Shop</Link>
                </div>
                <div className="col-md-3 p-4">
                    <h4>About</h4>
                    <Link to="/contact" className="nav-link py-2">Shipping</Link>
                    <Link to="/contact" className="nav-link py-2">Terms</Link>
                    <Link to="/contact" className="nav-link py-2">Policy</Link>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-6">
                    <a href="https://facebook.com" className="p-2">
                        <FacebookIcon/>
                    </a>
                    <a href="https://twitter.com" className="p-2">
                        <TwitterIcon/>
                    </a>
                    <a href="https://instagram.com" className="p-2">
                        <InstagramIcon/>
                    </a>
                </div>
                <div className="col-sm-6 text-end pt-2">
                    © 2022 Botiga. Proudly powered by Botiga
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;