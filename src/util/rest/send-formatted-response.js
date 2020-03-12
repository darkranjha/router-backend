const {formatResponse} = require('./format-response');

function sendResponse(res, routerResponse) {
    let {headers, data, status} = routerResponse;

    if (Array.isArray(data)) {
        data = data.filter(Boolean);
    }
    return res.set(headers)
        .status(status)
        .json(formatResponse(status, data));
}

module.exports = {
    sendFormattedResponse: (res, routerResponse) => {
        if (!routerResponse) {
            throw new Error();
        }
        if (routerResponse instanceof Error) {
            if (routerResponse.response) {
                return sendResponse(res, routerResponse.response);
            }
            const errorMessage = JSON.stringify({
                code: routerResponse.code,
                message: routerResponse.message,
                stack: routerResponse.stack
            }, null, 2);
            //('=============================================================');
            //(errorMessage);
            //('=============================================================');
            return res.status(500).send(errorMessage);
        } else {
            return sendResponse(res, routerResponse);
        }
    }
};