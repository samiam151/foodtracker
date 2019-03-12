import React, { Component, useState } from "react";
import { render } from "react-dom";
import ClientFoodService from "../../services/ClientFoodService";
import ClientFoodUserService from "../../services/ClientFoodUserService";
import { connect } from "react-redux";
import { setContent, showModal, hideModal } from "../Utilites/actions";
import { setFoodSearchItem } from "./actions";
import { FoodSearchResult } from "./FoodSearchResult";
import { Input } from "antd";
import AddFoodComponent from "./AddFoodComponent";

const _SearchFoodComponent = (props) => {
    const [searchInput, updateSearchInput] = useState("");
    const [searchResults, updateSearchResults] = useState([]);
    
    const resultClick = result => {
        props.setFoodSearchItem(result);
    };

    const searchInputChange = debounce((value) => {
        if (value.length <= 2) {
            return;
        }
        updateSearchInput(value);
        ClientFoodService.searchFood(value)
            .then(results => updateSearchResults(results));
    }, 300);

    return (
        <div className="addFood">
            <Input type="Input.Text" 
                name="foodInput" 
                className="addFood__serachInput" 
                placeholder="Search by food name..."
                onChange={(e) => searchInputChange(e.target.value)}/>
            <ul className="addFood__searchResults">
                {
                    searchResults.map((food, index) => (
                        <FoodSearchResult key={index} {...food} onClickCB={resultClick} />
                    ))
                }
            </ul>
        </div>
    );

};


function debounce(func, wait, immediate = false) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const SearchFoodComponent = connect(null, { showModal, setContent, setFoodSearchItem })(_SearchFoodComponent);

// class _SearchFoodComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             searchInput: "",
//             searchResults: []
//         };

//         this.resultClick = this.resultClick.bind(this);
//     }

//     searchInputChange(e) {
//         let value = e.target.value;
//         if (value.length <= 2) {
//             return;
//         }

//         ClientFoodService.searchFood(value)
//         .then(results => {
//             this.setState({
//                 searchResults: results
//             });
//         });
//     }

//     resultClick(result) {
//         console.log(result);
//         this.props.setFoodSearchItem(result);
//     }

//     render() {
//         return (
//             <div className="addFood">
                
//                 <Input type="Input.Text" name="foodInput" className="addFood__serachInput" onChange={(e) => this.searchInputChange(e)}/>
//                 <ul className="addFood__searchResults">
//                     {
//                         this.state.searchResults.map((food, index) => (
//                             <FoodSearchResult key={index} {...food} onClickCB={this.resultClick} />
//                         ))
//                     }
//                 </ul>
//             </div>
//         );
//     }
// }
