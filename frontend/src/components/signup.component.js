import React, { Component } from "react";
const axios = require('axios');

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            organisationPIN: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
        // console.log(this.state);
    }

    handleSubmit = (event) => {
        var req = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            organisationPIN: this.state.organisationPIN
        }
        
        // const data = { data: req};
        // axios.post('/api/auth/user_signup', {data} )
        // .then(response => console.log(response));

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/user_signup',
            data: req
        });
        
    }

    render() {
        return (
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="first_name" className="form-control" value={this.state.first_name} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name="last_name" className="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Organisation PIN</label>
                    <input type="text" name="organisationPIN" className="form-control" placeholder="Enter PIN" value={this.state.organisationPIN} onChange={this.handleChange}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.handleSubmit}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
}