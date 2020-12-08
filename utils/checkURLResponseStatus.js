const fetch = require('node-fetch');

const checkURLResponseStatus = async (url) => {
    let result;

    try{
        result = await fetch(url, { timeout: 2000 });
        console.log(result);
    }catch(e){
        const error = e.message;

        let message = '';

        if (error.includes('ENOTFOUND'))
            message = "Site doesn't exist";
        else if (error.includes('timeout'))
            message = "Request timeout";
        else if (error.includes('certificate has expired'))
            message = "SSL Certificate has expired";

        return {
            error: `Request to ${url} failed. ${message}`
        };
    }

    let statusCode = result.status;

    return { statusCode };
}

module.exports = checkURLResponseStatus;