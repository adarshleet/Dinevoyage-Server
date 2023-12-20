import Kitchen from "../../domain/kitchen"

interface KitchenRepository{
    addItem(restauarantId:string,item:Kitchen):Promise<any>
    viewItem(restauarantId:string,searchQuery:string,page:number):Promise<any>
    editItem(itemId:string,itemData:Kitchen):Promise<any>
    changeItemStatus(itemId:string):Promise<any>


    //user
    //item booking view page
    allItems(restaurantId:string):Promise<any>

    //getting all items for showing in booking
    kitchenAllItems(restaurantId:string,veg:boolean):Promise<any>

}

export default KitchenRepository