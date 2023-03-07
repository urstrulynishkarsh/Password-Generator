const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copiedMessage=document.querySelector('[data-copyMsg]');
const lengthNumber=document.querySelector('[data-lengthNumber]');
const lengthSlider=document.querySelector('[data-lengthSlider]');
const indicator=document.querySelector('[data-indicator]');
const copyBtn=document.querySelector('[data-copy]');
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberCheck=document.querySelector('#number'); 
const symbolCheck=document.querySelector('#symbol');
const generateBtn=document.querySelector('.Generate-btn');
const allCheckBox=document.querySelectorAll("input[type=checkbox]");


const symbol='~`!@#$%^&*()-_+=:;"<,>.?/|/*'

let password="";
let passwordLength=10; 
let checkCount=0;
// starting color gray circle
setIndicator("#ccc");

handleSlider();

function handleSlider(){
    lengthSlider.value=passwordLength;
    lengthNumber.innerText=passwordLength;   
    const min=lengthSlider.min;
    const max=lengthSlider.max;
    lengthSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)) + "% 100%"

}


function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase()
{
    return String.fromCharCode( getRandomInteger(97,123));
}

function generateUpperCase()
{
    return String.fromCharCode( getRandomInteger(65,91));
}

function generateSymbol()
{
    const randomnumber=getRandomInteger(0,symbol.length)
    return symbol.charAt(randomnumber);
}

function calcStrength(){
    let isUpper=false;
    let isLower=false;
    let isNumber=false;
    let isSymbol=false;

    if(uppercaseCheck.checked) isUpper=true;
    if(lowercaseCheck.checked) isLower=true;
    if(numberCheck.checked) isNumber=true;
    if(symbolCheck.checked) isSybmbol=true;

    if(isUpper && isLower && (isNumber || isSymbol) && passwordLength>=8)
    {
        setIndicator('#0f0');
    }
    else if((isUpper || isLower) && (isNumber || isSymbol)&& passwordLength>=6)
    {
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }

}
function shufflePassword(array){
    //fisher yates method
    for(let i=array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
} 


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copiedMessage.innerText = "copied";
    }
    catch(e){

        copiedMessage.innerText='failed';
    }
    copiedMessage.classList.add('active');
    setTimeout(() => {
        copiedMessage.classList.remove('active');  
    },5000);
}

function handleCheckBoxChange()
{
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        {
            checkCount++;
        }

    });
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange)
}
)

lengthSlider.addEventListener('input',(e) => {
    passwordLength=e.target.value;
    handleSlider();
});


copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value)
    {
        copyContent();
    }
})

generateBtn.addEventListener('click',() => {
    if(checkCount==0)   return;
    if(checkCount>passwordLength)
    {
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    // if(uppercaseCheck.checked)
    // {
    //     password+=generateUpperCase();
    // }
    // if(lowercaseCheck.checked)
    // {
    //     password+=generateLowerCase();
    // }
    // if(numberCheck.checked)
    // {
    //     password+=generateRandomNumber();
    // }
    // if(symbolCheck.checked)
    // {
    //     password+=generateSymbol();
    // }


let funarr=[];
if(uppercaseCheck.checked)
{
    funarr.push(generateUpperCase);
}
if(lowercaseCheck.checked)
{
    funarr.push(generateLowerCase);
}
if(numberCheck.checked){
    funarr.push(generateRandomNumber);
}
if(symbolCheck.checked)
{
    funarr.push(generateSymbol);

}

for(let i=0;i<funarr.length;i++){
    password+=funarr[i]();
}
console.log("helo")
for(let i=0;i<passwordLength-funarr.length;i++){
    let randomindex=getRandomInteger(0,funarr.length);
    password+=funarr[randomindex]();
}

password=shufflePassword(Array.from(password));
console.log("shuffling done");
passwordDisplay.value=password;

calcStrength();




})







