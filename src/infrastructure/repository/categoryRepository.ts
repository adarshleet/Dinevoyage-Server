import categoryModel from "../database/categoryModel";
import CategoryRepository from "../../usecase/interface/categoryRepository";


class categoryRepository implements CategoryRepository{
    async addCategory(restaurantId: string, category: string) {

        const categoryFound = await categoryModel.findOne({category})
        if(categoryFound){
            return false
        }

        const categoryToAdd = new categoryModel({
            restaurantId,
            category
        } )
        const categoryAdd = categoryToAdd.save()
        return categoryAdd
    }


    async editCategory(categoryId: string,category:string) {
        const categoryFound = await categoryModel.findOne({category})
        if(categoryFound){
            return false
        }

        const categoryEdit = await categoryModel.findByIdAndUpdate(categoryId,{$set:{category}},{new:true})
        return categoryEdit
    }

    async changeCategoryStatus(categoryId: string) {
        const category = await categoryModel.findById(categoryId)
        if(category){
            const newStatus = !category.isListed
            const categoryStatus = await categoryModel.findByIdAndUpdate(categoryId,{$set:{isListed:newStatus}},{new:true})
            return categoryStatus
        }
        
    }


    async viewCategories(restaurantId: string) {
        const categories = await categoryModel.find({restaurantId})
        return categories
    }
}


export default categoryRepository