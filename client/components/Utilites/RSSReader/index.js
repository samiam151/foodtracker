import React, { Fragment, useState, useEffect } from "react";
import RssFeedService from "../../../services/RssFeedService";
import { Loader } from "../Loader";
import { connect } from "react-redux";
import { setRssContent } from "../actions/rssFeed";
import { RssReaderView } from "./RssReaderView";

const RssReaderFunction = ({url, rss, feedName, ...props}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        console.log(rss);
        RssFeedService.getFromURL(url)
        .then(res => {
            console.log(res.data);
            props.setRssContent({
                name: feedName,
                data: res.data
            });
        })
        .catch(err => {
            console.log(err);
            setHasError(true);
        });
    }, []);


    let content = <Loader />;
    if (hasError) {
        content = <div>No feed data...</div>;
    }
    if (rss[feedName] !== undefined && rss[feedName].length) {
        content = <RssReaderView items={rss[feedName]} cssItemClasses="pill" />
    }

    return content;
};

export const RssReader = connect((store) => ({
    rss: store.rss
}), { setRssContent })(RssReaderFunction);