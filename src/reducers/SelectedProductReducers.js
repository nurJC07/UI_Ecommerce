import { SELECTED_PRODUCT } from '../actions/types'


const INITIAL_STATE = {
    id : 0, 
    nama : '', 
    harga: 0, 
    image:'' , 
    categoryId:0 , 
    description:''}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECTED_PRODUCT :
           
            return action.payload;
    
        default :
            return state;
    }
}