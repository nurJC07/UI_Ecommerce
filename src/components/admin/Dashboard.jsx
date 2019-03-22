import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../supports/api-url/apiurl';

class Dashboard extends Component {

    state = { listUsers: [], 
        listProducts: [], 
        listCategory:[],
        totalTrx: [],
        totalSales: [] }

    componentDidMount() {
        this.totalUsers();
        this.totalProducts();
        this.totalCategory();
        this.totalSales();
        this.totalTrx();
    }

    totalUsers = () => {
        axios.get(API_URL + '/auth/getuserList')
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listUsers: res.data
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    totalProducts = () => {
        axios.get(API_URL + '/product/getproduct')
            .then((res) => {
                console.log(res);
                this.setState({ listProducts: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    totalTrx = () => {
        axios.get(API_URL + '/transaction/getlisttransaction')
            .then((res) => {
                console.log(res);
                this.setState({ totalTrx: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    totalCategory = () => {
        axios.get(API_URL + '/category/getlistcategory')
        .then((res) => {
            console.log(res)
            this.setState({ listCategory: res.data})
        })
    }

    totalSales = () => {
        axios.get(API_URL+ '/transaction/totaltrxsales')
            .then((res) => {
                var price = 0;
                res.data.forEach(item => {
                    price += item.totalPrice;
                });
                this.setState({ 
                    totalSales: price
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        if(this.props.username !== "" && this.props.role==="Admin"){ 

          return (
                <div className="card bg-light" style={{ padding: "20px", fontSize: "13px" }}>
                    <div className="row">
                        <div className="col-lg-2" style={{ marginBottom: "20px" }}>
                            <div className="list-group">
                                <a href="/admin/dashboard" className="list-group-item active">
                                Dashboard
                                </a>
                                <a href="/admin/manageproducts" className="list-group-item">Manage Products</a>
                                <a href="/admin/manageusers" className="list-group-item">Manage Users</a>
                                <a href="/admin/managecategory" className="list-group-item">Manage Category</a>
                                <a href="/admin/verifyorder" className="list-group-item">Verify Order</a>
                                <a href="/admin/managehistory" className="list-group-item">Manage History</a>
                            </div>
                        </div>
                        <div className="card bg-light" style={{ padding: "20px" }}>
                        <h2>Admin Dashboard</h2>
                        <hr/>
                        <div class="row shadow p-3 mb-5 bg-red rounded">
                        <div className="table-responsive col-lg-12">
                            <table class="table">
                                <thead class="thead-dark">
                                <tr>
                                    <th>Total Users:</th>
                                    <th>Total Products:</th>
                                    <th>Total Category</th>
                                    <th>Total Transactions:</th>
                                    <th>Total Sales:</th>
                                </tr>
                                </thead>
                                <tbody>     
                                <tr class="table-warning">
                                    <td align="center"><h1>{this.state.listUsers.length}</h1></td>
                                    <td align="center"><h1>{this.state.listProducts.length}</h1></td>
                                    <td align="center"><h1>{this.state.listCategory.length}</h1></td>
                                    <td align="center"><h1>{this.state.totalTrx.length}</h1></td>
                                    <td align="center"><h1>Rp. {this.state.totalSales}</h1></td>
                                </tr>
                                
                                </tbody>
                            </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
          )
        }
          return <Redirect to ='/login'/>
              }
          }
       


const mapStateToProps = (state) => {
  return { username: state.auth.username, 
    role: state.auth.role }
}

export default connect(mapStateToProps)(Dashboard);