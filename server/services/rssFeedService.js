const Parser = require("rss-parser");
const RssFeedService = {};

RssFeedService.getFromUrl = (url) => {
    if (!url) throw new Error("RssFeed: No URL Given...");
    let parser = new Parser();

    return parser.parseURL(url)
        .then(data => data.items)
        .catch(err => err);
}

module.exports = RssFeedService;