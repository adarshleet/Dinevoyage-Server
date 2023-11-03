import restaurantModel from "../database/restaurantModel";
import RestaurantRepository from "../../usecase/interface/restaurantRepository";
import Restaurant from "../../domain/restaurant";

class restaurantRepository implements RestaurantRepository{
    async addRestaurant(restaurantData: Restaurant) {
        
    }
}

export default restaurantRepository