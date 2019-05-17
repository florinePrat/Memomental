import {Component} from "react";
import React from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import cardDay from "../../utils/cards";


// this class send a answer to back for verify the answer and done the card of the day
class dayCard extends Component{


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isDeployed: false,
            rep:"",
        };
        this.handleChange.bind(this);
        this.send.bind(this);

    }

    send = event => {
        if(this.state.rep.length === 0){
            return;
        }
        else
        {
            console.log(this.props._id);
            let result;
            cardDay.dayCard({answer : this.state.rep, _id : this.props._id}).then( res => {
                console.log(res.data)
                if(res.data.validAnswer)
                {
                    console.log('bonne réponse');
                    window.location = "/myCard"
                }

                else {
                    this.setState({isDeployed : true, rep : res.data.wantedAnswer});
                    result =  res.data.wantedAnswer;
                }


            },function(error){
                console.log(error);
                return;
            })
            this.setState({isDeployed : true,rep : result});
        }

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
                    <h3 style={{backgroundColor:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
                    <p>Question : {this.props.question} </p>
                    <h2>Reponse : {this.state.rep} </h2>
                    <Button
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
                    <p>Question : {this.props.question} </p>

                    <FormGroup controlId="rep" bssize="large">
                        <FormControl type="text" value={this.state.rep} onChange={this.handleChange}/>
                    </FormGroup>

                    <Button
                        className="btn-info"
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
