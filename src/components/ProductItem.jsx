import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_product} from '../actions/ProductsActions'
import {API_URL} from '../supports/api-url/apiurl'

class ProductItem extends Component {

    onItemClick = () => {
        this.props.select_product(this.props.product);
    }

    render() {
        const { image, nama, harga } = this.props.product;
        return (
            <div className="col-lg-3 col-md-4 mb-4" onClick={this.onItemClick}>
            <div className="card h-80">
                {/* <a style={{textDecoration:"none"}}> */}
                    
                    <div className="card-body" style={{height:"150px", width:"100px"}}>
                        <img className="img-center" src={`${API_URL}${image}`} alt={nama} width="80px" />                    
                    </div>
                    <div className="card-footer" style={{height:"70px", overflow:"hidden"}}>
                        <div className="text-wrap" style={{height:"40px", overflow:"hidden"}}>
                            <p className="card-title text-uppercase font-weight-bold" style={{fontSize:12}}>{nama}</p>
                        </div>                            
                        <p className="font-weight-lighter" style={{fontSize:12, color:'#9e9e9e', margin:0}}>Rp.{harga.toLocaleString()}</p>
                        
                    </div>
                {/* </a> */}
                
                
            </div>
        </div>
    );
          
    }
}

export default connect(null, { select_product })(ProductItem);

/* pada src, description dan nama ada proses descruction.
Seharusnya this.props.product.img, this.props.product.nama, this.props.product.description */