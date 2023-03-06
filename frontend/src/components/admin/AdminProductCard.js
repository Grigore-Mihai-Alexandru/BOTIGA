import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import env from "react-dotenv";
const URL = env.FETCH_API;


const AdminProductCard = ({userId, _id, name, description, price, deviceSize, photo}) => {
    const [isEditing,setIsEditing] = useState(false);

    const [pname, setPname] = useState(name);
    const [pprice, setPprice] = useState(price);
    const [pdescription, setPdescription] = useState(description); 
    const [file, setFile] = useState();

    const saveProduct = async() => {
        const data = new FormData()
        data.append("photo",file)
        data.append("_id",_id)
        data.append("name",pname)
        data.append("price",pprice)
        data.append("description",pdescription)
        data.append("userId",userId)
        
        const sendData = await axios.post(`${URL}/api/update-product`, data, {headers:{"Content-type":"multipart/form-data"}})
            .then(r=>r.data)
            if(sendData)
                window.location.reload()
    }

    const deleteProduct = async() => {
        const sendData = await axios.delete(`${URL}/api/delete-product/${_id}/${userId}`)
            .then(r=>r.data)
        if(sendData)
            window.location.reload()
    }

    const imagePath = URL + "/uploaded-products/"
    return (
        <div key={_id} className="col-12 col-sm-6 col-md-4 my-4 product-card text-center px-4">
                {!isEditing &&
                    <>
                        <div className="position-relative d-flex justify-center">
                            <Link to="#">
                                <div className="image-div"></div>
                                <img 
                                    className="product-card-img product-img" 
                                    src={photo!==undefined?imagePath+photo:imagePath+"fallback.jpg"}
                                    alt={name}
                                />
                            </Link>
                        </div>
                        <div className="p-2">
                            <p className="fw-semibold">{name}</p>
                            <p className="fw-bold">${price}</p>
                            <div className="d-flex justify-content-between">
                                <button 
                                    style={{fontSize:deviceSize<400?"20px":"0px"}}
                                    className="link btn btn-secondary fs-5" 
                                    onClick={()=>setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="link btn btn-danger fs-5" 
                                    onClick={deleteProduct}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                }
                {isEditing &&
                    <>
                        <form>
                            <div className="position-relative d-flex justify-center h-50">
                                <div className="editing-image-div d-flex align-items-center justify-content-center">
                                    <input className="w-100" type="file" onChange={(e)=>setFile(e.target.value)} htmlFor="image"/>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="product-name" className="form-label">Product name</label>
                                <input 
                                    type="text"
                                    value={pname}
                                    onChange={(e)=>setPname(e.target.value)} 
                                    htmlFor="product-name" 
                                    className="form-control"
                                />
                                <label htmlFor="price" className="form-label" >Price</label>
                                <input 
                                    value={pprice}
                                    type="number" step="0.01" 
                                    onChange={(e)=>setPprice(e.target.value)} 
                                    htmlFor="product-name" 
                                    className="form-control"
                                />
                                <label htmlFor="product-description" className="form-label">Product description</label>
                                <textarea 
                                    value={pdescription}
                                    className='w-100 form-control' 
                                    onChange={(e)=>setPdescription(e.target.value)} 
                                    style={{overflow:"hidden"}} 
                                    htmlFor="product-name"
                                />
                            </div>
                        </form>
                        <div className="my-4 d-flex justify-content-between">
                            <button 
                                style={{fontSize:deviceSize<400?"20px":"0px"}}
                                className="link btn btn-primary fs-5" 
                                onClick={saveProduct}
                            >
                                Save
                            </button>
                            <button 
                                className="link btn btn-dark fs-5" 
                                onClick={()=>setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                }
        </div>
    );
}
 
export default AdminProductCard;