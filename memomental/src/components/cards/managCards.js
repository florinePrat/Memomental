import React from 'react';
import Mycard from './card';
import {Button} from "react-bootstrap";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

const burl = process.env.REACT_APP_API_URL;
// this class display all of the labels for 1 user and propose to manage them
class gcard extends React.Component{



    constructor(props) {
        super(props);
        this.state = {
            labels: []
        }
    }

    componentDidMount() {

       axios.get(burl + '/api/user/getLabelsByUser',{
            headers: tokenHeaders
        } )
            .then(res => {
                const labels = res.data;
                console.log(labels[0]);
                this.setState({ labels });

            }, function(data){
                console.log(data);
            })
    }

    render(){
        return(
            <div className="container-fluid">
                <h1> Gestion des cartes </h1>

                <nav>
                    <ul>
                        <Button
                            className="btn-info"
                            href="/addCard">Ajouter une carte
                        </Button>
                    </ul>
                </nav>


                    { this.state.labels.map(label   =>
                        <Mycard
                            _id={label.label._id}
                            name={label.label.name}
                            color={label.label.color}
                            number={label.number}
                        />
                        )}
            </div>
        )
    }
}
export default gcard;
