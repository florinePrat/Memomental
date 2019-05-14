import {Component} from "react";
import React from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import cardDay from "../../utils/cards";



class dayCard extends Component{


    constructor(props) {
        super(props);
        this.state = {
            isDeployed: false,
        };
        this.handleChange.bind(this);
        this.send.bind(this);

    }

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

    render(){
        return(

            this.state.isDeployed
                ?   <div className="boxcarte">
                    <h3>Cat : {this.props.labels[0]}</h3>
                    <h2>Question : {this.props.rectoQuestion} </h2>
                    <h2>Reponse : {this.props.rectoAnswer} </h2>
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
                    <h3>Cat : {this.props.labels[0]}</h3>
                    <h2>Question : {this.props.rectoQuestion} </h2>

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



        )
    }
}
export default dayCard;