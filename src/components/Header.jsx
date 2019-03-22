import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
    } from 'reactstrap';
import { onUserLogout } from '../actions';
import Cookies from 'universal-cookie';
import logo from '../supports/img/Logo OteShop.jpeg';



const cookies = new Cookies();

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogoutSelect = () => {
        if(window.confirm('Are you sure want to Logout?')) {
            if(this.props.onUserLogout()) {
            cookies.remove('usernameCookie', 'roleCookie');
        }
    }
}



    render() {
        if(this.props.username === "") {
            return (
                <div style={{ margin: '0 0 90px 0' }}>
                    <Navbar color="light" light expand="md" fixed="top" className="shadow">
                    <NavbarBrand href="/" style={{ fontSize: "35px", marginBottom: "10px" }}>
                    <img src={logo} alt="Purwadhika store logo" height={50} width={250} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>

                        <NavItem>
                        <Link to="/login"><NavLink><i className="fa fa-sign-in"></i> Login</NavLink></Link>
                        </NavItem>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavItem>
                        <Link to="/register"><NavLink><i className="fa fa-user-plus"></i> Register</NavLink></Link>
                        </NavItem>

                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } if(this.props.username!=="" && this.props.role==="Admin") {
            console.log(this.props.username)
            return (
                <div style={{ margin: '0 0 90px 0' }}>
                    <Navbar color="light" light expand="md" fixed="top" className="shadow">
                    <NavbarBrand href="/" style={{ fontSize: "16px" }}>
                    <img src={logo} alt="logo" height={50} width={250} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>
                        <NavItem>
                            <NavLink href="/admin/Dashboard">
                            <i class="fas fa-cogs"></i> Dashboard Admin 
                            </NavLink>
                            </NavItem>
                           
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                <p className="text-capitalize" style={{display:"inline"}}> Hello,{this.props.username}</p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                   
                                    <DropdownItem onClick={this.onLogoutClick}>
                                        <i className="fas fa-sign-out-alt text-danger"></i> Logout 
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                            {/* <NavLink href="#" onClick={this.onLogoutSelect}>Logout</NavLink> */}
                            <NavLink href="#" onClick={this.onLogoutSelect}>
                            <i className="fa fa-sign-out fa-lg"></i>
                            &nbsp;Logout
                            </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }
    

         else {
            return (
                
                <div style={{ margin: '0 0 90px 0' }}>
                    <Navbar color="light" light expand="md" fixed="top" className="shadow">
                    <NavbarBrand href="/" style={{ fontSize: "16px" }}>
                    <img src={logo} alt="logo" height={50} width={250} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>
                        <NavItem>
                            <NavLink href="/productlist">
                            <i className="fa fa-home fa-lg"></i>&nbsp;Product
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/cart">
                            <i className="fa fa-shopping-cart fa-lg"></i>
                            &nbsp;Cart&nbsp;<span className="badge badge-primary"></span>
                            </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, <p className="text-capitalize" style={{display:"inline"}}>{this.props.username}</p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className="text-secondary"><i className="fas fa-user"></i> Profile</DropdownItem>
                                    <DropdownItem><Link to="/history" className="text-secondary"><i className="fas fa-history"></i> History Belanja </Link></DropdownItem>
                                    <DropdownItem><Link to="/confirmationpayment" className="text-secondary"><i className="fas fa-money-check-alt"></i> Konfirmasi Bayar</Link> </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onLogoutClick}>
                                        <i className="fas fa-sign-out-alt text-danger"></i> Logout 
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                            {/* <NavLink href="#" onClick={this.onLogoutSelect}>Logout</NavLink> */}
                            <NavLink href="#" onClick={this.onLogoutSelect}>
                            <i className="fa fa-sign-out fa-lg"></i>
                            &nbsp;Logout
                            </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }
        
    
}
    }


const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        role : state.auth.role,
        status : state.auth.status
    }
}

export default connect(mapStateToProps, { onUserLogout})(Header);



