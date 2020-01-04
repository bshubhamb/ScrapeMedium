let express = require('express');
let app = express();
let csv = require('csv-express');
let mongoose = require('mongoose');
let Url = require('./models/urls');

//SCRAPING PARTITION

//Functions
const visitUrl = require('./functions/visitUrl');


let startUrl = 'https://medium.com';
let visitedUrl = {}; // set to keep track of visited url
let urlsToVisit = []; // urls to visit next
let maxRuns = 5;
let running = 0;

urlsToVisit.push(startUrl);

running += 1;
scrape();

async function scrape() {
    try{
        let nextPage = urlsToVisit.pop();
        if (nextPage in visitedUrl) {
            // We've already visited this page, so go to next url
            await scrape();
        } else {
            // New page we haven't visited
            await visitUrl(nextPage, scrape, visitedUrl,startUrl,urlsToVisit);

            //Run multiple instances of the scrape function to make multiple requests
            if(urlsToVisit.length > 1 && running < maxRuns){
                scrape();
                running += 1;
            }
        }
    }catch(err){
        console.log("Error in scraping");
    }

}

//Scraping partition ends




//Express partition

mongoose.connect('mongodb://localhost/Medium' );

app.listen(3000);
//Express Application partition
app.get('/',  function(req, res) {
    let fileName = 'urls.csv';
    Url.find().lean().exec({}, (err, results) => {
            if (err) res.send(err);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + fileName);

            res.csv(results, true);
        }
    );
});






