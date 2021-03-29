import React, { useState } from 'react';
import './Navbar.css'

import Dropdown from 'react-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Modal from 'react-modal';
import PhoneInput from 'react-phone-number-input';
import short from 'short-uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import Button from '@material-ui/core/Button';
import { FiUserPlus } from 'react-icons/fi'
import { AiFillHome } from 'react-icons/ai'





Modal.setAppElement('#root');
toast.configure();
function Navbar () {

  const admins = useSelector(state => state.admins);
  const adminId = useSelector(state => state.adminId);
  const dispatch = useDispatch();

  const options = [
      admins[0].name, admins[1].name, admins[2].name
    ];

  const adminSelected = admins.filter(admin => admin.id === adminId);

  const defaultOption = adminSelected.name;

  const setAdminId = (e) => {
    
      dispatch({type: actions.DISPLAY_DETAILS, selectedId: null})
      const idArr = admins.filter(admin => admin.name === e.value);
      const id = idArr[0].id;
      dispatch({type: actions.CHANGE_ADMIN, id: id});
  }

  const [modalIsOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');

  function handleSubmit() {
    if(adminId === 0){
      alert('Please select an Admin to add contact!')
    }
    else if(name===''){
      toast('Name cannot be blank!', {position: toast.POSITION.TOP_RIGHT})
    }
    else if(email==='' || (email.includes('@') === false) ) {
      toast('Please provide a valid email!', {position: toast.POSITION.TOP_RIGHT})
    }
    else if(company===''){
      toast('Please provide company name!', {position: toast.POSITION.TOP_RIGHT})
    }
    else if(address===''){
      toast('Please provide your Address!', {position: toast.POSITION.TOP_RIGHT})
    }
    else {
      setPhone(null);
      const id = short.generate();
      const contact = {
        id, name, email, phone, company, address, adminId
      }
      dispatch({type: actions.ADD_CONTACT, contact: contact});
      setModalOpen(false)
    }
  }

  function handleClose () {
    setPhone(null);
    setModalOpen(false)
  }


  return (
    <section className="navbar">
      {/* <a href="/" className="navbar-item">Home</a> */}
      <section className="navbar-item" onClick={() => dispatch({type: actions.CHANGE_ADMIN, id: 0})}><AiFillHome size={30}/></section>
      <section className="navbar-item" onClick={() => setModalOpen(true)}><FiUserPlus size={30}/></section>
      <section className="navbar-item">
         <Dropdown className="dropdown" options={options} value={defaultOption} placeholder="Select an Admin" onChange={(e) => setAdminId(e)}/> 
      </section>


      {/* <a href="/shop" className="navbar-item">Shop</a>
      <a href="/blog" className="navbar-item">Blog</a>
      <a href="/contact" className="navbar-item">Contact</a> */}

      <Modal isOpen={modalIsOpen}
             shouldCloseOnOverlayClick={false}
             onRequestClose={() => setModalOpen(false)}
             style={
               {
                 overlay: {
                  backgroundColor: '#ef978f',
                  width: '50%',
                  height: '73%',
                  marginLeft: '25%',
                  marginRight: '25%',
                  marginTop: '10%',
                  marginBottom: '25%'
                 },
                 content: {
                   color: 'rebeccapurple',
                   backgroundColor: '#ffc2ad'
                 }
               }
             }>
        <section className="header-modal">
           <h1 className="header-modal-heading">Provide Input Fields</h1>
           <AiFillCloseCircle size={70} onClick={() => handleClose()}/>
        </section>
        <div className="add-details">
          <p>Name:</p>
          
          <input placeholder="Enter Name" onChange={(e) => setName(e.target.value)} type="text" required/>
          
          <p>Email:</p>
          <input placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} type="text" required/>
          <p>Phone:</p>
          <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              required
          />
          <p>Company:</p>
            <input placeholder="Company" onChange={(e) => setCompany(e.target.value)} type="text" required/>
          <p>Address:</p>
            <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} type="text" required/>  
          <p></p>
          <Button onClick={() => handleSubmit()} >submit</Button>

        </div>
      </Modal>
    </section>
  )

}

export default Navbar;