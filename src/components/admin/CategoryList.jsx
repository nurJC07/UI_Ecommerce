import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../../supports/api-url/apiurl'
import { select_category} from '../../actions/CategoryActions'

class CategoryList extends Component {
    state = { categoryList : []}

    componentDidMount() {
        this.getCategoryList();
        }
     
    getCategoryList = () => {
        axios.get(API_URL + '/category/getlistcategory')
        .then((res) => {
        console.log(res.data)
        this.setState({ categoryList: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }

    onItemClick = () => {
        this.props.select_category(this.props.category);
    }

    renderListCategory = () => {
        var listJSXProduk = this.state.categoryList.map((item) => {
        return (
            <div className="col-lg-3" onClick={this.onItemClick}>
             <div className="media">
            <div className="portfolio-hover">
            <div className="portfolio-hover-content"></div>
            {/* <div className="card h-80"> */}
 
            <div className="card-body" style={{height:"250px", overflow:"hidden"}}>
                <img className="img-fluid" src={`${API_URL}${item.image}`}  alt={item.namaCategory} width="200px"  />                    
            </div>
            <div className="card-footer" style={{height:"40px", overflow:"hidden"}}>
                {/* <div className="text-wrap" style={{height:"40px", overflow:"hidden"}}> */}
                    <p className="card-title text-uppercase text-center font-weight-bold" style={{fontSize:12}}>{item.namaCategory}</p>
            </div>  
            </div> 
            </div> 
                                  
            </div>
            // </div>                            
            // </div>
            
        );
        }
        )
        return listJSXProduk;
    }
    
        render (){
          if(this.props.username !== ""){
            if(this.props.category.id !== 0) {
            //   return <Redirect to = {`/ProdukDetail/${this.props.produk.id}`} />
            return <Redirect to = {`/CategoryDetail?category_id=${this.props.category.id}`} />
            }
            return (
    
                 <div style={{ fontSize: "13px" }} className="card shadow p-3 mb-5 bg-white rounded">
                <div className="container">
                <div className="row">
            
              
                <div className="row">
                { this.renderListCategory()}
                </div>
                </div>
                </div>
                </div>
               
                
      );
      
    }
    return <Redirect to ='/Login'/>
    }
    }

//    

const mapStateToProps = (state) => {
    return { 
        category: state.selectedCategory,
        }
}

export default connect(mapStateToProps, {select_category})(CategoryList);