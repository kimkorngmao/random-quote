import { khmer } from './quotes/khmer.js';
import { english } from './quotes/english.js';
import { thai } from './quotes/thai.js';
import { chinese } from './quotes/chinese.js';

const languageQuotes = {
    km: khmer,
    en: english,
    th: thai,
    cn: chinese
};

// Selectors
const quoteText = document.querySelector('.quote-text');
const languageSelect = document.querySelector('.select-lanaguge');
const copyBtn = document.getElementById('copy-btn');
const downloadImageBtn = document.getElementById("download-image-btn");

// Load selected language from local storage if available
const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
if (selectedLanguage) {
    languageSelect.value = selectedLanguage;
    setRandomQuote(selectedLanguage);
}

// Event listener for language select change
languageSelect.addEventListener('change', function () {
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    setRandomQuote(selectedLanguage);
});

// Event listener for next quote button
document.querySelector('.get-new-quote').addEventListener('click', function () {
    const selectedLanguage = languageSelect.value;
    setRandomQuote(selectedLanguage);
});

// Function to set random quote based on selected language
function setRandomQuote(language) {
    const quotes = languageQuotes[language];
    if (!quotes || quotes.length === 0) {
        quoteText.textContent = "No quotes available in this language";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteText.textContent = randomQuote.quote;
}

// Alert message
function alertMessage(text) {
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);

    setTimeout(function () {
        document.body.removeChild(messageDiv);
    }, 3000);
}

// Function to copy quote to clipboard
function copyQuote() {
    navigator.clipboard.writeText(quoteText.textContent)
        .then(() => {
           alertMessage('Quote copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy quote: ', err);
        });
}

// Attach event listeners
copyBtn.addEventListener('click', copyQuote);
downloadImageBtn.addEventListener('click', () => {
    const element = document.querySelector(".quote-box");

    html2canvas(element)
        .then(canvas => {
            // Get data URL of the canvas
            const dataURL = canvas.toDataURL("image/png");

            // Create a temporary link element
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = `${languageSelect.value}-quote`;

            // Simulate a click on the link to trigger download
            link.click();
        })
        .catch(error => {
            console.error("Error converting element to canvas:", error);
        });

})
