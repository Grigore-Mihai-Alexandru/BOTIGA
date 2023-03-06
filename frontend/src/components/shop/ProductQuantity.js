import { useState, useEffect } from "react";

const ProducQuantity = ({quantity, changeQuantity}) => {
    const [qty,setQty] = useState(quantity)
    
    const decrement = () =>{
        if(qty>1) setQty(qty - 1)
        else setQty(1)
    }
    
    const increment = () =>{
        setQty(qty + 1)
    }

    useEffect(()=>{
        changeQuantity(qty)
    },[qty])

    return (
        <div className="d-flex">
            <span className="d-flex quantity-border">
                <button className="btn fs-3 md-fs-1" onClick={decrement}>-</button>
                <p>{qty}</p>
                <button className="btn fs-3 md-fs-1" onClick={increment}>+</button>
            </span>
        </div>   

    );
}
 
export default ProducQuantity;