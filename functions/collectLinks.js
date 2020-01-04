
//Function to insert the urls into the database.
const upsertUrl = require('./upsert');
const checkUrl = require('./checkUrl');


module.exports =  function collectLinks($ , urlsToVisit) {
    try{    let links = $('a'); //Get all links from the body.
        console.log("Found " + links.length + " links on page");

        $(links).each(function (i, link) {
            let temp = checkUrl($(link).attr('href').split('?')[0]);
            urlsToVisit.push(temp); // Push new links into the array to visit the links


            // Add the link to database
            upsertUrl({
                href: $(link).attr('href').split('?')[0],
//---------------------------------------------------------------------------------------------------------------
                parameters: $(link).attr('href').split('?').splice(1)
//---------------------------------NEED PROPER REG EX TO EXTRACT PARAM NAMES-------------------------------------
            });
        });
    }catch (err){
        console.log("Error occurred at collectLinks");
    }

};