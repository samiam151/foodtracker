import axios from "axios";
const RssFeedService = {};

RssFeedService.getFromURL = (url) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/rss", {
            url: url
        })
        .then(data => resolve(data))
        .catch(err => {
            console.log(err);
            reject([])
        })
    });
}
export default RssFeedService;