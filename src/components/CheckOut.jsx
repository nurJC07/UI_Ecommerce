import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from '../supports/api-url/apiurl';
import { Button } from 'reactstrap';


class CheckOut extends Component {

    state = {
        listCart : [], 
        selectedIdEdit: 0, 
        totalPrice: 0,
        totalQty: 0, 
       }

    componentDidMount() {
        this.getCartList();
    }

    getCartList = () => {
        axios.get(API_URL + '/cart/getlistcart', {
            params: {
                username: this.props.username
            }
        }).then((res) => {
            console.log(res.data)
            var price = 0;
            res.data.forEach(element => {
                price += (element.qty * element.harga);
  
            });
            this.setState({ 
                listCart: res.data, 
                selectedIdEdit: 0, 
                totalPrice: price })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnPayment = () => {
     
                // var currentdate = new Date();
                // var trxDate = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + ' | ' + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                var invoice = `${this.props.username}`;

                axios.post(API_URL + '/transaction/addTransaction', {
                    username: this.props.username,
                    trxDate : new Date(),
                    totalPrice: this.state.totalPrice,
                    totalQty: this.state.listCart.length,
                    status: "Not Payment",
                    invoice
                        
                }).then((res) => {
                    alert('sukses')
                    console.log(res.data.insertId)
                    for(let i = 0; i < this.state.listCart.length; i++) {
                        axios.post(API_URL + '/transaction/adddetailtransaction', {
                            trxId: res.data.insertId,
                            productId: this.state.listCart[i].productId,
                            nama: this.state.listCart[i].nama,
                            image: this.state.listCart[i].image,
                            qty: this.state.listCart[i].qty,
                        }).then((res) => {
                            console.log("berhasil ditambahkan ke detail trx");
                        }).catch((err) => {
                            console.log(err);
                        })
                        axios.delete(API_URL + `/cart/clearcart/${this.state.listCart[i].id}` )
                            .then((res) => {
                                console.log('cart berhasil didelete');
                                console.log(this.state.listCart[0].id)
                                this.getCartList();
                            }).catch((err) => {
                                console.log(err);
                            })
                        // })
                    }
                    // document.getElementById("change").innerHTML =
                    //     '<div className="alert alert-primary"><h3>Your change: ' + change + ' , Thank you!</h3></div>';
                    alert('Masukan kode invoice ini untuk konfirmasi pembayaran! ' + invoice)
                    window.location = "/confirmorder"
                       
                }).catch((err) => {
                    console.log(err);
                })

            }

    //     }
    // }
    
  
    renderListCart = () => {
        
        var listJSXCart = this.state.listCart.map((item) => {

            return (
                <tr>
                    <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>{item.nama}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>{item.harga}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>{item.qty}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>{item.harga * item.qty}</td>
                </tr>
            )
        })
        
        return listJSXCart;
    }
        
    render() {
        
        if(this.props.username !== "") {
            
            return(
                <div>
                    <article className="card-body mx-auto">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Checkout</h2>
                            <br/>
                        </div>
                        <br/>
                        <div class="table-responsive card shadow p-3 mb-5 bg-white rounded" style={{height: '700px'}}>
                            <table align="center" className="col-md-6 table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>ID</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Produk</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Harga</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Qty</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Total Harga</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {this.renderListCart()}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4">
                                            <div align="bg-dark right">
                                                <Button color="primary" size="lg" block style={{ fontSize: "14px" }}
                                                    onClick={ () => this.onBtnPayment() }>
                                                &nbsp; Bayar
                                                </Button>
                                            </div>
                                        </td>
                                        <td colSpan="4" className="text-center">
                                            <h1>Total Harga : IDR {this.state.totalPrice}</h1>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </article>
                </div>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        id : state.auth.id
    }
}

export default connect(mapStateToProps)(CheckOut);