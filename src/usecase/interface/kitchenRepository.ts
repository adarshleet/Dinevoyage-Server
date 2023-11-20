import Kitchen from "../../domain/kitchen"

interface KitchenRepository{
    addItem(restauarantId:string,item:Kitchen)
    viewItem(restauarantId:string)


    //user
    //item booking view page
    allItems(restaurantId:string)

    //getting all items for showing in booking
    kitchenAllItems(restaurantId:string)

}

export default KitchenRepository