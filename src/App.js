import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeDetails from './components/pages/HomeDetails';
import Header from './components/common/header/Header';



class App extends Component  {
  render() {
    return (
      <div className="App">
        <div>
         {/* <HeaderNavigation /> */}
         <Header />
        {this.props.adminId === 0 ? 
              this.props.people.map((person, index) => {
                return (
                  <HomeDetails key={person.id} id={person.id} name={person.name} email={person.email} phone={person.phone} />
                )
              })
          :
            this.props.people.filter(person => person.adminId === this.props.adminId).map((person, index) => {
              return (
                <HomeDetails key={person.id} id={person.id} name={person.name} email={person.email} phone={person.phone} />
              )
            })
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.people,
    adminId: state.adminId
  }
}

export default connect(mapStateToProps)(App);
