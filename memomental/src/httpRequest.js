import * as React from "react";

class MyComponent extends React.Component {
    constructor(props) {
        console.log(props.location.state);
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            fromLogin: props.location.state
        };
    }
    componentDidMount() {
        console.log('login =',this.state.fromLogin);
        fetch("http://localhost:8080", {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/json', // <-- Specifying the Content-Type
            }),
            body : JSON.stringify(
                {
                wstoken: 'any_token',
                wsfunction: 'any_function',
                moodlewsrestformat: 'json',
                user: this.state.fromLogin.email,
                passwd: this.state.fromLogin.passwd})
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <p> Gagné </p>,
                <p>{this.state.fromLogin.email}</p>

            )
        }
    }
}
export default MyComponent;