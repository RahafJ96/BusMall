'use strict';
let imagesContainer = document.getElementById('imagesContainer')
let leftImageElement=document.getElementById('left-image');
let midImageElement=document.getElementById('mid-image');
let rightImageElement=document.getElementById('right-image');

let maxAttempts=10; //change to 25 at last <--------------
let userAttemptsCounter=0;

// The random number index for the each image
let leftImageIndex; 
let midImageIndex;
let rightImageIndex;



function Product(name,imgSource) {
  this.name = name;
  this.imgSource = imgSource;
  this.timeShown = 0;
  this.votes=0;

  Product.allProducts.push(this);
}

// will contain all of the goats that will be created

Product.allProducts=[];


new Product('bag','Images/bag.jpg');//0
new Product('banana','Images/banana.jpg');//1
new Product('bathroom','Images/bathroom.jpg');//2
new Product('boots','Images/boots.jpg');//3
new Product('breakfast','Images/breakfast.jpg');//4
new Product('bubblegum','Images/bubblegum.jpg');//5
new Product('chair','Images/chair.jpg');//6
new Product('cthulhu','Images/cthulhu.jpg');//7
new Product('dog-duck','Images/dog-duck.jpg');//8
new Product('dragon','Images/dragon.jpg');//9
new Product('pen','Images/pen.jpg');//10
new Product('pet-sweep','Images/pet-sweep.jpg');//11
new Product('scissors','Images/scissors.jpg');//12
new Product('shark','Images/shark.jpg');//13
new Product('sweep','Images/sweep.png');//14
new Product('tauntaun','Images/tauntaun.jpg');//15
new Product('unicorn','Images/unicorn.jpg');//16
new Product('usb','Images/usb.gif');//17
new Product('water-can','Images/water-can.jpg');//18
new Product('wine-glass','Images/wine-glass.jpg');//19

console.log(Product.allProducts);


function generateRandomIndex() {
  return Math.floor(Math.random() * Product.allProducts.length); 
}



function renderThreeImages() {

  leftImageIndex=generateRandomIndex();
  midImageIndex=generateRandomIndex();
  rightImageIndex=generateRandomIndex();

  while ((leftImageIndex===rightImageIndex) || (leftImageIndex===midImageIndex) || (midImageIndex===rightImageIndex) ) {
    rightImageIndex=generateRandomIndex();
    midImageIndex=generateRandomIndex();
    
  }



  // console.log(Product.allProducts[leftImageIndex].imgSource);

  leftImageElement.src=Product.allProducts[leftImageIndex].imgSource;
  Product.allProducts[leftImageIndex].timeShown++;
  midImageElement.src=Product.allProducts[midImageIndex].imgSource;
  Product.allProducts[midImageIndex].timeShown++;
  rightImageElement.src=Product.allProducts[rightImageIndex].imgSource;
  Product.allProducts[rightImageIndex].timeShown++;

}

renderThreeImages();

imagesContainer.addEventListener('click',handleUserClick);

let button=document.getElementById('resultBox');
button.addEventListener('click',handleUserClick);


// leftImageElement.addEventListener('click',handleUserClick);
// midImageElement.addEventListener('click',handleUserClick);
// rightImageElement.addEventListener('click',handleUserClick);



function handleUserClick(event) {
  
  // console.log(event.target.id);
  userAttemptsCounter++;


  if (userAttemptsCounter<=maxAttempts) {


    if (event.target.id==='left-image') {
 
      Product.allProducts[leftImageIndex].votes++

    }else if (event.target.id==='right-image')  {
      Product.allProducts[rightImageIndex].votes++

    }else{
      Product.allProducts[midImageIndex].votes++

    }
    renderThreeImages();

  }else{

    document.getElementById("demo").onclick = function() {resultButton()};
    
    // stop the clicking
    imagesContainer.removeEventListener('click',handleUserClick);
    // leftImageElement.removeEventListener('click',handleUserClick);
    // midImageElement.removeEventListener('click',handleUserClick);
    // rightImageElement.removeEventListener('click',handleUserClick);
    
    
    renderThreeImages();
  }
}

// show results
function resultButton(){
  let list=document.getElementById('resultBox');
  for (let i = 0; i < Product.allProducts.length; i++) {
        let productResults=document.createElement('li');
        
        list.append(productResults);
        
        productResults.textContent=`${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes and shown ${Product.allProducts[i].timeShown} times `;
        }
        renderThreeImages();
   
    }