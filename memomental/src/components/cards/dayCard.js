import {Component} from "react";
import React from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import cardDay from "../../utils/cards";


// this class send a answer to back for verify the answer and done the card of the day
class dayCard extends Component{


    constructor(props) {
        super(props);
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
        cardDay.dayCard(this.state.rep).then(function(res){
            if( res.data === true)
            window.location = "/myCard"
            else (this.setState({isDeployed: true,rep : res.data}))
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
        console.log(this.props.labels)
        return(

            this.state.isDeployed
                ?   <div className="boxcarte">
                    <h3  style={{color:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
                    <h2>Question : {this.props.rectoQuestion} </h2>
                    <h2>Reponse : {this.state.rep} </h2>
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
                    <h3  style={{backgroundColor:this.props.labels[0].color}}>Cat : {this.props.labels[0].name}</h3>
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