import axios from "axios";
import {useEffect, useState} from "react";
import ProductCard from "../components/shop/ProductCard";
import "../styles/Shop.css";
const URL="http://localhost:5000";

const Shop = ({logged, deviceSize}) => {
    const [products,setProducts] = useState()

    useEffect(()=>{
        async function getProducts(){
            const data = await axios.get(`${URL}/api/shop/products`).then(res=>res.data)
            setProducts(data);
        }
        getProducts();
    },[])

    return (
        <>
        <div className="mx-auto text-center" style={{marginTop:"70px",maxWidth:"500px"}}>
            <h1 className="fs-1 fw-bold">Shop</h1>
            <p className="mt-4">State the biggest use case of your product. Briefly expand on how this will help your customers.</p>
        </div>
        <div className="container" style={{marginTop:"70px",maxWidth:deviceSize>1000?"1000px":"90%"}}>
            <div className="row g-0 border-bottom">
                <div className="col-12 col-sm-6 text-start my-3 p-0">
                    Showing all {products && products.length>0?products.length:0} results.
                </div>
                <div className="col-12 col-sm-6 text-sm-end my-3 p-0">
                    Default sorting
                </div>
            </div>
            <div className="row g-0">
                {(products && products.length>0) &&
                    products.map(product =>
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
        </>
    );
}
 
export default Shop;