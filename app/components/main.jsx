import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const React = require('react');
function Main(){
        return <div class="wrapper">
        <header>
            <div class="container">
                <div class="headerPanel">
                    <Link to="/product/1">
                    <div class="logo">
                        <img src="img/Group 3.svg"></img>
                    </div>
                    </Link>
                    <nav class="nav">
                        <Link to="/admin/productsManager">
                        <div class="navBtn">New Arrivals<div class="underline"></div></div>
                        </Link>
                        <Link to="/register">
                        <div class="navBtn">Men<div class="underline"></div></div>
                        </Link>
                        <Link to="/login">

                        <div class="navBtn">Women<div class="underline"></div></div>
                        </Link>
                        <Link to="/catalog/newArrivals">
                        <div class="navBtn">Kids<div class="underline"></div></div>
                        </Link>
                        
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
                <div class="headerContent">
                    <div class="item">
                        <div class="itemDescription">
                            <div class="inner">
                                <div class="label">Puma Running SX</div>
                            <div class="description">The shoe that moved mountains for eternity and still does so with a swift touch of modernism</div>
                            <div class="cost">62, 000RWF</div>
                            </div>
                            
                            <div class="buyBtn">Add to card</div>
                        </div>
                        <div class="itemImg">
                            <div class="inner">
                                <div class="imgBackground"></div>
                            <img src="img/sneakers.png" alt=""></img>
                            </div>
                            
                        </div>
                    </div>
                    <div class="sliderBtns">
                        <div class="sliderBtn">
                            <img src="img/sneakers.png" alt=""></img>
                        </div>
                        <div class="sliderBtn">
                            <img src="img/sneakers2.png" alt=""></img>
                        </div>
                        <div class="sliderBtn">
                            <img src="img/sneakers3.png" alt=""></img>
                        </div>
                        <div class="sliderBtn">
                            <img src="img/sneakers4.png" alt=""></img>
                        </div>
                    </div>
                    <div class="banner">
                        <img src="img/bannerImg.png" alt=""></img>
                        <div class="text">
                            Find that sneaker you want
                            <img src="img/next.png" alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="productsList">
                    <div class="label">All the new arrivals</div>
                    <div class="content">
                        <div class="productBlock">
                            <div class="imgBlock"><img src="img/sneakers.png" alt=""></img></div>
                            <div class="name">Adiddas Beluga</div>
                            <div class="cost">35, 000RWF</div>
                        </div>
                        <div class="productBlock">
                            <div class="imgBlock"><img src="img/sneakers2.png" alt=""></img></div>
                            <div class="name">Adiddas Beluga</div>
                            <div class="cost">35, 000RWF</div>
                        </div>
                        <div class="productBlock">
                            <div class="imgBlock"><img src="img/sneakers3.png" alt=""></img></div>
                            <div class="name">Adiddas Beluga</div>
                            <div class="cost">35, 000RWF</div>
                        </div>
                        <div class="productBlock">
                            <div class="imgBlock"><img src="img/sneakers4.png" alt=""></img></div>
                            <div class="name">Adiddas Beluga</div>
                            <div class="cost">35, 000RWF</div>
                        </div>
                    </div>
                </div>
                <div class="globalMiniLink">View all new arrivals <img src="img/next.png" alt=""></img></div>
                <div class="benefitsBlock">
                    <div class="row1">
                        <img src="img/benefit4.png" alt=""></img>
                    </div>
                    <div class="row2">
                        <img src="img/benefit1.png" alt=""></img>
                        <img src="img/benefit2.png" alt=""></img>
                        <img src="img/benefit3.png" alt=""></img>
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
export default Main;
//module.exports = Container;