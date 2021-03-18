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
      const idArr = admins.filter(admin => admin.name === e.value);
      const id = idArr[0].id;
      dispatch({type: actions.CHANGE_ADMIN, id: id});
  }

  const [modalIsOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();

  function handleSubmit() {
    if(adminId === 0){
      toast('Please select an admin!', {position: toast.POSITION.TOP_RIGHT})
      setModalOpen(false)
    }
    else {
      const id = short.generate();
      const contact = {
        id, name, email, phone, adminId
      }
      dispatch({type: actions.ADD_CONTACT, contact: contact});
      setModalOpen(false)
    }
  }

  return (
    <section className="navbar">
      <a href="/" className="navbar-item">Home</a>
      <section className="navbar-item" onClick={() => setModalOpen(true)}>+Add</section>
      <section className="navbar-item">
        <Dropdown className="dropdown" options={options} value={defaultOption} placeholder="Select an Admin" style={{}} onChange={(e) => setAdminId(e)}/>
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
                   backgroundColor: 'grey'
                 },
                 content: {
                   color: 'blue'
                 }
               }
             }>
        <h1>Provide Input Fields</h1>
        <div>
          <p>Name:</p>
          <input placeholder="Enter Name" onChange={(e) => setName(e.target.value)} type="text"/>
          <p>Email:</p>
          <input placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} type="text"/>
          <p>Phone:</p>
          <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              style={{marginRight: '800px'}}
          />
          <button onClick={() => handleSubmit()}>submit</button>
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </section>
  )

}

export default Navbar;