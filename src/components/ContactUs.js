import React from 'react'

const ContactUs = (props) => {
  return (
    <>
    <div className="container my-3" style={{backgroundColor: '#0C2D57', padding: 30, borderRadius: 20, textAlign:'center'}}>
    <h4>Contact Us</h4>
     <div className="mb-3" style={{textAlign:'start'}}>
     <label htmlFor="name" className="form-label">Name</label>
     <input type="text" className="form-control" id="name" placeholder="Enter your full name" required/>
    </div>
    <div className="mb-3" style={{textAlign:'start'}}>
     <label htmlFor="email" className="form-label">Email address</label>
     <input type="email" className="form-control" id="email" placeholder="Enter your Email Address" required/>
    </div>
    <div className="mb-3" style={{textAlign:'start'}}>
     <label htmlFor="phone" className="form-label">Phone</label>
     <input type="text" className="form-control" id="phone" placeholder="Enter contact number" required/>
    </div>
    <div className="mb-3" style={{textAlign:'start'}}>
    <label htmlFor="message" className="form-label">Message</label>
    <textarea className="form-control" id="message" rows="3" required></textarea>
    </div>
    <div onClick={()=>props.showAlert("Your form has been submitted we will surely get into touch aftter reviewing", "success")} className="btn btn-primary my-3">SEND</div>
    </div>
    </>
  )
}

export default ContactUs
