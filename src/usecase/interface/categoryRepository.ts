

interface categoryRepository{
    addCategory(restaurantId:string,category:string)
    editCategory(categoryId:string,category:string)
    viewCategories(restaurantId:string,search:string,page:number)
    changeCategoryStatus(categoryId:string)
}

export default categoryRepository