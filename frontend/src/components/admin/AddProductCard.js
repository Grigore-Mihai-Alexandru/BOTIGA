import { useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import env from "react-dotenv";
const URL = env.FETCH_API;


const AddProductCard = ({userId}) => {
    const [addPhoto,setAddPhoto] = useState(false);
    
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState(); 
    const [file, setFile] = useState();


    const submitProduct = async(e) => {
        e.preventDefault()
        const sendObj = new FormData()
        sendObj.append("name",name)
        sendObj.append("description",description)
        sendObj.append("price",price)
        sendObj.append("photo",file)
        sendObj.append("userId",userId)
        const sendData = await axios.put(`${URL}/api/add-product`,sendObj,{headers:{"Content-type":"multipart/form-data"}})
            .then(r=>r.data)
        if(sendData)
            window.location.reload()
        else alert("error")
    }

    return (
        <div className="col-12 col-sm-6 col-md-4 my-4">
            <div 
                className="d-flex align-items-center justify-content-center" 
                style={{width:"100%",height:"300px",backgroundColor:"rgba(200,200,200,0.4)"}}
            >
                <AddAPhotoIcon hidden={addPhoto} style={{cursor:"pointer"}} fontSize="large" onClick={()=>setAddPhoto(true)}/>
                <input type="file" hidden={!addPhoto} onChange={e => setFile(e.target.files[0])} ></input>
                <button hidden={!addPhoto} className="black-button link" onClick={()=>setAddPhoto(false)}>Cancel</button>
                
            </div>
            <div>
                <form className='w-100'>
                    <div className="mb-3">
                        <label htmlFor="product-name" className="form-label">Product name</label>
                        <input type="name" className="form-control" onChange={(e)=>setName(e.target.value)} required={true}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product-name" className="form-label">Product description</label>
                        <textarea className='w-100 form-control' onChange={(e)=>setDescription(e.target.value)} style={{overflow:"hidden"}} required={true}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product-price" className="form-label">$Price</label>
                        <input type="number" step="0.01" placeholder='$0' className="form-control" onChange={(e)=>setPrice(e.target.value)} required={true}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submitProduct}>Add Product</button>
                </form>
            </div>
        </div>
    );
}
 
export default AddProductCard;