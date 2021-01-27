import React, { Component } from "react";

import Modal from '../Modal.js';

class Organisation extends Component {
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
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" placeholder="Description" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" disabled />
                </div>
       		</form>
        </Modal>  
        <button type="button"  className="btn btn-dark btn-lg btn-block" onClick={this.showModal}>
          Open
        </button>
       
      </main>
       
    );
  }

}

export default Organisation