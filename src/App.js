import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions';
import HomePageUser from './components/HomePageUser'
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import WaitingVerification from './components/WaitingVerification'
import Verified from './components/Verified'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import ProductItem from './components/ProductItem'
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import History from './components/History';
import ManageUser from './components/admin/ManageUser';
import ManageProduct from './components/admin/ManageProduct';
import ManageHistory from './components/admin/ManageHistory';
import ManageCategory from './components/admin/ManageCategory';
import Spinner from './components/Spinner';
import CategoryList from './components/admin/CategoryList'
import Dashboard from './components/admin/Dashboard';

import ConfirmationPayment from './components/ConfirmationPayment';
import Verify from './components/admin/Verify';


const cookies = new Cookies();

class App extends Component {


  componentDidMount() {
    const username = cookies.get('usernameCookie');
    console.log(username);
    if(username !== undefined){
        this.props.keepLogin(username);
    } else {
      this.props.cookieChecked();
    }
}
 
render() {
  if(this.props.cookie){ 
    return (
      <div className="App">
        <Header />
        <div className="container-fluid myBody border bg-light" >
        <Route exact path="/" component={HomePage}/>
        <Route path="/homepageuser" component={HomePageUser}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/WaitingVerification" component={WaitingVerification}/> 
        <Route path="/Verified" component={Verified}/> 
        <Route path="/ProductItem" component={ProductItem}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/history" component={History}/>
        <Route path="/checkout" component={CheckOut}/>
        <Route path="/admin/dashboard" component={Dashboard}/>
        <Route path="/admin/manageusers" component={ManageUser}/>
        <Route path="/admin/manageproducts" component={ManageProduct}/>
        <Route path="/admin/managehistory" component={ManageHistory}/>
        <Route path="/admin/managecategory" component={ManageCategory}/>
        <Route path="/admin/verifyorder" component={Verify}/>
        <Route path="/categorylist" component={CategoryList}/>
        <Route path="/productlist" component={ProductList}/>
        <Route path="/ProductDetail" component={ProductDetail}/>
        <Route path="/confirmationpayment" component={ConfirmationPayment}/>

               </div>

</div>
);
}
return (  
<div className="App">
<Header />
<div className="row" style={{borderRadius: "5px"}}>
  <div className="ml-auto mr-auto loader"></div>
</div>
</div>
);
}
}

const mapStateToProps = (state) => {
  return {  cookie: state.auth.cookie,
            user: state.auth,
         }
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));

// render(){
//   return(
//     <div>
//       Ini App
//     </div>
//   )
// }
// }

// export default App