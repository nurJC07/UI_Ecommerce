import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Carousel from './Carousel'
import Jumbotron from './Jumbotron'
import CategoryList from './admin/CategoryList'



class HomepageUser extends Component {

    render() {
        if(this.props.username !== "" && this.props.role!=="Admin"){ 
    return(
        <div>

            <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <Carousel />
                    </div>
                </div>
            </div>
            <br/>
            <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center">
                <h1>Sensasi Belanja Cuma Di sini</h1></div>
            </div>
            <br/>
            <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center"><Jumbotron /></div>
            </div>
            <br/>
            <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center"><CategoryList /></div>
            </div>
            <br/>

            
            </div>
           
           )
        }
        return <Redirect to ='/login'/>
            }
        }
 
        const mapStateToProps = (state) => {
            return { 
                username: state.auth.username,
                role: state.auth.role
            };
        }
        
        export default connect(mapStateToProps)(HomepageUser);
