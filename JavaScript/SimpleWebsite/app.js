'use strict'

console.log("Here's a hidden message");

let date = new Date();
let formatDate = date.toDateString();
let selectElement = document.getElementById('date');
selectElement.innerHTML = formatDate;