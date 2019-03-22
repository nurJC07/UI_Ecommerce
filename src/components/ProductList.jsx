

import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProductItem from './ProductItem';
import {API_URL} from '../supports/api-url/apiurl'


class ProductList extends Component {
     state= { 
        productList: [],
        selectedProductId: 0, 
        searchListProduct: [], 
        filterForm: '', 
        value: '', 
        categoryList: [],
        listAllCategory: [],
    
        }

        componentDidMount() {
            axios.get(API_URL +'/product/getproduct')
            .then((res) => {
                this.setState({
                    productList: res.data,
                    searchListProduct: res.data, 
                    selectedProductId: 0 
                });   
            }).catch((err) => {
                console.log(err);
            })
            this.getCategoryList();
        } 

        getCategoryList = () => {
            axios.get(API_URL + '/category/getlistcategory')
            .then((res) => {
            console.log(res.data)
            this.setState({ 
                categoryList: res.data, 
                listAllCategory: res.data})
            }).catch((err) => {
            console.log (err)
            })
            }

        renderCategory = (categoryId) => {
            var listJSXCategory = this.state.categoryList.map((item) => {
                if(categoryId === item.id) {
                    return item.namaCategory;
                } else return false;
            })
            return listJSXCategory;
        }
        
        renderAllCategory = () => {
            var listJSXAllCategory = this.state.listAllCategory.map((item) => {
                return (
                    <option value={item.id}>{item.namaCategory}</option>
                )
            })
            return listJSXAllCategory;
        }

        onSearch = () => {
            var namaCategory = this.refs.categorySearch.value;
            var nama = this.refs.namaSearch.value
            var hargaMin = parseInt(this.refs.HargaMinSearch.value);
            var hargaMax = parseInt(this.refs.HargaMaxSearch.value);

            var arrSearch = this.state.productList.filter((item) => {
                return  item.nama.toLowerCase().includes(nama.toLowerCase())
                        &&  item.harga >= hargaMin
                        &&  item.harga <= hargaMax
                        &&  item.namaCategory.includes(namaCategory)
            })
                    this.setState({ searchListProduct: arrSearch })   
        }

 

  renderListProduct = () => {
    var listJSXProduk = this.state.searchListProduct.map((item) => {

        return (
            <ProductItem  product={item} />
        )
    })
    return listJSXProduk;
}

    render (){
        if(this.props.username !== "" && this.props.status!=="Admin" && this.props.status ==="Verified"){
     
        if(this.props.product.id !== 0) {
       
            return <Redirect to = {`/ProductDetail?product_id=${this.props.product.id}`}/>
        
        }
        return (
            <div>
            <section className="bg-light" id="portfolio">
            <div className="container">
            <div className="row">
         
            <hr/> 
            <Row>
            <Col lg="2">
            <div className="form-group" col-lg-3 style={{ marginBottom: "50px" }}>
                Filter by Category :
            <select ref="categorySearch" className="custom-select" style={{ fontSize: "12px" }}>
                <option value="">All Category></option>
                {this.renderAllCategory()}
            </select>
            </div>
            </Col>
            <Col lg="2"> 
            <div className="form-group">
            Filter by Name <input type="text" className="form-control" 
                placeholder="Search by nama" style={{ fontSize: "12px" }}
                ref="namaSearch" />
                </div>
                </Col> 
                <Col lg="2"> 
                <div class="input-group-prepend">
                <div class="input-group-text">Rp</div>
                <input type="number" className="form-control" 
                ref="HargaMinSearch" defaultValue="0" style={{ fontSize: "12px" }}/>                        
               
                </div>
                
                </Col> 
                <Col lg="2"> 
                <div class="input-group-prepend">
                    <div class="input-group-text">Rp</div>
                <input type="number" className="form-control" 
                ref="HargaMaxSearch" defaultValue="99999999" style={{ fontSize: "12px" }} 
                />  
                </div>                 
                </Col> 
                <Col lg="3"> 
             
                <div className="form-group">
             <button className="btn btn-success" style={{ fontSize: "12px" }}
                              onClick={this.onSearch}>
                             <i className="fa fa-search fa-sm"></i> Search
                             </button>    
             </div>
                             </Col> 
                             </Row>
               </div>
               </div>
                <div className="row">
                <div className="col-lg-12 text-center"></div>
       
            { this.renderListProduct()}
            </div>
           
            
            
                </section>
                </div>
               
  );
}
return <Redirect to ='/login'/>
    }
}


const mapStateToProps = (state) => {
  return {
    username : state.auth.username, 
    status: state.auth.status,
    role : state.auth.status,
    product : state.selectedProduct}
}

export default connect (mapStateToProps)(ProductList);