import "../../styles/Cart.css";
import { useEffect, useState } from "react";

const Quantity = ({quantity, changeQuantity}) => {
    const [qty,setQty] = useState(quantity)
    
    const decrement = () =>{
        if(qty>0) setQty(qty - 1)
        else setQty(0)
    }
    
    const increment = () =>{
        setQty(qty + 1)
    }

    useEffect(()=>{
        changeQuantity(qty)
    },[qty])

    return (
        <div className="d-flex" style={{maxWidth:"120px"}}>
            <span className="d-flex quantity-border">
                <button className="btn" onClick={decrement}>-</button>
                <p>{qty}</p>
                <button className="btn" onClick={increment}>+</button>
            </span>
        </div>   
    );
}
 
export default Quantity;