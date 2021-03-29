import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeDetails from './components/pages/HomeDetails';
import Header from './components/common/header/Header';



class App extends Component  {
  displayHandler () {
    console.log(this.props.selectedId);

  } 

  render() {

    const selectedContact = this.props.people.filter(p => p.id === this.props.selectedId)
    var colors = Math.floor(Math.random()*16777215).toString(16);
    var random_color = "#" + colors;

    const avatarStyle = {
      backgroundColor: random_color
    }

    return (
      <div className="App">
        <Header />
        <div className="app-container">
          
         {/* <HeaderNavigation /> */}
 
            <div className="HomeDetails">
              <section className="contacts-header">
                <section className="contacts-header-basic-info">
                  Basic Info
                </section>
                <section className="contacts-header-company">
                  Company
                </section>
              </section>
                {this.props.adminId === 0 ? 
                      this.props.people.map((person, index) => {
                        return (
                          <HomeDetails key={person.id} id={person.id} name={person.name} email={person.email} phone={person.phone} company={person.company} clicked={this.displayHandler} />
                        )
                      })
                  :
                    this.props.people.filter(person => person.adminId === this.props.adminId).map((person, index) => {
                      return (
                        <HomeDetails key={person.id} id={person.id} name={person.name} email={person.email} phone={person.phone} company={person.company} clicked={this.displayHandler} />
                      )
                    })
                }
            </div>
            <div className="display-box">
              
                {this.props.selectedId ?
                  <section className="display-box1">
                  <div className="display-box11">
                      <div className="displaybox111">
                        <div className="avatar-circle" style={avatarStyle}>
                          <span className="initials" id="span">{selectedContact[0].name.charAt(0)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div>
                          {selectedContact[0].name}
                        </div>
                        <div>
                          {selectedContact[0].company}
                        </div>
                      </div>
                  </div>
                  </section>
                  : null
                }
              
              <section className="display-box2">
                  {this.props.selectedId ? 
                    <section className="display-box21">
                        
                        <div>
                          Full Name:
                        </div>
                        <div>
                          Phone:
                        </div>
                        <div>
                          Email:
                        </div>
                        <div>
                          Company:
                        </div>
                        <div>
                          Address:
                        </div>
                    </section>: null}
                  
                  <section className="display-box22">
                    {this.props.selectedId ?
                                <div className="display-box221">
                                  <div>
                                    {selectedContact[0].name}
                                  </div>
                                  <div>
                                    {selectedContact[0].phone}
                                  </div>
                                  <div>
                                   {selectedContact[0].email}
                                  </div>
                                  <div>
                                    {selectedContact[0].company}
                                  </div>
                                  <div>
                                    {selectedContact[0].address}
                                  </div>
                                </div>

                              :
                              null
                    }
                  </section>
              </section>
            </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.people,
    adminId: state.adminId,
    selectedId: state.selectedId
  }
}

export default connect(mapStateToProps)(App);
