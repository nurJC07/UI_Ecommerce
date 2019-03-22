//===================ACTION CREATOR=====================//
import { 
    SELECTED_PRODUCT
} from './types';

export const select_product = (selectedProduct) => {
    return {
        type: SELECTED_PRODUCT,
        payload: selectedProduct
    }
}