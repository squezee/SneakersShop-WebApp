import { useState, useEffect } from 'react';
import RangeSlider from "react-range-slider-input";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
const React = require('react');
function Catalog(){
    const [filters,setFilters] = useState({});
    const [data, setData] = useState([]);
    const [value, setValue] = useState([25000, 85000]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const params = useParams();
    const productsCategory = params.category;
    React.useEffect(() => {
        console.log(JSON.stringify({
            brand:brands,
            range:value,
            size:sizes,
            category: productsCategory
        }));
      fetch('../getProducts.php', {
        method: "POST",
        headers:{"Accept":"application/json","Content-Type":"application/json"},
        body:JSON.stringify({
            brand:brands,
            range:value,
            size:sizes,
            category: productsCategory
        })
      })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
        fetch('../getFilters.php', {
            method: "POST",
            headers:{"Accept":"application/json"}
          })
            .then(response => response.json())
            .then(data => setFilters(data))
            .catch(error => console.log(error));
    }, []);
    function onChange(e){
        console.log(filters);
        console.log(filters.brands);
        if(typeof e!=="undefined"){
            if(e.target.id.split('-')[0]=="size"){
                if(e.target.checked){
                    e.target.nextElementSibling.className = "sizeBtn active";
                    let temp = sizes;
                    temp.push(e.target.value);
                    setSizes(temp);
                }else{
                    let temp = sizes;
                    e.target.nextElementSibling.className = "sizeBtn";
                    for(let i=0;i<temp.length;i++){
                        if(temp[i]==e.target.value){
                            temp.splice(i,1);
                        }
                    }
                    setSizes(temp);
                }
            }else{
                if(e.target.checked){
                    let temp = brands;
                    temp.push(e.target.value);
                    setBrands(temp);
                }else{
                    let temp = brands;
                    for(let i=0;i<temp.length;i++){
                        if(temp[i]==e.target.value){
                            temp.splice(i,1);
                        }
                    }
                    setBrands(temp);
                }
            }
        }
        fetch('../getProducts.php', {
            method: "POST",
            
            body:JSON.stringify({
                brand:brands,
                range:value,
                size:sizes,
                category: productsCategory
            })
          })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
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
                      <div class="label">Brand</div>

                      {filters.brands?.map(item => (
                                        
                                        <div class="filterCheckBoxBlock" key={item.id}>
                          <input type="checkbox" id={`brand-${item.id}`} class="filterCheckbox" value={item.name} onChange={onChange}></input>
                                      <label for={`brand-${item.id}`}>{item.name}</label>
                      </div>
                                        ))}
                      
                  </div>
                  <div class="globalLine"></div>
                  <div class="filterBlock">
                      <div class="label">Price range</div>
                      <RangeSlider 
                      min={0}
                      max={100000}
                      step={"any"}
                      id="range-slider-ab"
                      className="margin-lg"
                      value={value}
                      onInput={setValue}
                      onThumbDragEnd={onChange}
                      ></RangeSlider>
                      <div className="values">
                        <div className="minValue">{Math.round(value[0])+"₽"}</div>
                        <div className="maxValue">{Math.round(value[1])+"₽"}</div>
                      </div>
                  </div>
                  <div class="globalLine"></div>
                  <div class="filterBlock">
                      <div class="label">Size</div>
                      <div class="sizeBtns">
                      {filters.sizes?.map(item => (
                                        
                                        <div key={item.id}>
                          <input type="checkbox" id={`size-${item.id}`} value={item.name} onChange={onChange}></input>
                          <label class="sizeBtn" id={`forSize-${item.id}`} for={`size-${item.id}`}>{item.name}</label>
                      </div>
                                        ))}
                          
                      </div>
                  </div>
              </div>
              <div class="catalogWrapper">
                  <div class="label">The new arrivals</div>
                  <div class="catalogWrapperList">
                                    {data.map(item => (
                                        <Link to={`../../product/${item.id}`}>
                                            <div class="catalogProductBlock" key={item.id}>
                                                <div class="imgBlock">
                                                    <img srcSet={"../img/"+item.img}></img>
                                                
                                                </div>
                                                <div class="name">{item.name}</div>
                                                <div class="cost">{item.price}RWF</div>
                                            </div>
                                        </Link>
                                    ))}
                      
                      
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
export default Catalog;
//module.exports = Container;