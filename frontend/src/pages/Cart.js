import "../styles/Cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import CartProduct from "../components/cart/CartProduct";
const URL="http://localhost:5000";

const Cart = ({cartProducts, deviceSize, admin, logged}) => {
    const [products,setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        if(items.length === 0){
            setDisabled(true)
        }else
            setDisabled(false)
    },[items])

    useEffect(()=>{
        if(products.length>0){
            setTotal(0)
            cartProducts.forEach(prod =>{
                products.forEach(product=>{
                    if(product._id===prod.id){
                        setTotal(prev=>prev + prod.quantity * product.price)
                    }
                })
            })
        }
    },[cartProducts,products])
    
    useEffect(()=>{
        const findProduct = async(id)=>{
            const objSend = {id:id}
            const data = await axios.post(`${URL}/api/find-product`,objSend,{headers:{"Content-type":"application/x-www-form-urlencoded"}})
                .then(r=>r.data)
            //find quantity of current user
            cartProducts.forEach(q=>{
                if(q.id===id)
                    data.quantity = q.quantity
            })
            setProducts(prev=> [...prev,data])    
        }
        
        if(cartProducts.length > 0)
        cartProducts.forEach( product => {
            findProduct(product.id) 
        })
    },[cartProducts])

    const updateCart = async() => {
        const cookies = new Cookies()
        const cookie = cookies.get("loggedIn")

        if(typeof cookie === "string" && cookie !=="" && logged){
            let objSend = {cookie:cookie}
            const user = await axios.post(`${URL}/api/authorization`,objSend,{headers:{ "Content-Type": "application/x-www-form-urlencoded" }})
              .then(r=>r.data)

            //convert items array to object
            const itemsObj = {}
            Object.assign(itemsObj,items)

            objSend = {itemsObj, userId:user._id}
            const req = await axios.put(`${URL}/api/update-cart`,objSend,{headers:{"Content-type":"multipart/form-data"}})
                .then(r=>r.data)
            if(req){
                window.location.reload();
            }
        }
    }

    const underCart = {
        justifyContent:deviceSize<768 ?"start":""
    }
    
    const couponStyle = {
        flexDirection:deviceSize<450 ?"column":"row"
    }

    const styling = {
        maxWidth:deviceSize>995 ?"75%":"90%",
        backgroundColor:cartProducts.length === 0 ? "#F5F5F5": "white"
    }
    
    return (
        <div className="d-flex flex-column justify-center">
            <div><p className="fs-1 fw-semibold text-center mt-4 pt-4">Cart</p></div>
            <div className="row my-4 m-auto" style={styling}>
                {cartProducts.length > 0  &&
                    <>
                        {deviceSize>768 &&
                            <div className="border row g-0">
                                <div className="col-2"></div>
                                <div className="col-4 px-3">
                                    Product
                                </div>
                                <div className="col-2">
                                    Price
                                </div>
                                <div className="col-2">
                                    Quantity
                                </div>
                                <div className="col-2">
                                    <b>Subtotal</b>
                                </div>
                            </div>
                        }
                        <div className=" row g-0">
                            {products.length>0 && 
                                products.map(product =>
                                    <CartProduct 
                                        deviceSize={deviceSize}
                                        key={product._id}
                                        id={product._id} 
                                        name={product.name} 
                                        price={product.price}
                                        photo={product.photo} 
                                        quantity={product.quantity}
                                        cartProducts={cartProducts}
                                        setItems={setItems}
                                        items={items}
                                    />
                                )
                            }
                        </div>
                    </>
                }
                {(cartProducts.length === 0 || cartProducts ===false) &&
                    <div className="" style={styling}>
                        <p>Your cart is currently empty.</p>
                        {!logged && 
                            <p>Please log in to be able to add to cart</p>
                        }
                    </div>
                }
            </div>
                
                   
            
            <div className="row my-4 mx-auto row d-flex" style={{maxWidth:deviceSize>995 ?"75%":"90%"}}>
                <div className="col-md-6" style={underCart}>
                    <form className="d-flex" style={couponStyle}>
                        <input placeholder="Coupon code"></input>
                        <button disabled className="black-button">APPLY COUPON</button>
                    </form>
                </div>
                <div className="col-md-6 d-flex flex-row-reverse" style={underCart}>
                    <button 
                        disabled={disabled}
                        onClick={updateCart} 
                        className={disabled ? "link black-button black-button-disabled" : "link black-button"}
                    >
                        UPDATE CART
                    </button>
                </div>
            </div>
            <div className="d-flex" 
                style={{
                    justifyContent:deviceSize<500?"center":"flex-end"
                }}>
                <div className="mx-4 my-4" 
                    style={{
                        width:deviceSize<500?"100%":"",
                        backgroundColor:"#F5F5F5"
                    }}>
                    <div className="w-100">
                        <p className="fs-3 fw-bolder mb-4 mx-4">Cart totals</p>
                    </div>
                    <div className="row px-4">
                        <div className="col-6">
                            Subtotal:
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                            ${total}
                        </div>
                        <hr></hr>
                    </div>
                    <div className="row px-4 ">
                        <div className="col-6">
                            Total:
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                            <p className="fs-4"><b>${total}</b></p>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-center">
                        <button className="link black-button m-4">
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Cart;