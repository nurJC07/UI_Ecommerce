import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectedProductReducer from './SelectedProductReducers';
import SelectedCategoryReducer from './SelectCategoryReducers'

export default combineReducers (
    {
        auth : AuthReducer,
        selectedProduct: SelectedProductReducer,
        selectedCategory: SelectedCategoryReducer,
    }
);