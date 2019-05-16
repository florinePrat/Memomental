import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";

// this class return the front of managcards and use js to view details of cards
class mycard extends Component{


    constructor(props) {
        super(props);
        this.state = {
            isDeployed: false,
        };

    }

    render(){
        return(

                this.state.isDeployed
                ?   <div className="boxcarte" >
                        <h3 style={{color:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
                        <p>Question recto : {this.props.rectoQuestion} </p>
                        <p>Reponse recto : {this.props.rectoAnswer} </p>
                        <p>Question verso : {this.props.versoQuestion} </p>
                        <p>Reponse verso : {this.props.versoAnswer} </p>
                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:false});
                            }}
                            bssize="large"
                        >
                            modifier
                        </Button>
                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:false});
                            }}
                            bssize="large"
                        >
                            supprimer
                        </Button>
                        <Button
                            className="btn-info"
                            onClick={()=>{
                                this.setState({isDeployed:false});
                                this.props.fn(this.props.name)
                            }}
                            bssize="large"
                        >
                            retour
                        </Button>

                    </div>

                    : <div className="boxcarte">
                        <h3  style={{color:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
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
export default mycard;