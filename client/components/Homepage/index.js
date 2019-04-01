import React from "react";
import { Layout } from "../Layout/Layout";

import { BackroundImage } from "../Utilites/BackgroundImage";
import { RssReader } from "../Utilites/RSSReader";

export const Homepage = (props) => (
    <div className="homepage">

        <BackroundImage src="/client/images/food-table.jpg" cssClass="homepage-top">
            <Layout>
                <p>Homepage!</p>
            </Layout>
        </BackroundImage>

        <Layout>
            <RssReader url="https://foodlovetog.com/feed/rss" feedName="homepageBlog" />
        </Layout>

    </div>
);