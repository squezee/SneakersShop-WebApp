import { useState, useEffect } from 'react';
import RangeSlider from "react-range-slider-input";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
const React = require('react');

function AdminPanelProductsEditor(){
    
    const [products, setProducts] = useState([]);
    const [productsImgs, setProductsImgs] = useState([]);
    const [refresh, doRefresh] = useState(0);
    const [productsForChange, setProductsForChange] = useState([]);
    React.useEffect(async () => {
        const response = await fetch("/getAllProducts.php",{
            method:"POST",
            headers: {"Accept":"application/json"}
        });
        if(response.ok){
            const products = await response.json();
            
            let newImgs = [];
            products.forEach(element => {
                newImgs.push([element.img, element.id]);
            });
            setProducts(products);
            
            setProductsImgs(newImgs);
            console.log(productsImgs);
        }
    }, []);
    function getImgById(id){
        console.log(productsImgs);
        let img;
        productsImgs.forEach(element => {
            if(element[1] == id){
                console.log(element[0]);
                img= element[0];
                
            }
        });
        if(img.slice(0,4)=="blob"){
            return img;
        }else{
            return `../img/${img}`;
        }
    }
    async function editModeSwitch(e){
        console.log(e.currentTarget);
        let fullBlock = e.currentTarget.parentNode.parentNode.parentNode;
        console.log(fullBlock);
        
            if(fullBlock.className=="catalogProductBlock"){
                
                fullBlock.className="catalogProductBlock editMode";
            }else{
                fullBlock.className="catalogProductBlock";
            }
        
    }
    function onImgChange(e){
        console.log("UPLOAD");
        
        const id = e.target.id.split('-')[1];
        let newFiles = productsImgs;
        newFiles.forEach(element => {
            if(element[1]==id){
                element[0]=URL.createObjectURL(e.target.files[0]);
            }
        });
        setProductsImgs(newFiles);
        doRefresh(refresh+1);

    }
    function onImgLoad(e){
        var img = new Image();     
        img.onload = function() {     
            console.log(`width: ${this.width}px, height: ${this.height}px`);
            console.log(e.target);
        if(this.width>this.height){
            e.target.style.width = "auto";
            e.target.style.height = "100%";
        }else{
            e.target.style.width = "100%";
            e.target.style.height = "auto";
        }
        }     
        img.src = `${e.target.srcset}`;
    }
    function confirmProductChange(e){
        let form = e.currentTarget.parentNode.previousSibling;
        console.log(form);
        fetch("../changeProduct.php", {
            method: 'POST', 
            body: new FormData(form)
          })
          .then(response => response.json())
          .then(data => console.log('Успех:', data))
          .catch(error => console.log('Ошибка:', error));
          let fullBlock = e.currentTarget.parentNode.parentNode.parentNode;
          console.log(fullBlock);
          
              if(fullBlock.className=="catalogProductBlock"){
                  
                  fullBlock.className="catalogProductBlock editMode";
              }else{
                  fullBlock.className="catalogProductBlock";
              }

    }
    function editInputOnChange(e){
        let id = e.target.dataset.id;
        if(e.target.name == "name"){
            let newProducts = products;
            let index = 0;
            newProducts.forEach(element => {
                if(element.id==id){
                    element.name = e.target.value;
                    newProducts[index] = element;
                }
                index=index+1;
            });
            setProducts(newProducts);
        }else{
            let newProducts = products;
            let index = 0;
            newProducts.forEach(element => {
                if(element.id==id){
                    element.price = e.target.value;
                    newProducts[index] = element;
                }
                index=index+1;
            });
            setProducts(newProducts);
        }
        doRefresh(refresh+1);
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
                      <Link to="/profile/orders"><div className="profileNavBtn">Products Editor</div></Link>
                        
                        <Link to="/profile/passRecover"><div className="profileNavBtn">Orders manager</div></Link>
                        <div className="profileNavBtn">Users manager</div>
                      </div>
                        <div className="globalLine"></div>
                    </div>
              </div>
              <div class="catalogWrapper">
                  <div class="label">Products manager</div>
                  <div class="catalogWrapperList">
                                    {products?.map(item => (
                                            <div id={item.id} class="catalogProductBlock" key={item.id}>
                                                
                                                <div className="defaultMode">
                                                    <div class="imgBlock">
                                                        <img onLoad={onImgLoad} srcSet={getImgById(item.id)}></img>
                                                    
                                                    </div>
                                                    <div class="name">{item.name}</div>
                                                    <div class="cost">{item.price}RWF</div>
                                                    <div className="controlBtns">
                                                    <div className="editBtn" onClick={editModeSwitch}><img src="../img/edit.png" /></div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="editMode">
                                                    <form method="POST" action="../changeProduct.php" enctype="multipart/form-data">
                                                        <input type="hidden" name="id" value={item.id} />
                                                    <div class="imgBlock editMode">
                                                        <img srcSet={getImgById(item.id)} onLoad={onImgLoad}></img>
                                                        <div className="uploadImg">
                                                            <label class="uploadLabel">
                                                                <input name="img" id={`imgInput-${item.id}`} onChange={onImgChange} class="imgChange" type="file" style={{display:"none"}}/>
                                                                <img src="../img/upload_icon.png" alt="" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    
                                                        
                                                        <div className="editInputBlock">
                                                            <input data-id={item.id} onChange={editInputOnChange} name="name" type="text" placeholder="Name" className="editInput" defaultValue={item.name}/>
                                                        </div>
                                                        <div className="editInputBlock">
                                                            <input data-id={item.id} onChange={editInputOnChange} name="price" type="text" placeholder='Price' className="editInput" defaultValue={item.price}/>
                                                        </div>
                                                    </form>
                                                    <div className="controlBtns">
                                                    <div className="editBtn confirm" data-id={item.id} onClick={confirmProductChange} ><img src="../img/chekmark.png" /></div>

                                                    <div className="editBtn deny" onClick={editModeSwitch}><img src="../img/cross.png" /></div>
                                                    </div>
                                                </div>
                                            </div>
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
export default AdminPanelProductsEditor;
//module.exports = Container;