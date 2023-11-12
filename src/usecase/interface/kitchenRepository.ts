interface KitchenRepository{
    addItem(restauarantId:string,category:string)
    viewItem(restauarantId:string)
}

export default KitchenRepository