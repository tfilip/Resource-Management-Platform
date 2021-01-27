import React, { useState } from 'react'  
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";  
function Datefce() {  
        const [data, setData] = useState(new Date());  
        return (  
                <div className="container">  
                        <DatePicker  showPopperArrow={false}  placeholderText="Select Date" selected={data} onChange={date => setData(date)} />  
                   
  
                </div>  
        )  
}  
  
export default Datefce  