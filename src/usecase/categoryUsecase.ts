import CategoryRepository from "./interface/categoryRepository";

class CategoryUsecase{
    private CategoryRepository:CategoryRepository

    constructor(CategoryRepository:CategoryRepository){
        this.CategoryRepository = CategoryRepository
    }


    async addCategory(restaurantId:string,category:string){
        try {
            const categoryAdd = await this.CategoryRepository.addCategory(restaurantId,category)
            return{
                status:200,
                data:categoryAdd
            }
        } catch (error) {
            console.log(error)
        }
    }


    async changeCategoryStatus(categoryId:string){
        try {
            const categoryStatus = await this.CategoryRepository.changeCategoryStatus(categoryId)
            return{
                status:200,
                data:categoryStatus
            }
        } catch (error) {
            console.log(error)
        }
    }


    async editCategory(categoryId:string,category:string){
        try {
            const categoryEdit = await this.CategoryRepository.editCategory(categoryId,category)
            return{
                status:200,
                data:categoryEdit
            }
        } catch (error) {
           console.log(error);
            
        }
    }



    async allCategories(restaurantId:string,search:string,page:number){
        try {
            const categories = await this.CategoryRepository.viewCategories(restaurantId,search,page)
            return{
                status:200,
                data:categories
            }
        } catch (error) {
            console.log(error);
        }
    }


}

export default CategoryUsecase