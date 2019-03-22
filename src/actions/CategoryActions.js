import { 
    SELECTED_CATEGORY
} from './types';

export const select_category = (selectedCategory) => {
    return {
        type : SELECTED_CATEGORY,
        payload : selectedCategory
    }
}