import React, { Component } from 'react'  
import DatePicker from "react-datepicker";  
export class Timepicker extends Component {  
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
                        <div>  
                                <div className="container">  
                                        <div class="row" style={{ marginTop: "10px" }}>  
  
                                                <div class="col-sm-4">  
  
                                                        <DatePicker className="form-control"  
                                                                showTimeSelect  
                                                                showTimeSelectOnly  
                                                                timeCaption="Time"  
                                                                dateFormat="h:mm aa"  
                                                                selected={this.state.date} placeholderText="Select Time" showPopperArrow={false}  
                                                                onChange={this.Changedate}  
                                                        />  
                                                </div>  
  
                                        </div>  
                                </div>  
                        </div>  
                )  
        }  
}  
  
export default Timepicker  