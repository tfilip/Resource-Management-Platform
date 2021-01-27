import React, { Component } from "react";

import Modal from '../Modal.js';
import Datepic from './datepicker/Datepic.js';
import Datefce from './datepicker/Datefce.js';
import Timepicker from './datepicker/Timepicker.js';

class Reservation extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <main>
        <h1>React Modal</h1>
        <Modal show={this.state.show} handleClose={this.hideModal}>
              <form>
                <h3>Start Date</h3>

                <div className="dtpc">
                    <Datepic></Datepic>

                    <Timepicker></Timepicker> 
                </div>

                
                <h3>End Date</h3>

                <div className="dtpc">
                    <Datepic></Datepic>   
                    <Timepicker></Timepicker>  
                </div>  
              </form>
        </Modal>  
        <button type="button" className="btn btn-dark btn-lg btn-block" onClick={this.showModal}>
          Open
        </button>
      </main>
      
    );
  }

}

export default Reservation