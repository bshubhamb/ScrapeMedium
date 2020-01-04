const mongoose = require('mongoose');
const Url = require('../models/urls');

module.exports = function upsertUrl(urlObj) {

    //Change the db Url accordingly
    const DB_URL = 'mongodb://localhost/Medium';

    if (mongoose.connection.readyState == 0) {
        mongoose.connect(DB_URL , {useNewUrlParser: true}); // the second param is optional, but it will be required in upcoming versions
    }

    let filter = {href: urlObj.href}; // Object according to which search the collections



//------------------------------------------------------------------------------------------------------------------------------------------
    let update = {$inc:{total: 1}}; // , $push:{parameters:{$each:urlObj.parameters}}};       <= to add the parameters to the database.
//--------------------Problem: INSERTING the parameters in the array corresponding to the document. ----------------------------------------


    let options = {upsert: true, new:true, returnNewDocument: true};

    Url.findOneAndUpdate(filter, update, options,(err,result)=>{
        if(err){
            console.log("Error occurred at upsert");
        }
    });
};