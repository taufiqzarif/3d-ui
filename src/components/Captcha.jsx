import React, { Component } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './style.css';
import "antd/dist/antd.css";




class Captcha extends Component {

   componentDidMount () {
      loadCaptchaEnginge(6); 
   };

   doSubmit = () => {
       let user_captcha = document.getElementById('user_captcha_input').value;

       if (validateCaptcha(user_captcha)===true) {
           sessionStorage.setItem("isAuthenticated", "true");
           window.location.reload();
       }

       else {
           alert('Captcha Does Not Match');
           document.getElementById('user_captcha_input').value = "";
       }
   };

   render() {
        

       return (<div>
           <div className="container" id="captcha">
               <div className="form-group" id="form-group">

                   <div className="col mt-3" id="reload">
                       <LoadCanvasTemplate />
                   </div>

                   <div className="col mt-3" id="padding">
                       <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
                   </div>

                   <div className="col mt-3" id="padding">
                       <div><button class="btn btn-primary" id="button" onClick={() => this.doSubmit()}>Submit</button></div>
                   </div>
                     
               </div>

           </div>
       </div>);
   };
}

export default Captcha;