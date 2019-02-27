import React, { Component } from "react";
import { render } from "react-dom";
import ClientFoodService from "../../services/ClientFoodService";
import ClientFoodUserService from "../../services/ClientFoodUserService";
import { connect } from "react-redux";
import { setContent, showModal, hideModal } from "../Utilites/actions";

import { AddFoodComponent } from "./AddFoodComponent";

class _SearchFoodComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchResults: []
        };

        this.resultClick = this.resultClick.bind(this);
    }

    searchInputChange(e) {
        let value = e.target.value;
        if (value.length <= 3) {
            return;
        }

        ClientFoodService.searchFood(value)
        .then(results => {
            // console.log(results);
            this.setState({
                searchResults: results
            });
        });
    }

    resultClick(result) {
        
        this.props.setContent(AddFoodComponent);
        this.props.showModal();
    }

    render() {
        return (
            <div className="addFood">
                <input type="text" name="foodInput" className="addFood__serachInput" onChange={(e) => this.searchInputChange(e)}/>
                <ul className="addFood__searchResults">
                    {
                        this.state.searchResults.map((food, index) => (
                            <FoodSearchResult key={index} {...food} onClickCB={this.resultClick} />
                        ))
                    }
                </ul>
            </div>
        );
    }
}


// export const SearchFoodComponent = connect(null, (dispatch) => {
//     return {
//         showModal: showModal,
//         setContent: setContent
//     }
// })(_SearchFoodComponent);
export const SearchFoodComponent = connect(null, { showModal, setContent })(_SearchFoodComponent);

const FoodSearchResult = (props) => (
    <li className="addFood__searchResult" onClick={(r) => props.onClickCB(props)}>
        <span className="searchResult--label">
            {props.label}
        </span>
        <span className="searchResult--calories">
            {props.calories} Kcal
        </span>
    </li>
);