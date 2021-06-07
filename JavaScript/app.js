'use strict';
let imagesContainer = document.getElementById('imagesContainer')
let leftImageElement=document.getElementById('left-image');
let midImageElement=document.getElementById('mid-image');
let rightImageElement=document.getElementById('right-image');

let maxAttempts=25; //change to 25 at last <--------------
let userAttemptsCounter=0;
let prevRound=[];
// The random number index for the each image
let leftImageIndex; 
let midImageIndex;
let rightImageIndex;
let nameProduct=[];
let votes=[];
let timeShown=[];

function Product(name,imgSource) {
  this.name = name;
  this.imgSource = imgSource;
  this.timeShown = 0;
  this.votes=0;
  
  nameProduct.push(this.name);
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
  
  
  while ((leftImageIndex===rightImageIndex) || (leftImageIndex===midImageIndex) || (midImageIndex===rightImageIndex)|| 
  prevRound.includes(leftImageIndex) || prevRound.includes(midImageIndex)||prevRound.includes(rightImageIndex)) {
    
    rightImageIndex=generateRandomIndex();
    midImageIndex=generateRandomIndex();
    leftImageIndex=generateRandomIndex();
    
  }
  
 // prevRound=[leftImageIndex,midImageIndex,rightImageIndex];
  console.log(prevRound);
  prevRound=[];
  prevRound.push(leftImageIndex,midImageIndex,rightImageIndex);
  
  
  // console.log(Product.allProducts[leftImageIndex].imgSource);
  
  leftImageElement.src=Product.allProducts[leftImageIndex].imgSource;
  Product.allProducts[leftImageIndex].timeShown++;
  midImageElement.src=Product.allProducts[midImageIndex].imgSource;
  Product.allProducts[midImageIndex].timeShown++;
  rightImageElement.src=Product.allProducts[rightImageIndex].imgSource;
  Product.allProducts[rightImageIndex].timeShown++;
  
}

// console.log(turn1);
renderThreeImages();

imagesContainer.addEventListener('click',handleUserClick);

// =document.getElementById('button');
// button.addEventListener('click',handleUserClick);



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
      
    }else if (event.target.id==='mid-image')  {
      Product.allProducts[midImageIndex].votes++
      
    }else{
      alert('Please only click on images');
      userAttemptsCounter--;
    }
    renderThreeImages();
    
  }else{
    
    
    let button = document.getElementById('demo');
    button.hidden = false;
    button.addEventListener('click',resultButton);    
    
    // document.getElementById("demo").onclick = function() {resultButton()};
    
    // stop the clicking
    imagesContainer.removeEventListener('click',handleUserClick);
    // leftImageElement.removeEventListener('click',handleUserClick);
    // midImageElement.removeEventListener('click',handleUserClick);
    // rightImageElement.removeEventListener('click',handleUserClick);
    
    
    // renderThreeImages();
    
    for (let i = 0; i < Product.allProducts.length; i++) {
      
      votes.push(Product.allProducts[i].votes);
      timeShown.push(Product.allProducts[i].timeShown);
    }
    
    chart();

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
  
  
  //button.removeEventListener('click',resultButton);
  
  button.hidden=true;
  //renderThreeImages();
  
}

function chart() {
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
          data: {
              labels:nameProduct,
              datasets: [{
                  label: '# of Votes',
                  data:votes,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgb(0, 204, 0, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgb(204, 0, 0, 0.2)',
                      'rgb(255, 102, 0, 0.2)'

                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgb(0, 204, 0, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgb(204, 0, 0, 1)',
                      'rgb(255, 102, 0, 1)'
                  ],
                  borderWidth: 1
              },
              {
                label: '# of Shown',
                data:timeShown,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgb(0, 204, 0, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgb(204, 0, 0, 0.2)',
                    'rgb(255, 102, 0, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgb(0, 204, 0, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgb(204, 0, 0, 1)',
                    'rgb(255, 102, 0, 1)'

                ],
                borderWidth: 1
            }
            ]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
        
        productResults.textContent=`${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes and shown ${Product.allProducts[i].timeShown} times `;
        }
        button.removeEventListener('click',resultButton);


        renderThreeImages();
        button.hidden=true;
        //renderThreeImages();
   
    }