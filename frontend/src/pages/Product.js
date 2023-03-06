import "../styles/Product.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";
import ProductQuantity from "../components/shop/ProductQuantity";
import env from "react-dotenv";
const URL = env.FETCH_API

const Product = ({logged, deviceSize}) => {
    let {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const findProduct = async() =>{
        const data = await axios.post(`${URL}/api/find-product`,{id:id},{headers:{"Content-type":"application/x-www-form-urlencoded"}})
            .then(r=>r.data)
        setProduct(data)
      }
      findProduct()
    },[id]);

    useEffect(()=>{
        async function getProducts(){
            const data = await axios.get(`${URL}/api/shop/related-products/${id}`).then(res=>res.data)
            setProducts(data);
        }
        getProducts();
    },[id])

    async function addToCart(){
        const cookies = new Cookies()
        const cookie = cookies.get("loggedIn")
        //add product to user db
        if(typeof cookie === "string" && cookie !=="" && logged){
            let objSend = {cookie:cookie}
            const user = await axios.post(`${URL}/api/authorization`,objSend,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }})
              .then(r=>r.data)
            objSend = {productId:id, userId:user._id, quantity:quantity}
            const req = await axios.post(`${URL}/api/add-to-cart`,objSend,{headers:{"Content-type":"application/x-www-form-urlencoded"}})
                .then(r=>r.data)
            if(req){
                window.location.reload();
            }

        }
    }
    const imagePath = URL + "/uploaded-products/"
    return (
        <div className="container" style={{maxWidth:deviceSize>1000?"1000px":"80%"}}>
            {product !== false &&
            <>
                <div className="row g-0">
                    <div className="col-md-6 position-relative p-2 d-flex justify-content-center">
                        <img
                            className="product-photo"
                            style={{width:"80%"}}
                            aspectRatio={2/3}
                            src={product.photo!==undefined?imagePath+product.photo:imagePath+"fallback.jpg"}
                            alt={product.name}
                        />
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="mt-2">
                            <h1 className="fw-bold">{product.name}</h1>
                        </div>
                        <div className="mt-2">
                            <h4 className="fw-bolder">${product.price}</h4>
                        </div>
                        <div className="mt-2">
                            <h5>{product.description}</h5>
                        </div>
                        <div className="row g-0 mt-2">
                            <div className="col-12 col-sm-4 my-2" style={{maxHeight:"60px",paddingRight:deviceSize>=576?"10px":"0px"}}>
                                <ProductQuantity quantity={quantity} changeQuantity={setQuantity}/>
                            </div>
                            <div className="col-12 col-sm-8 my-2" style={{maxHeight:"60px"}}>
                                <button className="black-button w-100 h-100" onClick={addToCart}>ADD TO CART</button>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex">
                            <h6 className="fs-5">Category:</h6>
                            <Link className="link nav-link d-inline-block" to="/shop">Cosmetics</Link>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <h2>Related Products</h2>
                    <hr/>
                    {products && products.length>0 &&
                        <div className="row mx-auto">
                            {products.map(prod=>
                                <ProductCard 
                                    deviceSize={deviceSize} 
                                    key={prod._id} 
                                    id={prod._id} 
                                    logged={logged} 
                                    name={prod.name} 
                                    price={prod.price}
                                    photo={prod.photo}
                                />
                            )}
                        </div>
                    }
                </div>
            </>
            }
            {product === false &&
                <div>
                    <p>PRODUCT NOT FOUND</p>
                </div>
            }
        </div>
    );
}
 
export default Product;