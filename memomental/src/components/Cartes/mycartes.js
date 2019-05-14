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
        /*   axios.get('http://localhost:8080/api/card/getCardsByUser',{
               headers: tokenHeaders
           } )
               .then(res => {
                   const cards = res.data;

                   this.setState({ cards });
               })*/

        const cards = [
            {
                name : "name",
                labels : ["cat"],
                rectoQuestion: "question d'une recto"
            },
            {
                name : "name2",
                labels : ["cat2"]
            }
            ,
            {
                name : "name2",
                labels : ["cat2"]
            }];
        this.setState({cards});
    }

    /*
    send = event => {
    if(this.state.rep.length === 0){
        return;
    }
    cardDay.dayCard(this.state.rep).then(function(data){
        window.location = "/Mycarte"
    },function(error){
        console.log(error);
        return;
    })
    };


    handleChange = event2 => {
        this.setState({
            [event2.target.id]: event2.target.value
        });
    };

     */


    render(){
        return(
            <div className="container-fluid">
                <h1> Mes cartes </h1>

                { this.state.cards.map(card =>
                    <MyDayCard
                        name={card.name}
                        labels={card.labels[0]}
                        rectoQuestion={card.rectoQuestion}
                    />
                )}

                {/*
                <div className="boxcarte">

                    <h3>{this.state.labels}</h3>
                    <h2>{this.state.rectoQuestion}</h2>

                    <FormGroup controlId="rep" bssize="large">
                        <FormControl autoFocus type="text" value={this.state.rep} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button
                        onClick={this.send}
                        block
                        bssize="large"
                        type="submit"
                    >
                        Envoyer
                    </Button>

                </div>

                 */}
            </div>
        )
    }

}
export default Mycarte;