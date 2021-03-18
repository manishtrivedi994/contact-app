import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

import Modal from 'react-modal'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import short from 'short-uuid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

Modal.setAppElement('#root');
toast.configure();

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();


  const [modalIsOpen, setModalOpen] = useState(false);

  const admins = useSelector(state => state.admins);
  const adminId = useSelector(state => state.adminId);
  const dispatch = useDispatch();

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

  return (
    
    <>
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
      <IconContext.Provider value={{ color: 'red' }} >
        <Nav >
        
          <NavIcon to='#'>
          
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
             <diV style={{display: 'flex'}}>
                <div style={{color: 'royalblue', width: '250px', height: '40px', padding: '15px', textAlign: 'center',marginRight: '250px', position: 'absolute', right: 0}} onClick={() => setModalOpen(true)} >
                  +Add
                </div>
                <div style={{position: 'absolute', right: 0, top: 0, margin: '30px', width: '250', }} >
                <Dropdown options={options} value={defaultOption} placeholder="Select an option" style={{float: "left", width: '50%'}} onChange={(e) => setAdminId(e)}/>;
                </div>
              </diV>
          
        </Nav>
  
        <SidebarNav sidebar={sidebar}  >
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineArrowRight onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
          
        </SidebarNav>
        
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
