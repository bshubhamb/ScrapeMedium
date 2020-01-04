module.exports = function checkUrl(uri ,startUrl) {
    try{
        if(uri.startsWith("//")){
            return uri;
        }
        else if (uri.startsWith("/")){
            return startUrl + uri;
        }
        else{
            return uri;
        }
    }catch (err){
        console.log("Error at checkUrl");
    }


};
