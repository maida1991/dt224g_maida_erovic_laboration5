"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Maida Erovic
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Töm tidigare fel inför varje validering
    errors = [];

    // Kontrollera att obligatoriska fält är ifyllda
    if (fullnameInput.value.trim() === "") {
        errors.push("Ange ditt namn.");
    }

    if (emailInput.value.trim() === "") {
        errors.push("Ange din e-postadress.");
    }

    if (phoneInput.value.trim() === "") {
        errors.push("Ange ditt telefonnummer.");
    }

    displayErrors();

    // Formuläret är giltigt om inga felmeddelanden finns
    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Ta bort tidigare felmeddelanden från sidan.
    errorList.textContent = "";

    // Skapa en listpunkt för varje felmeddelande.
    errors.forEach(function (error) {
        const listItem = document.createElement("li");
        listItem.textContent = error;
        errorList.appendChild(listItem);
    });
}

/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret.
    const student = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        font: fontSelect.value
    };

    // Visa studentens information på kortet.
    previewFullname.textContent = student.fullname;
    previewEmail.textContent = student.email;
    previewPhone.textContent = student.phone;

    // Använd det valda typsnittet för kortets information.
    previewFullname.style.fontFamily = student.font;
    previewEmail.style.fontFamily = student.font;
    previewPhone.style.fontFamily = student.font;

    // Lägg det senaste studentkortet först i historiken.
    history.unshift(student);

    // Spara historiken och uppdatera visningen direkt.
    saveHistory();
    renderHistory();
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    localStorage.setItem("history", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }

    // Uppdatera history
    renderHistory();
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik.
    historySection.textContent = "";

    // Skapa en lista för sparade studentkort.
    const historyList = document.createElement("ul");

    history.forEach(function (student) {
        const listItem = document.createElement("li");

        listItem.textContent =
            `${student.fullname} - ${student.email} - ${student.phone}`;

        listItem.style.fontFamily = student.font;
        historyList.appendChild(listItem);
    });

    historySection.appendChild(historyList);
}



/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare
// Låt JavaScript hantera valideringen av formuläret.
form.noValidate = true;

// Förhindra omladdning och kontrollera formulärets värden.
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        createStudentCard();
    }
});

loadHistory();
// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa" formuläret


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik