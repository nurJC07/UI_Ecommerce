import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import {API_URL} from '../../supports/api-url/apiurl';

class Verify extends Component {
    state = { listToVerify: [] }

    componentWillMount() {
        this.getListOrder();
    }

    getListOrder = () => {
        //const { username } = this.props.user;
        axios.post(API_URL+`/transaction/verify`
        ).then((res) => {
            this.setState({ listToVerify: res.data, selectedRow: 0 });
            console.log(this.state.listToVerify)
        }).catch((err) => {
            console.log(err);
        })
    }
    onBtnVerified = (item) => {
        if(window.confirm('Are you sure to approve this transaction?')){
            axios.post(API_URL+ `/transaction/approvepayment`, {
                trxId: item.trxId
            }).then((res) => {
                console.log(res.data)
                alert(`ID Trx: ${item.trxId} \nRp.${item.totalPrice} \nHas been Approved!`)
                this.getListOrder()
            }).catch((err) => {
                console.log(err);
            })
        }        
    }

    renderListJSX = () => {
       
        var listJSX = this.state.listToVerify.map((item) => {
            return (
                <tr key={item.trxId} className="text-wrap" style={{fontSize:'12px'}}>                        
                    <td className="align-middle">{item.trxId}</td>
                    <td className="align-middle">{item.username}</td>
                    <td className="align-middle text-danger">Rp. {item.totalPrice.toLocaleString()}</td>
                    <td className="align-middle">{item.trxDate}</td>
                    <td className="align-middle">{item.trxPay}</td>
                    <td><img src={`${API_URL}${item.image}`} width="60px" alt={item.nama}/> </td>
                    <td className="align-middle">{item.status}</td>
                    <td className="align-middle">
                        <button type="button" className="btn btn-success" onClick={() => this.onBtnVerified(item)}   ><i class="fas fa-check"></i></button>
                        
                    </td>
                </tr>
            )            
        }
        )

        return listJSX;
    }
    

    render() {
        if(this.props.username !== "" ){
            return(
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
            <h4>Manage Order</h4>
            <hr/>  

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Trx</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Total Bayar</th>
                                        <th scope="col">Waktu Transaksi</th>
                                        <th scope="col">Waktu Konfirmasi</th>
                                        <th scope="col">Bukti</th>
                                        <th scope="col">Status</th>
                                        <th colSpan="2">Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListJSX()}
                                </tbody>
                            </table>

                            <div>
                              
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
            
            
    
    export default connect(mapStateToProps)(Verify)
    


// class Verify extends Component {
//     render() {
//         return (
//             <div>
//                 INi Admin Verify
//             </div>
//         )
//     }
// }

// export default Verify