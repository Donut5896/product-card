const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const products = document.querySelectorAll('.product');
const gradients = document.querySelectorAll('.gradient');
const productBg = document.querySelector('.product-bg');

let prevcolor = "blue";
let animationEnd = true;

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){

    if(!animationEnd) return;

    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let product = document.querySelector(`.product[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevcolor}"]`);
   
   
    //change button color
    colors.forEach(color => color.classList.remove('active'));
    this.classList.add('active');

    //change card color
    document.documentElement.style.setProperty('--primary', primary);

    //display clicked product img
    products.forEach( p => p.classList.remove('show'));
    product.classList.add('show');

    
    //remove "first" class from gradient then add it to the gradient that we want to display
   
    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first');
    // display previous color when click
    prevGradient.classList.add('second');
     
    prevcolor = color;
    animationEnd = false;

    //animation
    gradient.addEventListener('animationEnd', () => {
        animationEnd = true;
    })

}

sizes.forEach(size => size.addEventListener('click', changeSize)); 
colors.forEach(color => color.addEventListener('click', changeColor));

//change product background height for small screen

let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    if(x.matches){
        let productHeight = products[0].offsetHeight;
        //set the height to 90% of the product height
        productBg.style.height = `${productHeight * 0.9}px`;
    }
    else{
        productBg.style.height = "475px";
    }
}

changeHeight();
window.addEventListener('resize', changeHeight);