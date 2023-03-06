import "../styles/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/shop/ProductCard";
import { Link } from "react-router-dom";
const URL="http://localhost:5000";

const Home = ({logged,deviceSize}) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getHomeProducts = async() =>{
            const data = await axios.get(`${URL}/api/home-products`)
            setProducts(data.data)
        }
        getHomeProducts()
    },[])

    return (
        <>
        <div className="position-relative" style={{overflow:"hidden",width: "100%",height:deviceSize >760?"700px":"300px"}}>
            <img className="first-home-img " alt="homebg"  
                src={"./home-images/img-1.jpg" }
            />
            <div className="position-absolute first-home-layer text-center mx-2" style={{width:deviceSize<300?"200px":deviceSize<500?"300px":"50%"}}>
                <h2 className="fw-bolder" style={{fontSize:deviceSize<500?"1.3rem":deviceSize<750?"1.8rem":"2.3rem"}}>Headline that grabs people’s attention</h2>
                <Link to="/shop">
                    <button className="black-button" style={{fontSize:deviceSize<500?"1.3rem":deviceSize<750?"1.5rem":"1.8rem"}}>
                        Shop now
                    </button>
                </Link>
            </div>
        </div>
        <div className="text-center mx-auto second-div" style={{maxWidth:deviceSize>1000?"1000px":"90%"}}>
            <h2>Featured Collection</h2>
            <p>A powerful headline about your product’s features to give focus to your chosen product collection</p>
            <div className="row g-0">
                {products && products.length>0 &&
                    products.map(product=>
                        <ProductCard 
                            deviceSize={deviceSize} 
                            key={product._id} 
                            id={product._id} 
                            logged={logged} 
                            name={product.name} 
                            price={product.price}
                            photo={product.photo}
                        /> 
                    )
                }
            </div>
        </div>
        <div className="position-relative" style={{margin:"20px 0px 60px",height:"350px",overflow:"hidden"}}>
            <img className="second-home-img" alt="homebg"  
                src={"./home-images/img-2.jpg" }
            />
            <div className="position-absolute text-center second-home-layer">
                <h2 className="fw-bolder">Highlighted Section</h2>
                <p>What differentiates you from the competition? Use this section to talk about it. Don’t forget to talk about the benefits.</p>
                <Link to="/shop">
                    <button className="black-button" style={{fontSize:deviceSize<500?"1.3rem":deviceSize<750?"1.5rem":"1.8rem"}}>
                        Shop now
                    </button>
                </Link>
            </div>
        </div>
        <div className="text-center mx-auto" style={{margin:"40px 0px 60px",maxWidth:deviceSize>1000?"1000px":"90%"}}>
            <div>
                <h2>Featured Categories</h2>
                <p>Give your customers insight into your product collection. Select imagery and name that relates to the product category.</p>
            </div>
            <div className="row g-0" >
                <div className="col-12 col-sm-6 col-md-3 p-4">
                    <Link to="/shop">
                        <img className="category-img" src={"./home-images/a1.jpg"} alt="category-img"></img>
                    </Link>
                    <Link className="nav-link mt-3" to="/shop">
                        <h6>Makeup</h6>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 p-4">
                    <Link to="/shop">
                        <img className="category-img" src={"./home-images/a2.jpg"} alt="category-img"></img>
                    </Link>
                    <Link className="nav-link mt-3" to="/shop">
                        <h6>Lipstick</h6>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 p-4">
                    <Link to="/shop">
                        <img className="category-img" src={"./home-images/a3.jpg"} alt="category-img"></img>
                    </Link>
                    <Link className="nav-link mt-3" to="/shop">
                        <h6>Bath Products</h6>
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 p-4">
                    <Link to="/shop">
                        <img className="category-img" src={"./home-images/a4.jpg"} alt="category-img"></img>
                    </Link>
                    <Link className="nav-link mt-3" to="/shop">
                        <h6>Treatments</h6>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default Home;