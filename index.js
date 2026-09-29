// Character Sets
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// DOM Elements
const lengthInput = document.getElementById("password-length-input");
const includeSymbolsCheckbox = document.getElementById("include-symbol-checkbox");
const includeNumbersCheckbox = document.getElementById("include-number-checkbox");
const includeLowercaseCheckbox = document.getElementById("include-lowercase-checkbox");
const includeUppercaseCheckbox = document.getElementById("include-uppercase-checkbox");

const pwd1El = document.getElementById("pwd-1");
const pwd2El = document.getElementById("pwd-2");

let length = parseInt(lengthInput.value) || 12;

function updateLength(value) {
    length = parseInt(value) || 0;
}

function getSelectedCharacters() {
    const selected = [];

    if (includeSymbolsCheckbox.checked) selected.push(...symbols);
    if (includeNumbersCheckbox.checked) selected.push(...numbers);
    if (includeLowercaseCheckbox.checked) selected.push(...lowercase);
    if (includeUppercaseCheckbox.checked) selected.push(...uppercase);

    return selected;
}

function getRandomPwd(characters) {
    let pwd = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        pwd += characters[randomIndex];
    }
    return pwd;
}

function generatePassword() {
    const availableCharacters = getSelectedCharacters();

    if (availableCharacters.length === 0) {
        alert("Please select at least one character set!");
        pwd1El.textContent = "";
        pwd2El.textContent = "";
        return;
    }

    if (length < 4 || length > 64) {    
        alert("Please specify a valid length (4 - 64).");
        return;
    }

    pwd1El.textContent = getRandomPwd(availableCharacters);
    pwd2El.textContent = getRandomPwd(availableCharacters);
}

function copyPwd(element) {
    const textToCopy = element.textContent;

    if (!textToCopy || textToCopy === "Copied!") return;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            element.classList.add("copied-state");
            element.textContent = "Copied!";

            setTimeout(() => {
                element.textContent = textToCopy;
                element.classList.remove("copied-state");
            }, 1500);
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
}