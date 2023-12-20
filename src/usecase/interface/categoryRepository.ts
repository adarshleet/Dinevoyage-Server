

interface categoryRepository{
    addCategory(restaurantId:string,category:string):Promise<any>
    editCategory(categoryId:string,category:string):Promise<any>
    viewCategories(restaurantId:string,search:string,page:number):Promise<any>
    changeCategoryStatus(categoryId:string):Promise<any>
}

export default categoryRepository