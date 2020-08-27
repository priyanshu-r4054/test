import React, { Component} from 'react';
import axios from 'axios';
import Body from './body';
import Header1 from './Header1';
import Register from './register';
class App extends Component {

  state = {
    session: [],
    credentials: {username: '', password: ''},
    user: '',
    token: "",
    check: false
  };
  login = () => {
    axios.post('http://127.0.0.1:8000/api-auth/', 
    this.state.credentials
    )
    .then(
      data => {
       // this.props.userLogin(data.token);
        let index = -1;
        index = this.state.session.findIndex(
            element => element.username === this.state.credentials.username && element.is_staff === true
        );
        if(index >=0){
            this.setState({check:true})
        }     
        this.setState({user:this.state.credentials.username})   
        this.setState({token:data.token})

        //console.log(data);
      }
    )
    .catch( error => console.error(error))
  }
  logout = () => {
    this.setState({token:""})
    this.setState({check:false})
  }
  


  componentDidMount() {
    this.resetState();
  }

  getSession = () => {
    axios.get('http://127.0.0.1:8000/user/'
    ).then(res => this.setState({session:res.data}));
   // console.log(this.state.session)
  };

  resetState = () => {
    this.getSession();
  };
  

  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
   
  }

  
  render() {
    
     

    console.log(this.state.check)

    return (
        
      <div>
        {this.state.token === "" ? (
    // <div>
    //    <h1>Student login form</h1>
    //     <label>
    //       Username:
    //       <input type="text" name="username"
    //        value={this.state.credentials.username}
    //        onChange={this.inputChanged}/>
    //     </label>
    //     <br/>
    //     <label>
    //       Password:
    //       <input type="password" name="password"
    //        value={this.state.credentials.password}
    //        onChange={this.inputChanged} />
    //     </label>
    //     <br/>
    //     <button onClick={this.login}>Login</button>
    //     <Register resetState={this.resetState}/>

    // </div>
    <div style={{boxSizing: "border-box",width: "500px",height: "500px", border: "4px solid #167bff", borderRadius:"20px",
           margin: "auto"

           
           }}> 
  
                <br></br>
                <h3 style={{textAlign:"center"}}>Teacher Sign in </h3>
                 <hr/>
                <div style={{width:"400px",padding:"20px"}}>
                    <label>User Name</label>
                    <input style={{width:"400px",padding:"20px"}} type="text" className="form-control" placeholder="Enter username" 
                    name="username"
                    value={this.state.credentials.username}
                    onChange={this.inputChanged}
                    />
                </div>

                <div style={{width:"400px",padding:"20px"}}>
                    <label>Password</label>
                    <input style={{width:"400px",padding:"20px"}} type="password" className="form-control" placeholder="Enter password" 
                       name="password"
                       value={this.state.credentials.password}
                       onChange={this.inputChanged}
                       
                    />
                </div>
                
                <button style={{width:"200px",padding:"10px",margin: "auto"}} type="submit" className="btn btn-primary btn-block" onClick={this.login} > Submit</button>
                
                <Register resetState={this.resetState}/>

            </div>
  ) : (
      <div>
          <button onClick={this.logout}>Logout</button> 
          <Header1/>
          <Body user={this.state.user} check={this.state.check}/>
      </div>
    

  )
}
      </div>
    );
    }
}

export default App;