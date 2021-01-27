import React, { Component } from 'react'  
import DatePicker from "react-datepicker";  
export class Datepic extends Component {  
        constructor(props) {  
                super(props)  
  
                this.state = {  
                        date: ''  
                }  
        }  
        Changedate = (e) => {  
                this.setState({  
                        date: e  
                });  
        };  
  
        render() {  
                return (  
                        <div className="form-group">
                        <div className="container">    
                                <div class="row" style={{ marginTop: "10px" }}>  
  
                                        <div class="col-sm-4">  
                                                <DatePicker className="form-control"  
                                                        selected={this.state.date} placeholderText="Select Date" showPopperArrow={false}  
                                                        onChange={this.Changedate}  
                                                />  
                                        </div>  
  
                                </div>  
                        </div> 
                        </div> 
                )  
        }  
}  
  
export default Datepic  