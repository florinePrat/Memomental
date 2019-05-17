import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
import AddCard from './addCards';

const burl = process.env.REACT_APP_API_URL;


// this class return the front of managcards and use js to view details of cards
class myCards  extends Component{


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isDeployed: false,
            edit : false,
        };
        this.delete.bind(this);
        this.edit.bind(this);
    }

    delete=event =>{
            axios.delete(burl + '/api/card/'+this.props._id, { headers: tokenHeaders})
                .then(res =>{
                    console.log(res.data);
                    window.location = "/gcard"
                })
    }
    edit = event => {

    }

    render(){
        console.log("données :",this.props)
        return(
            this.state.edit?
                    <AddCard
                        card = {this.props}
                    />:

                this.state.isDeployed
                ?   <div className="boxcarte" >
                        <h3 style={{backgroundColor:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
                        <p>Question recto : {this.props.rectoQuestion} </p>
                        <p>Reponse recto : {this.props.rectoAnswer} </p>
                        <p>Question verso : {this.props.versoQuestion} </p>
                        <p>Reponse verso : {this.props.versoAnswer} </p>

                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({edit : true});

                        }}
                        bssize="large"
                        >
                            modifier
                        </Button>
                        <Button
                            className="btn-info"
                            onClick={ this.delete }
                            bssize="large"
                        >
                            supprimer
                        </Button>
                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:false});
                            }}
                            bssize="large"
                        >
                            retour
                        </Button>

                    </div>

                    : <div className="boxcarte">
                        <h3  style={{backgroundColor:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
                        <p>Nom : {this.props.name} </p>


                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:true})
                            }}
                            bssize="large"
                        >
                            Voir
                        </Button>

                    </div>



        )
    }
}
export default myCards;
