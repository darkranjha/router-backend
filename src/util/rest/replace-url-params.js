module.exports = {
    replaceUrlParams: (url, ...params) => {
        return params.reduce((rawUrl, param) => {
            return rawUrl.replace(/:\w+/i, param);
        }, url);
    }
};