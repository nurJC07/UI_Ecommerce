import { SELECTED_CATEGORY } from '../actions/types'


const INITIAL_STATE = {id : 0, namaCategory : '', image: ''}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECTED_CATEGORY :
           
            return action.payload;
    
        default :
            return state;
    }
}

