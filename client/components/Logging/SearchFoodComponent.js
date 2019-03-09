import React, { Component } from "react";
import { render } from "react-dom";
import ClientFoodService from "../../services/ClientFoodService";
import ClientFoodUserService from "../../services/ClientFoodUserService";
import { connect } from "react-redux";
import { setContent, showModal, hideModal } from "../Utilites/actions";
import { setFoodSearchItem } from "./actions";
import { FoodSearchResult } from "./FoodSearchResult";
import { Input } from "antd";
import AddFoodComponent from "./AddFoodComponent";

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
        if (value.length <= 2) {
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
        console.log(result);
        this.props.setFoodSearchItem(result);
    }

    render() {
        return (
            <div className="addFood">
                
                <Input type="Input.Text" name="foodInput" className="addFood__serachInput" onChange={(e) => this.searchInputChange(e)}/>
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

export const SearchFoodComponent = connect(null, { showModal, setContent, setFoodSearchItem })(_SearchFoodComponent);