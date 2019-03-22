import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import queryString from 'query-string'
import {API_URL} from '../supports/api-url/apiurl'
import {select_product} from '../actions/ProductsActions'


class ProductDetail extends Component {

componentDidMount(){
 console.log(this.props.location.search)
    var params = queryString.parse(this.props.location.search)
 
    var productId = params.product_id
    axios.get(API_URL +`/product/productdetail/${productId}`)
    .then((res) => {
        this.props.select_product(res.data[0])
        console.log(res.data[0])
        
    }).catch ((err) => {
        console.log (err)
    })
}



onBtnCart = () => {
    var { id, nama, harga, image } = this.props.product;
            var qty = parseInt(this.refs.tbQuantity.value);

    if(this.props.username === "") {
        alert("Please Login First!");
        window.location = "/login"
    } else {
        var qty = parseInt(document.getElementById('addQty').value);
        if(!qty || qty === 0 || qty < 0) {
            alert("Please input qty!");
        } else {
            axios.post(API_URL+'/cart/addcart', {
                username : this.props.username,
                productId: id,
                nama,
                harga,
                image,
                qty
                // idProduct, idCategory, username: this.props.username, qty
            }).then((res) => {
                alert(`Success add to cart: ${qty} item(s)`);
                window.location = "/cart";
            }).catch((err) => {
                console.log(err);
                alert(`Failed add to cart`);
            })
        }
    }

}
 

    render() {
        var { nama, harga, image, description } = this.props.product;
        return(
            <center>
            <div className="row">
             <div className="row bg-light" style={{padding:"20px"}}>
                    <div className="col-lg-6" style={{display: "block"}}>
                        <img className="card-img-top" src={`${API_URL}${image}`} alt={nama} style={{marginTop: "10px", width:'200px',  paddingLeft:10}} />
        
              
               </div>
                <div className="col-lg-6" style={{padding :"10px",textAlign:"left"}}>
                <div className="row">
                <h2>{nama}</h2>
                </div>
                <div className="row">
                 <h4 style={{ color: '#ea7f1c', fontSize: "16px" }}>
                 <td>Rp. {harga.toLocaleString()}</td>
                </h4>
               </div>
               <div className="row">
                <h4>{description}</h4>
                </div>
            <br/>
            <table>
                <tr>
                    <td>
                        <input type="number" placeholder="Input Qty" ref="tbQuantity" id="addQty" 
                            style={{ fontSize: "13px" }} className="form-control form-control-lg" />
                    </td>
                    <td>&nbsp;</td>
                    <td>
                        <button className="btn btn-success" style={{ fontSize: "14px" }}
                            onClick={this.onBtnCart}>
                        <i className="fa fa-shopping-cart fa-sm"></i>
                        &nbsp;&nbsp; Add to Cart
                        </button>
                    </td>
                    </tr>
                </table>
                <br/><br/>
            </div>
        </div>
        </div>
        </center>
       
       
        
  

)
}
}

const mapStateToProps = (state) => {
    return { 
        product: state.selectedProduct,
        username: state.auth.username,
      
}
}
export default connect(mapStateToProps, {select_product})(ProductDetail);











