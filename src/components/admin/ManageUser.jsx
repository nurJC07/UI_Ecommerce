import React, { Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {API_URL} from '../../supports/api-url/apiurl'

class ManageUser extends Component {
    state= { 
        usersList: [],
    }

    componentDidMount() {
        axios.get(API_URL + '/auth/getuserlist')
        .then((res) => {
        console.log(res.data)
        this.setState({ usersList: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }
     
    renderUserList = () => {
        var listJSX = this.state.usersList.map((item) => {
            return (
                <tr>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td>{item.lastlogin}</td>
            </tr> 
            )   
        })
            return listJSX   
        }

    render() {
        if(this.props.username !== "" ){
        return ( 
            <div className="card bg-light" style={{ padding: "20px", fontSize: "13px" }}>
            {/* <style>{"tr{border-top: hidden;}"}</style> */}
            <div className="row">
            <div className="col-lg-2" style={{ marginBottom: "20px" }}>
                            <div className="list-group">
                                <a href="/admin/dashboard" className="list-group-item active">
                                Dashboard
                                </a>
                                <a href="/admin/manageproducts" className="list-group-item">Manage Products</a>
                                <a href="/admin/manageusers" className="list-group-item">Manage Users</a>
                                <a href="/admin/managetrx" className="list-group-item">Manage Transactions</a>
                                <a href="/admin/managecategory" className="list-group-item">Manage Category</a>
                                <a href="/admin/verifyorder" className="list-group-item">Verify Order</a>
                            </div>
                        </div>
            <div className="card bg-light col-6" style={{ padding: "20px" }}>
            <h4>Manage User</h4>
            <hr/>        
            <div className="table-responsive card shadow p-3 mb-5 bg-white rounded">
            <table class="table">
            <thead className="thead-dark">
          
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>  
                <th>LastLogin</th>
                </tr>
                </thead>
            <tbody>  
            {this.renderUserList()}
            </tbody>
        </table>                
            </div>
            </div>
            </div>
            </div>
            
          
            );
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
        
        

export default connect(mapStateToProps)(ManageUser)
