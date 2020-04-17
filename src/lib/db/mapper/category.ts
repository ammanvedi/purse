import Plaid from 'plaid'
import {Category} from "../../../types/database";

export const apiCategoryToDB = (category: Plaid.Category): Category => ({
    id: category.category_id,
    description: ([category.group, ...category.hierarchy]).join(',')
})