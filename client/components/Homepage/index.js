import React from "react";
import { Layout } from "../Layout/Layout";
import { Padding } from "../Utilites/Padding";
import { BackroundImage } from "../Utilites/BackgroundImage";
import { RssReader } from "../Utilites/RSSReader";
import { Col, Row } from "antd";

export const Homepage = (props) => (
    <div className="homepage">

        <BackroundImage src="/client/images/food-table.jpg" cssClass="homepage-top">
            <Layout>
                <Padding xAmount="2" unit="em">
                    <section className="homepage__hero">
                        <Row type="flex">
                            <Col xs={24} md={12}>
                                <h2>Calorie and weight tracking that works for you</h2>
                            </Col>.
                        </Row>
                    </section>
                </Padding>
            </Layout>
        </BackroundImage>

        <div className="bg--red font--white">
            <Layout>
                <Padding xAmount={6} unit="em">
                    <div className="center">
                        <h2 className="font--white">How It Works</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia eveniet a repudiandae hic quo architecto nobis magnam unde qui molestiae voluptate, nihil ipsum, obcaecati inventore? Nemo maiores molestias aut.</p>
                    </div>
                </Padding>
            </Layout>
        </div>

        
            <Layout>
                <Padding xAmount={6} unit="em">
                    <div className="center">
                        <h2>Nutrition Corner</h2>
                        <p>Featured blog for the week is from Candace Boyd Wylie, the Chief Foodie & Creative Director behind The FoodLoveTog, LLC.</p>

                        <div className="md-andUp">
                            <RssReader url="https://foodlovetog.com/feed/rss" feedName="homepageBlog" count={3} />
                        </div>
                        <div className="sm-andDown">
                            <RssReader url="https://foodlovetog.com/feed/rss" feedName="homepageBlog" count={1} />
                        </div>
                    </div>
                </Padding>
            </Layout>
        

    </div>
);