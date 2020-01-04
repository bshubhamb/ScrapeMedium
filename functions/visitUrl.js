const cheerio = require('cheerio');
const request = require('request');
//Functions
const checkUrl = require('./checkUrl')//Function to check if url is relative or direct
const collectLinks = require('./collectLinks'); // Function to collect all urls from the body of the page


module.exports =  function visitUrl(url , goNext,visitedUrl,startUrl,urlsToVisit) {

    // Add page to the set
    visitedUrl[url] = true;
    console.log("Visiting page " + url.split('?')[0]);

    //url = checkUrl(url, startUrl);

    try{
        if(url.split('?')[0].includes("medium")){
            //Request is asynchronous in nature
             request(url ,  function getLinks(err,res,body){

                    //Load body on cheerio dom.
                    let $ =  cheerio.load(body);
                    collectLinks($ , urlsToVisit);
                    goNext();

            });
        }
        else{
            goNext();
        }
    }
    catch (err){
        console.log("Invalid url " + url);
        goNext();
    }
};