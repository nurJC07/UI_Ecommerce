import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Alert } from 'reactstrap';
import { onUserLogin } from '../actions';
import { API_URL } from '../supports/api-url/apiurl';

const cookies = new Cookies();

class Login extends Component {
    
    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('usernameCookie', newProps.username, {path: '/'})
        
        }
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        
        this.props.onUserLogin({username, password});
        console.log(username, password)     
      }
    

    renderError = () => {
        if(this.props.error.length > 0){
            return <Alert color="danger">{this.props.error}</Alert>
        }
    }

    renderButton = () => {
        if(this.props.loading){
            return <center><div className="loader"></div></center>
        }
        return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
    }

    renderOnKeyPress = (event) => {
        if (event.key === 'Enter'){
            // alert('Enter has been pressed')
            this.onBtnLoginClick()
        }
    }

    render(){
        if(this.props.username === ""){ 
            return(
            <div className="container myBody" style={{minHeight:"600px"}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                    
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                        <fieldset>
                            <legend><img src="./images/flat/007-advertising.png" width="60px"/><p>Nice To See You Again!</p></legend>
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12">
                                    {this.renderButton()}
                                </div>
                                    
                            </div>
                            {this.renderError()}
                            <div className="btn my-auto"><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
            );
        }
        return <Redirect to="/" />
    }
}
const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        error: state.auth.error, 
        loading: state.auth.loading ,
        password: state.auth.password,
        status:state.auth.status
    };
}

export default connect(mapStateToProps, {onUserLogin})(Login);