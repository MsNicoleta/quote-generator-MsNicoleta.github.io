const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}

    //Show new quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank and replace it with Unknown
    if (!quote.author) {
    authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //check quoteLength to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
         quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
    // Get Quotes From API
async function getQuotes()/* An asynchronous function can run at any time indipendently and it won't stop the browser from completing the loading of a page*/{
    loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try /* a try & catch allows us to attempt to complete a fetch request but if it doesn't work we can catch the error information   */ {
        const response = await fetch(apiUrl); /* the initial part of the string wont be populated until we won't receive the fetched data */
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        /* Error catch here */
        alert(error)

  }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)



// On load
getQuotes();


// if we would use our local quotes we would need to comment the function above  Get Quotes From API  and we would commet the getQuotes and add  newQuote();  comment the empty Arrray at the top. also the apiQuotes from other functions would need to be changed for  localQuotes
