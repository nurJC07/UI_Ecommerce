import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {API_URL} from '../supports/api-url/apiurl';
import queryString from 'query-string';

class History extends Component {
    state = { transactionList: [], 
        transactionDetailList: [], 
        transactiondetail:[], 
        trxId:0 }

    componentDidMount() {
        console.log(this.props.username)
        axios.get(API_URL + `/transaction/gettransaction/${this.props.username}`)
        .then((res) => {
            this.setState({ transactionList: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnDetailClick = (id) => {
        
        axios.get(API_URL + '/transaction/historydetail/', 
            {
              trxId: id 
                
            })
   
        .then((res) => {
            this.setState({ transactionDetailList: res.data })
        }).catch(err => {
            console.log(err)
        })
    }   

    renderBodyTransaction = () => {
        var listJSXTransaksi = this.state.transactionList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.trxId}</td>
                    <td>{item.username}</td>
                    <td>{item.trxDate}</td>
                    <td>Rp. {item.totalPrice}</td>
                    <td>{item.totalQty}</td>
                    <td>{item.status}</td>
                    <td> <button type="submit" class="btn btn-primary" style={{ fontSize: "12px" }}
                    onClick={() => this.onBtnDetailClick(item.id)}>Detail</button></td>

                </tr> )
            
        })
        return listJSXTransaksi;
    }

    renderBodyDetailTransaction = () => {
        var listJSXTransaksi = this.state.transactionDetailList.map((item) => {
            return (
                <tr key={item.trxId}>
                    <td>{item.trxiId}</td>
                    <td>{item.productId}</td>
                    <td>{item.nama}</td>
                    <td>Rp. {item.harga}</td>
                    <td>{item.image}</td>
                    <td>{item.qty}</td>
             
                </tr> )
            
        })
        return listJSXTransaksi;
    }

    render() {
        if(this.props.username !== "" && this.props.role!=="Admin"){ 
            return (
                <center>
                <div className="justify-content-center" style={{ fontSize: "13px", paddingLeft: "20px", paddingRight: "20px", }}>
                    <div className="col-lg-12" style={{ paddingTop: "20px" }}>
                        <h2 className="text-center section-heading font-weight-bold text-uppercase">History Transaction</h2>
                    </div>
                    <br />
                    <div className="table-responsive card shadow p-3 mb-5 bg-white rounded">
                        <table align="center" className="table table-bordered col-lg-12 justify-content-center text-center">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" style={{fontSize: '16px', }}><center>trxId</center></th>
                                    <th scope="col" style={{fontSize: '16px', }}><center>Buyer</center></th>
                                    <th scope="col" style={{fontSize: '16px', }}><center>Transaction Date</center></th>
                                    <th scope="col"  style={{fontSize: '16px', }}><center>Total Price</center></th>
                                    <th scope="col" style={{ fontSize: '16px', }}><center>Total Qty</center></th>
                                    <th scope="col" style={{ fontSize: '16px', }}><center>Status</center></th>
                                    <th scope="col"  style={{fontSize: '16px', }} colSpan="2"><center></center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyTransaction()}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive card shadow p-3 mb-5 bg-white rounded">
                        <table align="center" className="table table-bordered col-lg-8 justify-content-center">
                            <thead className="thead-blue">
                                <tr className="table table-bordered table-dark text-center text-dark">
                                    <th scope="col"  style={{fontSize: '16px', }}>Id</th>
                                    <th scope="col"  style={{fontSize: '16px', }}>ProductId</th>
                                    <th scope="col"  style={{fontSize: '16px', }}>Nama Product</th>
                                    <th scope="col"  style={{fontSize: '16px', }}>Harga</th>
                                    <th scope="col"  style={{fontSize: '16px', }}>Image</th>
                                    <th scope="col"  style={{fontSize: '16px', }}>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyDetailTransaction()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4" style={{paddingRight: "500px", paddingLeft: "500px"}}>
                    </div>
                </div>
                </center>
              );
            }
            return <Redirect to ='/login'/>
                }
            }

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps)(History);