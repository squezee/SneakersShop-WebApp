import { useState, useEffect } from 'react';
const React = require('react');
function Busket(){
    const [counters, setCounters] = useState([]);
    const [refresh, makeRefresh] = useState(0);
    const [positions, setPositions] = useState([]);
    const [prices, setPrices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    React.useEffect(async()=>{
        const response = await fetch("/isLogin.php", {
            method:"GET",
            headers:{"Accept":"application/json"}
        });
        if(response.ok){
            const user = await response.json();
            console.log(user);
            const busketProducts = user.user.busket.split(';');
            
            let idsOfProducts = [];
            let countsOfProducts = [];
            let sizesOfProducts = [];
            busketProducts.forEach(element => {
                const parameters = element.split(":");
                idsOfProducts.push(parameters[0]);
                sizesOfProducts.push(parameters[1]);
                countsOfProducts.push(parseInt(parameters[2]));
            });

            const getBusket = await fetch("/getBusket.php", {
                method:"POST",
                headers: {"Content-Type":"application/json", "Accept":"application/json"},
                body: JSON.stringify({
                    ids: idsOfProducts
                })
            });
            if(getBusket.ok){
                let products = await getBusket.json();
                for(let i = 0;i<products.length;i++){
                    products[i].count = countsOfProducts[i];
                    products[i].size = sizesOfProducts[i];
                }
                console.log(`PRODUCTS: ${JSON.stringify(products)}`);
                let newPrices = [];
                let newTotalPrice = 0;
                for(let i = 0; i<products.length;i++){
                    
                    newPrices.push(products[i].price);
                    newTotalPrice=newTotalPrice+products[i].price*products[i].count;
                }
                setPrices(newPrices);
                setCounters(countsOfProducts);
                setPositions(products);
                setTotalPrice(newTotalPrice);
            }
        }
    }, []);
    
    function press(e){
        const id = parseInt(e.target.parentNode.parentNode.id.split('-')[1]);
        
        if(e.target.className=="plusBtn"){
            let temp = counters;
            console.log(temp[id]);
            console.log(id);
            temp[id] = temp[id]+1;
            console.log(temp);
            setCounters(temp);
        }else{
            let temp = counters;
            if(temp[id]>1){
                console.log(temp);
                temp[id] = temp[id]-1;
                setCounters(temp);
                console.log(temp);
            }else{
                fetch("../deleteFromCard.php", {
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({
                        id:id+1
                    })
                });
                e.target.parentNode.parentNode.parentNode.parentNode.remove();
            }
            
        }
        let newTotalPrice = 0;
        for(let i=0;i<prices.length;i++){
            newTotalPrice = newTotalPrice + prices[i]*counters[i];
        }
        setTotalPrice(newTotalPrice);
        makeRefresh(refresh+1);
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
          <div class="busketAndOrderSummary">
              <div class="busket">
                  <div class="label">Your shopping cart</div>
                  <div class="busketWrapper">
                  {positions?.map(position=>(
                    <div class="positionBlock" key={position.id}>
                        <div style={{display: "none"}} className="size">{position.size}</div>
                    <div class="infoAndImg">
                        <div class="imgBlockWrapper">
                            <div class="imgblock"><img srcSet={`img/${position.img}`} alt=""></img></div>
                        </div>
                        
                        <div class="info">
                            <div class="name">{position.name}</div>
                            <div class="price">{`${position.price}RWF`}</div>
                        </div>
                    </div>
                    
                    <div class="counterBlock">
                        <div class="counter" id={`counter-${position.id-1}`}>
                            <div class="minusBtn counterBtn" onClick={press}><img class="minusBtn" src="img/fi_minus.svg" alt=""></img></div>
                            <div class="counterDisplay">{counters[position.id-1]}</div>
                            <div class="plusBtn counterBtn" onClick={press}><img class="plusBtn" src="img/fi_plus.svg" alt=""></img></div>
                        </div>
                    </div>
                    <div class="priceBlock">{`${position.price}RWF`}</div>
                </div>
                  ))}
                      
                  </div>
              </div>
              <div class="orderSummary">
                  <div class="label">Order summary</div>
                  <div class="summaryItem">
                      <div class="name">Sub total</div>
                      <div class="value">{`${totalPrice}RWF`}</div>
                  </div>
                  <div class="summaryItem">
                      <div class="name">Delivery fee</div>
                      <div class="value">0RWF</div>
                  </div>
                  <div class="line"></div>
                  <div class="totalPrice">{`${totalPrice}RWF`}</div>
                  <div class="submitBtnWrapper">
                      <div class="submitBtn">Proceed to checkout</div>
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
export default Busket;
//module.exports = Container;