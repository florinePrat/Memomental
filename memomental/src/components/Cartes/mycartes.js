import React from 'react';
import cardDay from "../../utils/cards";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import MyDayCard from './dayCard';
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

class Mycarte extends React.Component{

    state ={
        cards: []
    };

    constructor(props) {
        super(props);/*
        this.state = {
            rep : "",
            labels : "Cat Geographie",
            rectoQuestion: "question d'une recto"
        };
        /*this.handleChange.bind(this);
        this.send.bind(this);

         */
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/card/today',{
               headers: tokenHeaders
           } )
               .then(res => {
                   const cards = res.data;

                   this.setState({ cards });
               });
/*
        const cards = [
            {
                name : "name",
                labels : [{name :"cat", color : "red"}],
                rectoQuestion: "question d'une recto"
            },
            {
                name : "name2",
                labels : [{name :"cat", color : "red"}],
            }
            ,
            {
                name : "name2",
                labels : [{name :"cat", color : "red"}]
            }];*/
        this.setState({cards});
    }


    render(){
        return(
            <div className="container-fluid">
                <h1> Mes cartes </h1>

                { this.state.cards.map(card =>
                    <MyDayCard
                        name={card.name}
                        labels={card.labels}
                        rectoQuestion={card.rectoQuestion}
                    />
                )}

            </div>
        )
    }

}
export default Mycarte;