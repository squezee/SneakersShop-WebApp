import { useState, useEffect } from 'react';
const React = require('react');
function Register(){
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({username:"",email:"",password:""});
    function onChange(e){
        switch (e.target.className){
            case "username":
                let tempFormData = formData;
                tempFormData.username = e.target.value;
                setFormData(tempFormData);
                break;
            case "email":
                let tempFormData1 = formData;
                tempFormData1.email = e.target.value;
                setFormData(tempFormData1);
                break;
            case "password":
                let tempFormData2 = formData;
                tempFormData2.password = e.target.value;
                setFormData(tempFormData2);
                break;
        }
    }
    function submit(){
        console.log(JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
        }));
        fetch('/register.php', {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
          })
            .catch(error => console.log(error));
    }
  return <div class="wrapper">
  <header style={{paddingBottom:0,background:"none"}}>
      <div class="container">
          <div class="headerPanel">
              <div class="logo">
                  <img src="img/Group 3.svg"></img>
              </div>
              <nav class="nav">
                  <div class="navBtn active">New Arrivals <div class="underline"></div></div>
                  <div class="navBtn">Men <div class="underline"></div></div>
                  <div class="navBtn">Women<div class="underline"></div></div>
                  <div class="navBtn">Kids<div class="underline"></div></div>
              </nav>
              <div class="menu">
                  <div class="menuBtn">
                      <img src="img/fi_shopping-cart.svg" alt=""></img>
                  </div>
                  <div class="menuBtn">
                      <img src="img/fi_heart.svg" alt=""></img>
                  </div>
                  <div class="menuBtn">
                      <img src="img/fi_user.svg" alt=""></img>
                  </div>
              </div>
          </div>
      </div>
  </header>
  <div class="globalLine"></div>
  <main>
      <div class="container">
          <div class="loginForm">
              <div class="loginFormBlock">
                  <div class="loginFormHeader">
                      <img src="img/Subtract.png" alt=""></img>
                      <div class="inscriptions">
                          <div class="label">Register to SneakerShop</div>
                          <div class="link">Already have an account? Register  </div>
                      </div>
                  </div>
                  <div class="loginFormColumn">
                    <div class="inputLabel">Username:</div>
                      <div class="inputBlock">
                          <input onChange={onChange} class="username" type="text" placeholder="Enter your Username..."></input>
                      </div>
                      <div class="inputLabel">Email:</div>
                      <div class="inputBlock">
                          <input onChange={onChange} class="email" type="text" placeholder="Enter your EMail..."></input>
                      </div>
                      <div class="inputLabel">Password:</div>
                      <div class="inputBlock">
                          <input onChange={onChange} class="password" type="text" placeholder="Enter your password..."></input>
                      </div>
                      <div class="passwordRecoveryLink">Forget your password?</div>
                      <div class="formBtn accept" onClick={submit}>Register</div>
                      <div class="formBtn cancel">Cancel</div>
                  </div>
              </div>
          </div>
      </div>
  </main>
  <footer>
      <div class="container">
          <div class="line"></div>
          <div class="logo"><img src="img/Group 3.svg" alt=""></img></div>
          <div class="postScriptum">We don’t just sell shoes, we sell memories and collectibles. We collect the best in the best with an attention to all little details. we know that shoes speaks louder than words that’s why we’ve mastered the science of good sneakers.</div>
          <div class="inscriptions">
              <div class="socials">
                  Don’t missout on once-in-a-while-deals:
                  <img src="img/social1.svg" alt=""></img>
                  <img src="img/social2.svg" alt=""></img>
                  <img src="img/social3.svg" alt=""></img>
              </div>
              <div class="phoneNumber">Support Line: +250 788 467 808</div>
              <div class="copyRight">Copyright  2021 © Sneaker City ltd</div>
          </div>
      </div>
  </footer>
</div>;
}
export default Register;
//module.exports = Container;