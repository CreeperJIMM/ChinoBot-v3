const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.geturl = async function(url) {
    let getdet = await fetch(url,
        {method:"GET"
    });
    return getdet.url;
}