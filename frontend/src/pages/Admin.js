import "../styles/Admin.css";
import { useState, useEffect } from 'react';
import AdminProductCard from '../components/admin/AdminProductCard';
import AddProductCard from "../components/admin/AddProductCard";
import axios from 'axios';
import env from "react-dotenv";
const URL = env.FETCH_API;

const Admin = ({userId, admin, logged, deviceSize}) => {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        async function getProducts(){
            const data = await axios.get(`${URL}/api/shop/products`).then(res=>res.data)
            setProducts(data);
        }
        getProducts();
    },[])

    return (
        <>
        {admin &&
            <div className="container text-center mt-4">
                <h2>Welcome to admin page</h2>
                <div className="row g-0 mx-auto" style={{width:deviceSize>1000?"75%":"90%"}}>
                    <AddProductCard 
                        userId={userId}
                    />

                    {products.length>0 &&
                        products.map(product=>
                            <AdminProductCard 
                                userId={userId}
                                key={product._id}
                                _id={product._id} 
                                name={product.name} 
                                price={product.price}
                                description={product.description}
                                deviceSize={deviceSize}
                                photo={product.photo}
                            />
                        )
                    }
                </div>
            </div>
        }
        {!logged &&
            <div className="container text-center mt-4">
                Please log in...
            </div>
        }
        {!admin && logged &&
            <div className="container text-center mt-4">
                Sorry you're not an admin...
            </div>
        }
        </>
    );
}
 
export default Admin;