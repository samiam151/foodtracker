import React, { Fragment, useState, useEffect } from "react";
import RssFeedService from "../../../services/RssFeedService";
import { Loader } from "../Loader";
import { connect } from "react-redux";
import { setRssContent } from "../actions/rssFeed";
import { RssReaderView } from "./RssReaderView";

const RssReaderFunction = ({url, rss, feedName, ...props}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (rss[feedName]) {
            setHasError(false);
        } else {
            RssFeedService.getFromURL(url)
            .then(res => {
                props.setRssContent({
                    name: feedName,
                    data: res.data
                });
            })
            .catch(err => {
                console.log(err);
                setHasError(true);
            });
        }
    }, []);


    let content = <Loader />;
    if (hasError) {
        content = <div>No feed data...</div>;
    }
    if (rss[feedName] !== undefined && rss[feedName].length) {
        content = <RssReaderView items={rss[feedName]} cssItemClasses="pill" itemCount={props.count} />
    }

    return (
        <div className="rssFeed__container">
            {content}
        </div>
    );
};

export const RssReader = connect((store) => ({
    rss: store.rss
}), { setRssContent })(RssReaderFunction);