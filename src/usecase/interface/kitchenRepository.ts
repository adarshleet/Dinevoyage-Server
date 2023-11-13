import Kitchen from "../../domain/kitchen"

interface KitchenRepository{
    addItem(restauarantId:string,item:Kitchen)
    viewItem(restauarantId:string)
}

export default KitchenRepository