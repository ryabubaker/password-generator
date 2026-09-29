const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

let characters = [];

let lengthInput = document.getElementById("password-length-input");
let length = parseInt(lengthInput.value); 

let includeSymbolsCheckbox = document.getElementById("include-symbol-checkbox");
let includeNumbersCheckbox = document.getElementById("include-number-checkbox");
let includeLowercaseCheckbox = document.getElementById("include-lowercase-checkbox");
let includeUppercaseCheckbox = document.getElementById("include-uppercase-checkbox");


let pwd1El = document.getElementById("pwd-1");
let pwd2El = document.getElementById("pwd-2");

function updateLength(value) {
    length = parseInt(value);
}

function updateCharacters() {
    if (includeSymbolsCheckbox.checked ){
        characters.push(...symbols);
    }

    if (includeNumbersCheckbox.checked ){
        characters.push(...numbers);
    }

    if (includeLowercaseCheckbox.checked) {
        characters.push(...lowercase);
    }

    if (includeUppercaseCheckbox.checked) {
        characters.push(...uppercase);
    }
    
}

function getRandomPwd() {
    updateCharacters()
    
    let pwd = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        pwd += characters[randomIndex];
    }
    return pwd;
}

function generatePassword() {
    pwd1El.textContent = getRandomPwd();
    pwd2El.textContent = getRandomPwd();
}

function copyPwd(element) {
    const textToCopy = element.textContent;

    if (!textToCopy || textToCopy === "Copied!") return;

    navigator.clipboard.writeText(textToCopy).then(() => {
        element.classList.add('copied-state');
        
        element.textContent = "Copied!";

        setTimeout(() => {
            element.textContent = textToCopy;
            element.classList.remove('copied-state');
        }, 1500);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}
