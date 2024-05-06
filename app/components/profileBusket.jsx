import { useState, useEffect } from 'react';
import RangeSlider from "react-range-slider-input";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
const React = require('react');
function ProfileBusket(){
    const [oldPass, setOldPass] = useState("");
    
    const [newPass, setNewPass] = useState("");
    React.useEffect(() => {
        
    }, []);
    function submit(){
        fetch('passRecover.php', {
            method: "POST",
            headers:{"Accept":"application/json", "Content-Type":"applicatoin/json"},
            body: JSON.stringify({
                password: oldPass,
                newpassword: newPass
            })
          })
            .then(response => response.json())
            .then(data => alert("Пароль изменен успешно."))
            .catch(error => console.log(error));
    }
    function onChange(e){
       if(e.target.className == "oldpass"){
            setOldPass(e.target.value);
       }else{
            setNewPass(e.target.value);
       }
    }
  return <div class="wrapper">
  <header style={{paddingBottom:0,background:"none"}}>
      <div class="container">
          <div class="headerPanel">
              <div class="logo">
                  <img src="../img/Group 3.svg"></img>
              </div>
              <nav class="nav">
                  <div class="navBtn active">New Arrivals <div class="underline"></div></div>
                  <div class="navBtn">Men <div class="underline"></div></div>
                  <div class="navBtn">Women<div class="underline"></div></div>
                  <div class="navBtn">Kids<div class="underline"></div></div>
              </nav>
              <div class="menu">
                  <div class="menuBtn">
                      <img src="../img/fi_shopping-cart.svg" alt=""></img>
                  </div>
                  <div class="menuBtn">
                      <img src="../img/fi_heart.svg" alt=""></img>
                  </div>
                  <div class="menuBtn">
                      <img src="../img/fi_user.svg" alt=""></img>
                  </div>
              </div>
          </div>
      </div>
  </header>
  <div class="globalLine"></div>
  <main>
      <div class="container">
          <div class="catalog">
              <div class="catalogFilters">
                  <div class="filterBlock">
                      <div class="label">Your profile</div>
                      <div className="profileNav">
                      <Link to="/profile/orders"><div className="profileNavBtn">Orders</div></Link>
                        
                        <Link to="/profile/passRecover"><div className="profileNavBtn">Change password</div></Link>
                        <div className="profileNavBtn">Card</div>
                      </div>
                        <div className="globalLine"></div>
                    </div>
              </div>
              <div class="catalogWrapper">
                  <div class="label">The new arrivals</div>
                  <div class="catalogWrapperList">
                  <div class="loginFormColumn">
                    <div class="inputLabel">Old password:</div>
                      <div class="inputBlock">
                          <input onChange={onChange} class="oldpass" type="text" placeholder="Enter your Username or Email..."></input>
                      </div>
                      <div class="inputLabel">New password:</div>
                      <div class="inputBlock">
                          <input onChange={onChange} class="newpass" type="text" placeholder="Enter your password..."></input>
                      </div>
                      <div  style={{marginTop:"21px"}} class="formBtn accept" onClick={submit}>Log in</div>
                  </div>            
                      
                      
                  </div>
              </div>
          </div>
      </div>
  </main>
  <footer>
      <div class="container">
          <div class="line"></div>
          <div class="logo"><img src="../img/Group 3.svg" alt=""></img></div>
          <div class="postScriptum">We don’t just sell shoes, we sell memories and collectibles. We collect the best in the best with an attention to all little details. we know that shoes speaks louder than words that’s why we’ve mastered the science of good sneakers.</div>
          <div class="inscriptions">
              <div class="socials">
                  Don’t missout on once-in-a-while-deals:
                  <img src="../img/social1.svg" alt=""></img>
                  <img src="../img/social2.svg" alt=""></img>
                  <img src="../img/social3.svg" alt=""></img>
              </div>
              <div class="phoneNumber">Support Line: +250 788 467 808</div>
              <div class="copyRight">Copyright  2021 © Sneaker City ltd</div>
          </div>
      </div>
  </footer>
</div>;
}
export default ProfileBusket;
//module.exports = Container;