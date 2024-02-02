import { useEffect, useState } from "react";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constants";


const useRestaurant = (restaurantId) => {
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
      }, []);
    
      async function getRestaurantInfo() {
        try {
            console.log(`${swiggy_menu_api_URL}${restaurantId}`);
          const response = await fetch(`${swiggy_menu_api_URL}${restaurantId}`);
          console.log(response);
          const json = await response.json();
          console.log(json);
    
          // Set restaurant data
          const restaurantData = json?.data?.cards?.map(x => x.card)?.
                                 find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
          setRestaurant(restaurantData);
    
          // Set menu item data
          const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                                groupedCard?.cardGroupMap?.REGULAR?.
                                cards?.map(x => x.card?.card)?.
                                filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                                map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
          
          const uniqueMenuItems = [];
          menuItemsData.forEach((item) => {
            if (!uniqueMenuItems.find(x => x.id === item.id)) {
              uniqueMenuItems.push(item);
            }
          })
          setMenuItems(uniqueMenuItems);
        } catch (error) {
          setMenuItems([]);
          setRestaurant(null);
          console.log(error);
        }
      }
  return {restaurant,menuItems};
}

export default useRestaurant