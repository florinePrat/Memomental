import {Component} from "react";
import React from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import cardDay from "../../utils/cards";


// this class send a answer to back for verify the answer and done the card of the day
class dayCard extends Component{


    constructor(props) {
        super(props);
        this.state = {
            display:true,
            rep:"",
            wantedAnswer:"",
            validAnswer:false,
            message:""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
        this.next.bind(this);
    }

    send = event => {
        if(this.state.rep.length === 0){
            this.setState({error:"champ réponse vide"});
        }
        else{
            console.log(this.props._id);
            let result;
            cardDay.dayCard({answer : this.state.rep, _id : this.props._id}).then( res => {
                console.log(res.data);
                if(res.data.validAnswer) {
                    localStorage.setItem('points',res.data.points);
                    this.setState({validAnswer:res.data.validAnswer,message:res.data.message})
                }else {
                    this.setState({error:"mauvaise reponse", wantedAnswer : res.data.wantedAnswer});
                    result =  res.data.wantedAnswer;
                }


            },error => {
                console.log(error);
                this.setState({error:error.response.error});
            });
        }

    };

    next = event =>{
        this.setState({display:false})
    };

    handleChange = event2 => {
        this.setState({
            [event2.target.id]: event2.target.value
        });
    };

    render(){

        return(
            this.state.display?
            <div className="boxcarte">
                <h3  style={{backgroundColor:this.props.labels[0].color}}>{this.props.labels[0].name}</h3>
                <p>Question : {this.props.question} </p>
                {this.state.wantedAnswer || this.state.validAnswer ?
                    <div>
                        {this.state.error ?
                        <div>
                            <div style={{color: "red"}}>
                                {this.state.error}
                            </div>
                            {this.state.wantedAnswer ?
                            <div style={{color: "blue"}}>
                                La réponse attendue était : {this.state.wantedAnswer}
                            </div>:false}
                        </div>:false}
                        {this.state.validAnswer ?
                            <div style={{color: "green"}}>
                                Bonne réponse ! : {this.state.message}
                            </div>:false}
                        <Button
                            className="btn-info"
                            onClick={this.next}
                            bssize="large"
                            type="submit"
                        >
                            Carte suivante
                        </Button>
                    </div>
                    :
                    <div>
                        <FormGroup  controlId="rep" bssize="large">
                            <FormControl autoComplete="off" type="text" value={this.state.rep} onChange={this.handleChange}/>
                        </FormGroup>

                        <Button
                            className="btn-info"
                            onClick={this.send}
                            bssize="large"
                            type="submit"
                        >
                            Envoyer
                        </Button>
                    </div>
                }
            </div>:false
        )
    }
}
export default dayCard;
