import "../../styles/Cart.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Quantity from "./Quantity";
import { Cookies } from "react-cookie";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import env from "react-dotenv";
const URL = env.FETCH_API;

const CartProduct = ({id, name, price, quantity, cartProducts, photo, setItems, items, deviceSize}) => {
    const [qty,setQty] = useState(quantity)

    useEffect(()=>{
        let cond = items.find(item => item.id === id)

        if(qty !== quantity){
            //1. check if there is another object inside array and substitute it (objectType:{id,quantity})
            if(cond !== undefined){
                let index = items.indexOf(cond)
                cond.quantity = qty
                items.splice(index,1,cond)
                setItems(() => items)
            }else{
            //2. if not add it to array
                setItems(prev => {
                    prev.push({id:id,quantity:qty})
                    return [...prev]
                })
            }
        }else{
            //3. if quantity is same as initial remove it from array
            setItems(prev => {
                items.splice(prev.indexOf(cond),1)
                return items.splice(prev.indexOf(cond),1)
            })
        }
    },[qty])

    const removeProduct = async() =>{
        const cookies = new Cookies()
        const cookie = cookies.get("loggedIn")
        
        if(typeof cookie === "string" && cookie !==""){
            let objSend = {cookie:cookie}
            const user = await axios.post(`${URL}/api/authorization`,objSend ,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }})
                .then(r=>r.data)
            objSend = {productId:id, userId:user._id}
            const req = await axios.delete(`${URL}/api/remove-product/${user._id}/${id}`)
                .then(r=>r.data)
                if(req){
                    window.location.reload()
                }
            }
        }
        cartProducts.forEach(q=>{
            if(q.id===id)
                quantity = q.quantity
        })
    const imagePath = URL + "/uploaded-products/"
    return (
        <>
            {deviceSize >768 &&
                <div className="row border g-0 w-100">
                    <div className="row"> 
                        <div className="col-2 d-flex align-items-center">
                            <CloseIcon className="link remove-button" style={{cursor:"pointer"}} onClick={removeProduct}/>
                            <img 
                            className="cart-img mx-2 my-4" 
                            src={photo!==undefined?imagePath+photo:imagePath+"fallback.jpg"}
                            alt={name}
                            />
                        </div>
                        <div className="col-4 px-4 d-flex align-items-center">
                            <p><Link className="nav-link" to={"/shop/product/"+id}>{name}</Link></p>
                        </div>
                        <div className="col-2 d-flex align-items-center">    
                            <p>${price}</p>
                        </div>
                        <div className="col-2 d-flex align-items-center">
                            <Quantity quantity={qty} changeQuantity={setQty}/>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                            <p><b>${quantity*price}</b></p>
                        </div>
                    </div>
                </div>
            }
            {deviceSize<=768 &&
                <div className="border position-relative">
                    <CloseIcon className="link remove-button position-absolute end-0" style={{cursor:"pointer"}} onClick={removeProduct}/>
                    <div className="row g-0 my-2 ">
                        <div className="col-3 col-md-3 d-flex justify-content-center ">
                            <img 
                                className="cart-img mx-2 my-4" 
                                src={photo!==undefined?imagePath+photo:imagePath+"fallback.jpg"}
                                alt={name}
                                />
                        </div>
                        <div className="col-6 col-md-6 px-2 d-flex align-items-center justify-content-center">
                            <p><Link className="nav-link" to={"/shop/product/"+id}>{name}</Link></p>
                        </div>
                        <div className="col-3 col-md-3 d-flex align-items-center justify-content-center">
                            <p>${price}</p>
                        </div>
                    </div>
                    <div className="row g-0 my-3">
                        <div className="col-9 p-2">
                            <Quantity quantity={qty} changeQuantity={setQty}/>
                        </div>
                        <div className="col-3 d-flex  align-items-center justify-content-center">
                            <p><b>${quantity*price}</b></p>
                        </div>
                    </div>
                    <hr/>
                </div>
                
            }
        </>
    );
}
 
export default CartProduct;