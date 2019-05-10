import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Connexion extends Component{
   constructor(props) {
        super(props);
        this.passwd='';
    }
    /*
    submitLogin : function () {
        return{
            console.log(this.passwd)
        }

    };*/
    setPasswd(event){
        this.passwd = event.target.value;
    }



    render(){
        return(
            <div className="container-fluid">
                <h1> Connexion </h1>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.setPasswd} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={console.log(this.passwd)}>
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }
}
export default Connexion;