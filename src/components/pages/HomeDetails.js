import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import * as actions from '../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


Modal.setAppElement('#root');

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function HomeDetails (props) {

  const classes = useStyles();

    const people = useSelector(state => state.people);
    const dispatch = useDispatch();
    const adminId = useSelector(state => state.adminId);

    const [modalIsOpen, setModalOpen] = useState(false);
    

    const person = people.filter(p => p.id === props.id);
    const personName = person[0].name;
    const personEmail = person[0].email;
    const personPhone = person[0].phone;

    const [name, setName] = useState(personName);
    const [email, setEmail] = useState(personEmail);
    const [phone, setPhone] = useState(personPhone);

    const contactHandler = (id) => {
        setModalOpen(true);
    }

    const handleSubmit = (id) => {
        dispatch({type: actions.EDIT_CONTACT, id: id, name: name, phone: phone, email: email, adminId: adminId});
        setModalOpen(false);
    }

    const deleteContactHandler = (id) => {
        dispatch({type: actions.DELETE_CONTACT, id: id});
        setModalOpen(false);
    }
    
    return(
        <div>
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
                <input placeholder="Enter Name" onChange={(e) => setName(e.target.value)} type="text" value={name}/>
                <p >Email:</p>
                <input placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} type="text" value={email}/>
                <p>Phone:</p>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    style={{marginRight: '800px'}}
                />
                <Button onClick={() => handleSubmit(props.id, name, phone, email)}>submit</Button>
                <button onClick={() => setModalOpen(false)}>Close</button>
                <button onClick={() => deleteContactHandler(props.id)}>Delete</button>
              </div>
            </Modal>
            <Card className={classes.root} variant="outlined" onClick={() => contactHandler(props.id)}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {props.email}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {props.phone}
                  </Typography>
                  {"\n"}
                  <CardActions>
                    <Button size="small" onClick={() => contactHandler(props.id)} >Edit contact</Button>
                  </CardActions>
                </CardContent>
                
            </Card>
            {/* <section className="contacts">
              <section className="contact-details">
                <section>{props.name}</section>
                <section>{props.email}</section>
                <section>{props.phone}</section>
              </section>
              <section className="edit-button">
                <button>Edit Contact</button>
              </section>
            </section> */}
        </div>
        
    )
}



export default HomeDetails;