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
                        <h2>Question : {this.props.rectoQuestion} </h2>
                        <h2>Reponse : {this.props.rectoAnswer} </h2>
                        <Button
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
                        <h3>Cat : {this.props.labels[0].name}</h3>
                        <p>Nom : {this.props.name} </p>


                        <Button
                            onClick={()=>{
                                this.setState({isDeployed:true})
                            }}
                            bssize="large"
                        >
                            Voir
                        </Button>

                        {/*<Button
                            onClick={}
                            bssize="large"
                            type="submit"
                        >
                            Modifier
                        </Button>

                        <Button
                            onClick={}
                            bssize="large"
                            type="submit"
                        >
                            Supprimer
                        </Button>*/}

                    </div>



        )
    }
}
export default mycard;