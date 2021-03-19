import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import 'react-phone-number-input/style.css'
import '../pages/HomeDetails.css'
import PhoneInput from 'react-phone-number-input';
import * as actions from '../store/actions';
import Button from '@material-ui/core/Button';
import { FaUserEdit } from 'react-icons/fa';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';


Modal.setAppElement('#root');

function HomeDetails (props) {

    const people = useSelector(state => state.people);
    const dispatch = useDispatch();
    const adminId = useSelector(state => state.adminId);

    const [modalIsOpen, setModalOpen] = useState(false);
    

    const person = people.filter(p => p.id === props.id);
    const personName = person[0].name;
    const personEmail = person[0].email;
    const personPhone = person[0].phone;
    const personCompany = person[0].company;
    const personAddress = person[0].address;

    const [name, setName] = useState(personName);
    const [email, setEmail] = useState(personEmail);
    const [phone, setPhone] = useState(personPhone);
    const [company, setCompany] = useState(personCompany);
    const [address, setAddress] = useState(personAddress);

    const handleSubmit = (id) => {
        dispatch({type: actions.EDIT_CONTACT, id: id, name: name, phone: phone, email: email,company: company,address: address, adminId: adminId});
        setModalOpen(false);
    }

    const deleteContactHandler = (id) => {
        dispatch({type: actions.DISPLAY_DETAILS, selectedId: null})
        dispatch({type: actions.DELETE_CONTACT, id: id});
        setModalOpen(false);
    }

    var colors = Math.floor(Math.random()*16777215).toString(16);
    var random_color = "#" + colors;

    const avatarStyle = {
      backgroundColor: random_color
    }

    return(
        <div className="container">
            <Modal isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={true}
                onRequestClose={() => setModalOpen(false)}
                style={
                  {
                    overlay: {
                      backgroundColor: '#ef978f',
                      width: '50%',
                      height: '75%',
                      marginLeft: '25%',
                      marginRight: '25%',
                      marginTop: '10%',
                      marginBottom: '25%',
                    },
                    content: {
                      color: 'purple',
                      backgroundColor: '#ef978f'
                    },
                    
                  }
            }>
              <section className="header-modal">
                  <h1 className="header-modal-heading">Provide Input Fields</h1>
                  <AiFillCloseCircle size={70} onClick={() => setModalOpen(false)}/>
              </section>
              <div className="add-details">
                <p>Name:</p>
                <input placeholder="Enter Name" onChange={(e) => setName(e.target.value)} type="text" value={name}/>
                <p >Email:</p>
                <input placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} type="text" value={email}/>
                <p>Phone:</p>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                />
                <p>Company:</p>
                  <input value={company} placeholder="Company" onChange={(e) => setCompany(e.target.value)} type="text" required/>
                <p>Address:</p>
                  <input value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} type="text" required/>  
                <p></p>
                <Button onClick={() => handleSubmit(props.id, name, phone, email)}>submit</Button>
                <AiFillDelete onClick={() => deleteContactHandler(props.id)} size={60}/>
              </div>
            </Modal>
      
            {/* <section className="contacts" onClick={() => contactHandler(props.id)}> */}
            <section className="contacts" onClick={() => dispatch({type: actions.DISPLAY_DETAILS, selectedId: props.id})}>
                <section className="contact-edit-button" onClick={() => setModalOpen(true)}><FaUserEdit/></section>
                {/* <section><FaUserCircle /></section> */}
                <section className="contact-details-container">
                <section className="avatar-circle" style={avatarStyle}>
                      <span className="initials" id="span">{props.name.charAt(0)}</span>
                  </section>
                  
                  <section className="contact-info">
                    <section style={{fontWeight: 'bold'}}>
                          {props.name}
                    </section>
                    <section >
                        {props.email}
                    </section>
                  </section>
                  
                </section>
                <section className="contact-details-container1">
                  <section >{props.company}</section>
                </section>
                
            </section>
      </div>
        
    )
}



export default HomeDetails;