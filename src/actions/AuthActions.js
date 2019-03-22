//===================ACTION CREATOR=====================//
import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING, 
    LOGOUT,
    COOKIE_CHECKED
} from './types';
import { API_URL } from '../supports/api-url/apiurl';

export const onUserLogin = ({ username, password }) => { 

    return (dispatch) => {
        
        dispatch({ type: AUTH_LOADING });

        axios.post(API_URL + `/auth/login`, { username, password}
        ).then((res) => {
            console.log(res);
            console.log("masuk");

            
            if(res.data.length > 0){
                dispatch({type: USER_LOGIN_SUCCESS, 
                    payload: res.data[0]})
            } else {
                dispatch({type: AUTH_SYSTEM_ERROR, payload: 'Username or password invalid'})
            }
            
        }).catch((err) => {
            console.log(err)
            dispatch({type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
        })
        
    }
}


export const onUserRegister = ({ username, email, phone, password}) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING });

        if(username === '' || email === '' || phone === '' || password === ''){
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form di atas wajib diisi !'})
        } else {
         
            axios.post(API_URL + `/auth/register`, { 
                username, email, password, phone 
            }).then((res) => {
                console.log(res);
                if(res.data.status === 'error'){
                    dispatch({type: AUTH_SYSTEM_ERROR, payload: res.data.message})
                }
                else{
                    console.log(res.data);
                    dispatch({type: USER_LOGIN_SUCCESS, payload: res.data})
                }                
            }).catch((err)=> {
                console.log(err);
                dispatch({type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
            
        }
        
    }
};

export const keepLogin = (username) => {

    return (dispatch) => {

        axios.post(API_URL + '/auth/keeplogin', {
            username
        }).then((res) => {
            console.log(username)
            if(res.data.length > 0) {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res.data[0]
                })
            }
        })

    }

};

export const onUserVerified = (userData) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload :userData
    }
}

export const onUserLogout = () => {
    return { type: LOGOUT }
};

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
};