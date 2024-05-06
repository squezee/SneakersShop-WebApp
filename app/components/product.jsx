import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router'; 
import Popup from 'reactjs-popup';
const React = require('react');
function Product(){
    
    const params = useParams();
    const productId = params.id;
    const [counter, setCounter] = useState(1);
    const [productData, setProductData] = useState({});
    const [sliderImgs, setSliderImgs] = useState([]);
    const [sizes, setSizes]=useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [sizesRange, setSizesRange] = useState([[1,36],[2,37],[3,38],[4,39],[5,40],[6,41],[7,42],[8,43],[9,44],[10,45],[11,46]]);
    const [refresh, doRefresh] = useState(0);
    const [newDescription, setNewDescription] = useState("");
    React.useEffect(async()=>{
        const response = await fetch(`../getProduct.php?id=${productId}`, {
            method: "GET",
            headers:{"Accept":"application/json"}
        });
        if(response.ok){
            const product = await response.json();
            console.log(product);
            setProductData(product);
            setNewDescription(product.description);
            let newSliderImgs = product.imgs.split(';');
            let index = 0;
            newSliderImgs.forEach(element => {
                element=`../img/${element}`;
                newSliderImgs[index] = element;
                index=index+1;
            });
            let newSizesRange = sizesRange;
            product.sizes.split(";").forEach(productSize => {
                let index = 0;
                sizesRange.forEach(rangeSize => {
                    console.log(`productSize: ${productSize}, rangeSize[1]: ${rangeSize[1]}`);
                    if(newSizesRange[index][2] == undefined){
                        if(productSize==rangeSize[1]){
                            
                            newSizesRange[index].push(true);
                            newSizesRange[index].push("sizeBtn active");
                        }
                    }
                    index++;
                });
            });
            index = 0;
            newSizesRange.forEach(rangeSize => {
                if(newSizesRange[index][2] == undefined){
                        newSizesRange[index].push(false);
                        newSizesRange[index].push("sizeBtn");
                    
                }
                index++;
            });
            setSizesRange(newSizesRange);
            setSliderImgs(newSliderImgs);
            setSizes(product.sizes.split(';'));
        }
    }, []);
    function setSize(e){
        console.log(e.currentTarget.innerHTML);
        setSelectedSize(e.currentTarget.innerHTML);
        console.log(`Selected size = ${selectedSize}`);
    }
    function press(e){
        if(e.target.className=="plusBtn"){
            setCounter(counter+1);
        }else{
            if(counter>0){
                setCounter(counter-1);
            }
        }
        
    }
    function addToCardBtn(e){
        console.log(e.currentTarget.className);

        if(e.currentTarget.className == "submitBtn"){
            e.currentTarget.className = "submitBtn active";
            console.log(JSON.stringify({
                id: productId,
                count: `${counter}`,
                size: selectedSize
            }));
            fetch("../addToCard.php", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    id: productId,
                    size: selectedSize,
                    count: counter
                })
            });
        }else{
            e.currentTarget.className = "submitBtn";
            fetch("../deleteFromCard.php", {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    id:productId
                })
            });
        }
    }
    function onChange(e){
        console.log(e.target);
        let newSizesRange = sizesRange;
        const index = e.target.id.split('-')[1]-1;
                if(e.target.checked){
                    newSizesRange[index][2]=true;
                    newSizesRange[index][3]=["sizeBtn active"];
                }else{
                    newSizesRange[index][2]=false;
                    newSizesRange[index][3]=["sizeBtn"];
                }
        setSizesRange(newSizesRange);
        doRefresh(refresh+1);    
    }
    function deleteImgFromSlider(e){
        const id = e.currentTarget.id.split('-');
        console.log(id);
        let img = "";
        for(let i = 1; i < id.length;i++){
            if(i<id.length-1){
                img = `${img}${id[i]}-`;
            }else{
                img = `${img}${id[i]}`;
            }
            
        }
        console.log(img);
        img = img.split('/')[2];
        console.log(img);
        fetch(`../deleteImgFromSlider.php?id=${productId}&img=${img}`, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(data => console.log('Успех:', data))
          .catch(error => console.log('Ошибка:', error));
        let newSliderImgs = [];
        sliderImgs.forEach(element => {
            if(element!=`../img/${img}`){
                newSliderImgs.push(element);
            }
        });
        setSliderImgs(newSliderImgs);
    }
    function onImgChange(e){
        let form = e.target.parentNode.parentNode;
        let newSliderImgs = sliderImgs;
        newSliderImgs.push(URL.createObjectURL(e.target.files[0]));
        fetch("../addImgToProductSlider.php", {
            method: 'POST', 
            body: new FormData(form)
          })
          .then(response => response.json())
          .then(data => console.log('Успех:', data))
          .catch(error => console.log('Ошибка:', error));
        doRefresh(refresh+1);
        
    }
    function onDescriptionChange(e){
        setNewDescription(e.target.value);
    }
    function onPopupClose(){
        let sizes = "";
        sizesRange.forEach(element => {
            if(element[2]){
                if(sizes!=""){
                    sizes=`${sizes};${element[1]}`;
                }else{
                    sizes=`${element[1]}`;
                }
            }
        });
        if(productData.description!=newDescription||sizes!=productData.sizes){
            fetch("../setDescriptionAndSizesForProduct.php", {
                method: 'POST', 
                body: JSON.stringify({
                    id: productId,
                    description: newDescription,
                    sizes: sizes
                })
              })
              .then(response => response.json())
              .then(data => console.log('Успех:', data))
              .catch(error => console.log('Ошибка:', error));
              let newProductData = productData;
              newProductData.description = newDescription;
              setSizes(sizes.split(";"));
              setProductData(newProductData);
              doRefresh(refresh+1);
        }
    }
    function test(){
        console.log(sizesRange);
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
                <div class="productWrapper">
                    <div class="productViewer">
                        <div class="productNameImgAndLike">
                        <Popup onClose={onPopupClose} trigger={<div class="editBtn product"><img src="../img/edit.png" /></div>} modal repositionOnResize lockScroll>
                            <div class="popupEditContent">
                                <div className="popupEditLabel">Photoes: </div>
                                <div class="popupEditImages">
                                {sliderImgs.map(item=>(
                                    <div key={item} class="editImagesItem">
                                    <img class="imgToEdit" srcSet={item} alt=""></img>
                                    <div onClick={deleteImgFromSlider} class="deleteBtn" id={`delete-${item}`}>
                                    <img src="../img/cross.png" alt="" />
                                    </div>
                                    
                                    </div>
                                ))}
                                <div class="addImgBtn">
                                    <form method="POST" action="../addImgToProductSlider.php" enctype="multipart/form-data">
                                    <input type="hidden" name="id" value={productId} />
                                    <label>
                                    <img src="../img/plus.png" alt="" />
                                    <input name="img" onChange={onImgChange} type="file" style={{display:"none"}}/>
                                    </label>
                                    </form>
                                    
                                </div>
                                </div>
                                <div class="popupEditDescriptionAndSizes">
                                    <div className="popupEditLabel">Description: </div>
                                    <textarea defaultValue={productData.description} onChange={onDescriptionChange} cols="30" rows="10"></textarea>
                                    <div className="popupEditLabel">Sizes: </div>
                                    <div class="sizeBtns editMode">
                                        {sizesRange.map(item => (
                                                            
                                        <div key={item[0]}>
                                            <input defaultChecked={item[2]} type="checkbox" id={`size-${item[0]}`} value={item[1]} onChange={onChange}></input>
                                            <label className={item[3]} id={`forSize-${item[0]}`} for={`size-${item[0]}`}>{item[1]}</label>
                                        </div>
                                                            ))}
                                        
                                    </div>

                                </div>
                            </div>
                        </Popup>
                            <div class="productNamePrice">
                                <div onClick={test} class="name">{productData.name}</div>
                                <div class="price">{productData.price}RWF</div>
                                
                            </div>
                            <div class="likeBtnWrapper">
                                <div class="likeBtn"><img src="../img/fi_heart.svg" alt=""></img></div>
                            </div>
                        </div>
                        <div class="productImages">
                            <Carousel>
                                {sliderImgs.map(item=>(
                                    <div key={item} class="sliderItem">
                                    <img srcSet={item} alt=""></img>
                                    </div>
                                ))}
                                
                            </Carousel>
                            
                        </div>
                    </div>
                    <div class="productInformation">
                        <div class="productInformationDescription">
                            <div class="descriptionBtn">
                                Description <img src="../img/fi_chevron-up.svg" alt=""></img>
                            </div>
                            <div class="description">
                              {productData.description}
                            </div>
                            <div class="line"></div>
                        </div>
                        <div class="productInformationSelectSize">
                            <div class="label">Select size</div>
                            <div class="sizeBtns">
                                {sizes.map(item=>( 
                                    <div key={item} class="sizeBtn" onClick={setSize}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div class="submitBtnWrapper">
                            <div class="counter">
                                <div class="minusBtn counterBtn" onClick={press}><img class="minusBtn" src="../img/fi_minus.svg" alt=""></img></div>
                                <div class="counterDisplay">{counter}</div>
                                <div class="plusBtn counterBtn" onClick={press}><img class="plusBtn" src="../img/fi_plus.svg" alt=""></img></div>
                            </div>

                            <div class="submitBtn" onClick={addToCardBtn}>
                                
                                <div className="addText">Add to card</div>
                                <div className="deleteText">In card</div>
                                <img src="../img/chekmark.png" alt="" />
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
export default Product;
//module.exports = Container;