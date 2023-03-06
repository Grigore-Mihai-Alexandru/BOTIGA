import "../styles/Contact.css";

const Contact = ({deviceSize}) => {
    return (
        <div className="container mb-4" style={{maxWidth:deviceSize>1000?"1000px":"90%"}}>
            <div className="mb-4 text-center">
                <h1 className="fw-bolder">Contact us</h1>
            </div>
            <div style={{maxHeight:"500px"}}>
                <img className="contact-img" src="contact.jpg" alt="contact-img"></img>
            </div>
            <div className="row g-0 my-4">
                <div className="col-12 col-sm-8">
                    <h2 className="fw-boldest">Leave us a message</h2>
                    <form style={{marginRight:deviceSize>=576?"2rem":""}}>
                        <div className="row g-0 my-4">
                            <div className="col-12 col-sm-6 d-flex flex-column" style={{paddingRight:deviceSize>=576?"1.5rem":""}}>
                                <label className="fw-bolder">Name <span className="text-danger">*</span></label>
                                <input type="text"></input>
                            </div>
                            <div className="col-12 col-sm-6 d-flex flex-column" style={{paddingLeft:deviceSize>=576?"1.5rem":""}}>
                                <label className="fw-bolder">Email <span className="text-danger">*</span></label>
                                <input type="email"  ></input>
                            </div>
                        </div>
                        <div>
                            <label className="fw-bolder">Comment or Message <span className="text-danger">*</span></label>
                            <textarea style={{width:"100%",height:"200px"}}></textarea>
                        </div>
                        <button className="black-button mt-4" type="submit">SEND MESSAGE</button>
                    </form>
                </div>
                <div className="col-12 col-sm-4" style={{marginTop:deviceSize<576?"2rem":""}}>
                    <h2 className="fw-boldest mb-4">Our Store</h2>
                    <p className="my-4">501-521 Fashion Ave, New York, NY 10018, USA</p>                
                    <p className="mt-4">PHONE:</p>
                    <p>+1 212 244 2681</p>
                    <p className="mt-4">E-MAIL:</p>
                    <p>office@example.org</p>
                    <h2 className="fw-boldest my-4">Store Hours</h2>
                    <p className="mt-4">Sun: Closed</p>
                    <p className="mt-4">Mon to Sat: 10 AM – 5:30 PM</p>
                </div>  
            </div>
        </div>
    );
}
 
export default Contact;