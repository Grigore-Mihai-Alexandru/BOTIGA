import "../../styles/Shop.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
const URL = "http://localhost:5000"

const ProductCard = ({id, _id, logged, name, price, photo, deviceSize}) => {
    const [hover,setHover] = useState(false);
    //use hook to add it to cart when page isnt reloading

    async function addToCart(){
        const cookies = new Cookies()
        const cookie = cookies.get("loggedIn")

        //add product to user db
        if(typeof cookie === "string" && cookie !=="" && logged){
            let objSend = {cookie:cookie}
            const user = await axios.post(`${URL}/api/authorization`,objSend,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }})
              .then(r=>r.data)
            objSend = {productId:id, userId:user._id, quantity:1}
            const req = await axios.post(`${URL}/api/add-to-cart`,objSend,{headers:{"Content-type":"application/x-www-form-urlencoded"}})
                .then(r=>r.data)
            if(req){
                window.location.reload();
            }

        }else
            alert("Please log in!")
        //add product to cookies
        // use just logged in to add to cart
        
    } 

    return (
        <div key={id} className="col-6 col-md-4 product-card text-center px-2 px-sm-4">
            <div className="position-relative d-flex justify-center">
                <Link to={"/shop/product/"+id}>
                    <div 
                        onMouseLeave={()=>setHover(false)}
                        className="image-hover"
                        style={{
                            visibility:hover?"visible":"hidden",
                            opacity:!hover?0:1,
                            transition:"opacity 0.3s"
                        }}
                    >
                        <button 
                            style={{fontSize:deviceSize<400?"20px":"0px"}}
                            className="image-hover-btn position-absolute fs-6 sm:fs-5 md:fs-4 link black-button">
                            View product
                        </button>
                    </div>
                    <img style={{backgroundColor:"rgba(200,200,200,0.5)"}}
                        onMouseEnter={()=>setHover(true)}
                        className="product-card-img" 
                        src={photo!==undefined?"/uploaded-products/"+photo:"/uploaded-products/fallback.jpg"}
                        alt={name}
                    />
                </Link>
            </div>
            <div className="p-2  d-flex flex-column justify-content-between">
                <div>
                    <p className="fw-semibold fs-6 sm:fs-5 md:fs-4">{name}</p>
                    <p className="fw-bold fs-6 sm:fs-5 md:fs-4">${price}</p>
                </div>
                <div>
                    <button 
                        style={{fontSize:deviceSize<400?"10px":"20px",padding:deviceSize<530?"7px":(deviceSize<320?"5px":"10px")}}
                        className="link black-button" onClick={addToCart}
                    >
                        ADD TO CART
                    </button>

                </div>
            </div>
        </div>   
    );
}
 
export default ProductCard;