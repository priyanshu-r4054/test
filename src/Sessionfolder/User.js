import React, { Component  } from "react";
import axios from "axios";
import UserModal from "./UserModal";
class User extends Component{
    state={
        user: []
    }
    componentDidMount(){
        axios.get("http://127.0.0.1:8000/sessionDetails/"+this.props.pk).then(res => this.setState({ user: res.data }));
    };
    render(){
        return (
            
                <UserModal
                   user={this.state.user}
                />  


        )
    }

}

export default User;