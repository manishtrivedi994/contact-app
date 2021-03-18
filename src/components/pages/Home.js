import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import HomeDetails from './HomeDetails'


class Home extends Component {

  render() {
    return (

      <div className='home' style={{justifyItems: 'flex-end'}}>
        {this.props.adminId === 0  ?
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
        {}
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    people: state.people,
    adminId: state.adminId
  }
}

export default connect(mapStateToProps)(Home);
