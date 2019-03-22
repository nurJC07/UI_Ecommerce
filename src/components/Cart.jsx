import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {API_URL} from '../supports/api-url/apiurl';
import { Redirect } from 'react-router-dom';



class Cart extends Component {
    state = {
        listCart : [], 
        selectedIdEdit: 0, 
        totalPrice: 0,
        totalQty: 0 ,
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
  

  onBtnSaveClick = (item) => {
      var Qty = parseInt(this.refs.quantityEdit.value);
      alert(item.qty)

      axios.put(API_URL + '/cart/editcart/' + item.id, {
          ...item, qty : Qty
      }).then((res) => {
          this.getCartList();
      }).catch((err) => {
          console.log(err);
      })
  }

  onBtnDeleteClick = (id) => {
      alert(id)
      if(window.confirm('Are you sure want to delete this item ?')) {

        
          axios.delete(API_URL + '/cart/deletecart/' + id)
          .then((res) => {
              this.getCartList();
          }).catch((err) => {
              console.log(err);
          })
      }
  }

  onBtnCheckoutClick = () => {
      console.log(this.props.username)
      console.log(this.props.email)
    if(window.confirm('Are you sure to Checkout?')) {
        axios.post(API_URL + '/transaction/addTransaction', {
            username: this.props.username,
            trxDate: new Date(),
            totalPrice: this.state.totalPrice,
            totalQty: this.state.listCart.length,
            email: this.props.email,
          
        }).then((res) => {
            alert("trx berhasil ditambahkan")
            console.log('setelah insert data transaksi')
            this.state.listCart.forEach((item) => {
                console.log(res.data.insertId)
                axios.post(API_URL + '/transaction/trxItem', {
                    trxId: res.data.insertId,
                    productId: item.productId,
                    username: this.props.username,
                    nama : item.nama,
                    image : item.image,
                    qty: item.qty,
                    harga: item.harga,
                    
                }).then((res) => {
                    console.log('add success' + item.productId)
                }).catch((err) => {
                    console.log('tidak masuk')
                })
                axios.delete(API_URL + `/cart/clearcart/${this.props.username}`)
                        .then((res) => {
                            console.log('delete success' + item.productId)
                            this.getCartList();
                        }).catch((err) => {
                            console.log(err)
                        })
            })
        }).catch((err) => {
            console.log('data transaksi berhasil di post')
        })
    }
}


   onBtnClick = () => {
        return window.location = '/productlist';
    }

    renderButton = () => {
        var renderButton;
        if(!this.state.listCart.length) {
            renderButton = <button className="btn btn-success" style={{ fontSize: "13px" }} onClick={ () => this.onBtnClick() }>Ayo Belanja Lagi?</button>
        } else {
            renderButton = <div>
                <button className="btn btn-info btn-lg btn-block" style={{ fontSize: "13px"}} onClick={() => this.onBtnClick()}>Mau Belanja Lagi ?</button>
                <br />
                <input type="button" className="btn btn-success" style={{ fontSize: "13px"}} value="Checkout" onClick={this.onBtnCheckoutClick} />
            </div>
        }
        return renderButton;
    }

  
    renderBodyProduct = () => {
        var listJSXProduk = this.state.listCart.map((item) => {
            if(item.id !== this.state.selectedIdEdit) {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td><img src={`${API_URL}${item.image}`} width={80} alt={item.id} /></td>
                        <td>Rp. {item.harga.toLocaleString()}</td>
                        <td>{item.qty}</td>
                        <td>Rp. {(item.harga*item.qty).toLocaleString()}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ selectedIdEdit: item.id })} /></td>
                        <td><input className="btn btn-danger" type="button" value="Remove" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                    </tr> )
            }
            
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                        {item.nama}
                    </td>
                    <td><img src={`${API_URL}${item.image}`} width={80} alt={item.id} /></td>
                    <td>Rp. {item.harga.toLocaleString()}</td>
                    <td><input type="number" ref="quantityEdit" defaultValue={item.qty}
                        />
                    </td>
                    <td>Rp. {(item.harga*item.qty).toLocaleString()}</td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(item)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectedIdEdit: 0 })} /></td>
                </tr> )
            
        })
        return listJSXProduk;
    }
  
    render() {
        if(this.props.username !== "" && this.props.role!=="Admin"){ 
        return (
            <div className="container-fluid">
              <div className="card bg-light col-md-10 offset-md-1" style={{ padding: "20px", fontSize: "13px" }}>
                <div className="row">
                <div className="col-md-10 offset-md-1 text-center">
                        <h2 className="section-heading">Hello, {this.props.username}!!! <br /> Berikut ini adalah Daftar Belanja Anda</h2>
                        <br/>

                    </div>
                </div>
                <center>
                
                      
                        <div className="table-responsive-lg">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Image</th>
                                <th>Harga</th>
                                <th>Quantity</th>
                                <th>Total Harga</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyProduct()}
                        </tbody>
                    </table>
                    <div>
                   
                        <h2 className="btn-danger "style={{ padding: "10px", fontSize: "15px" }} > 
                        Total Price : Rp. {(this.state.totalPrice).toLocaleString()}</h2>
                    </div>
                    <br/>
                    <div >
                        <center>
                        <td colSpan="8">
                                    <div align="center">{this.renderButton()}</div>
                                </td>
                        </center>
                    </div>
                    </div>
                </center>
            </div>
            </div>
        )
        }
        return <Redirect to ='/login'/>
            }
        }
  
  const mapStateToProps = (state) => {
    return{
        username: state.auth.username,
        email: state.auth.email,
        role : state.auth.role,
        
      
    }
  }
  
  export default connect(mapStateToProps) (Cart)