// import React,  { Component } from 'react';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Cookies from 'universal-cookie';
// import { onUserLogout, keepLogin} from '../actions';

// const cookies = new Cookies();

// class HeaderKu extends Component{

//     constructor(props) {
//         super(props);
    
//         this.toggle = this.toggle.bind(this);
//         this.state = {
//         isOpen: false
//       };
//     }
//     toggle() {
//        this.setState({
//          isOpen: !this.state.isOpen
//        });
//     }

//     renderLinkIsAdmin = () => {
//         if(this.props.role === "Admin"){
//             return(
//                 <Link to="/admin/home">
//                     <NavLink className="border-right">
//                         <i class="fas fa-cogs"></i> Dashboard Admin 
//                     </NavLink>
//                 </Link>
//             );
//         }
//         return(
//             <Link to="/cart">
//                 <NavLink className="border-right">
//                     <i className="fas fa-shopping-cart"></i> Keranjang 
//                 </NavLink>
//             </Link>
//         );
//     }



//     onLogoutClick = () => {
//         this.props.onUserLogout();
//         cookies.remove('usernameCookie');
//         //cookies.remove('myKey');
//     }

   


//     render(){
//         if (this.props.username === ""){ 
//             return(
//                 <div style={{marginBottom:"75px"}}>
//                     <Navbar color="light" light expand="md" fixed="top">
//                         <NavbarBrand href="/" className="ml-2" ><img src="http://localhost:3000/buku3.png" alt="brand" width="90px" /></NavbarBrand>
//                         <NavbarToggler onClick={this.toggle} />
//                         <Collapse isOpen={this.state.isOpen} navbar>
//                             <Nav className="ml-auto" navbar>
                                
                                
//                                 <NavItem>
//                                     <Link to="/register"><NavLink className="myLogin btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
//                                 </NavItem>
//                                 <NavItem>
//                                     <Link to="/login"><NavLink className="myLogin btn btn-default border-primary" style={{fontSize:"14px"}}><i className="fas fa-sign-in-alt" /> Masuk</NavLink></Link>
//                                 </NavItem>
//                             </Nav>
//                         </Collapse>
//                     </Navbar>
//                 </div>
//             );
//         }
//         return(
//             <div style={{marginBottom:"75px"}}>
//                 <Navbar color="light" light expand="md" fixed="top">
//                     <NavbarBrand href="/" className="ml-2"><img src="http://localhost:3000/buku3.png" alt="brand" width="90px" /></NavbarBrand>
//                     <NavbarToggler onClick={this.toggle} />
//                     <Collapse isOpen={this.state.isOpen} navbar>
//                         <Nav className="ml-auto" navbar>
                           

//                             <NavItem>
//                                 {this.renderLinkIsAdmin()}                            
//                             </NavItem>
                            
//                             <UncontrolledDropdown nav inNavbar>
//                                 <DropdownToggle nav caret>
//                                     Hello, <p className="text-capitalize" style={{display:"inline"}}>{this.props.username}</p>
//                                 </DropdownToggle>
//                                 <DropdownMenu right>
//                                     <DropdownItem className="text-secondary"><i className="fas fa-user"></i> Profile</DropdownItem>
//                                     <DropdownItem><Link to="/historytrx" className="text-secondary"><i className="fas fa-history"></i> History Belanja </Link></DropdownItem>
//                                     <DropdownItem><Link to="/confirmpayment" className="text-secondary"><i className="fas fa-money-check-alt"></i> Konfirmasi Bayar</Link> </DropdownItem>
//                                     <DropdownItem divider />
//                                     <DropdownItem onClick={this.onLogoutClick}>
//                                         <i className="fas fa-sign-out-alt text-danger"></i> Logout 
//                                     </DropdownItem>
//                                 </DropdownMenu>
//                             </UncontrolledDropdown>

//                         </Nav>
//                     </Collapse>
//                 </Navbar>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         username: state.auth.username,
//         role: state.auth.role,
        
// }
// }

// export default connect(mapStateToProps, {onUserLogout, keepLogin})(HeaderKu);