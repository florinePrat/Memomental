import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";


class card extends Component{


    constructor(props) {
        super(props);
        this.state = {
            isDeployed: false,
        };

    }

    render(){
        return(

                this.state.isDeployed
                ?   <div className="boxcarte">
                        <p>Nom : {this.props.name} </p>
                        <p>Cat : {this.props.labels[0]}</p>
                        <p>Question : {this.props.rectoQuestion} </p>
                        <Button
                            onClick={()=>{
                                this.setState({isDeployed:false})
                                this.props.fn(this.props.name)
                            }}
                            bssize="large"
                        >
                            retour
                        </Button>

                    </div>

                    : <div className="boxcarte">
                        <p>Nom : {this.props.name} </p>
                        <p>Cat : {this.props.labels[0]}</p>

                        <Button
                            onClick={()=>{
                                this.setState({isDeployed:true})
                            }}
                            bssize="large"
                        >
                            Voir
                        </Button>

                        <Button
                            onClick={""}
                            bssize="large"
                            type="submit"
                        >
                            Modifier
                        </Button>

                        <Button
                            onClick={""}
                            bssize="large"
                            type="submit"
                        >
                            Supprimer
                        </Button>

                    </div>



        )
    }
}
export default card;