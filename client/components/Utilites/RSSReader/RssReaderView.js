import React from "react";
import { Carousel, Icon } from "antd";

export const RssReaderView = ({items, cssClasses = null, ...props}) => {

    const css = ["rssReader", cssClasses].join(" ");
    const cssItem = ["rssreader__item", props.cssItemClasses].join(" ");
    const numItemsToShow = 3;

    let _items = Object.assign([], items);
    let itemDivs = chunkArray(_items, numItemsToShow).map(itemGroup => {
        return itemGroup.map(item => {
            return (
                <div className={cssItem} key={item.guid}>
                    <h4 className="rssFeed__title">
                        <a target="_blank" href={item.link}>{item.title}</a>
                    </h4>
                    <p dangerouslySetInnerHTML={{__html: item.content}} />
                </div>
            );
        })
    })

    return (
        <div className={css}>
            <Carousel autoplay speed={3000} dots={true} 
                arrows={true} 
                autoplaySpeed={3000}
                nextArrow={<Icon type="left-arrow" />}
                prevArrow={<Icon type="right-arrow" />}
            >
                {
                    itemDivs.map(group => (
                        <div className="carousel__group">
                            {
                                group.map(item => item)
                            }
                        </div>
                    ))
                }
            </Carousel>
        </div>
    );
}

function chunkArray(arr, chunk_size){
    var results = [];
    while (arr.length) {
        results.push(arr.splice(0, chunk_size));
    }
    
    return results;
}