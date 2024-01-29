import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // import useParams for read `restaurantId`
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../src/constants";
import {MenuShimmer} from "./Shimmer";
import "./RestaurantMenu.css";
const RestaurantMenu = () => {
  const { restaurantId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, setRestaurant] = useState(null); // call useState to store the api data in res
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



  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating" style={
              (restaurant?.avgRating < 4 && restaurant?.avgRating !== "--")
                ?   { 
                  backgroundColor: "red", 
                  borderRadius: "5px", 
                  padding: "0 5px 0", 
                  color: "white", 
                  fontSize: "14px", 
                  fontWeight: "600" 
                } 
                : (restaurant?.avgRating === "--")
                ? { 
                  color:"black"
                } 
                : { 
                  backgroundColor: "rgb(19, 176, 1)", 
                  borderRadius: "5px", 
                  padding: "0 5px 0", 
                  color: "white", 
                  fontSize: "14px", 
                  fontWeight: "600" 
                } 
            }>
              <span>★ {restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;





// import { useState, useEffect } from 'react'
// import { useParams } from "react-router-dom";
// import Shimmer from './Shimmer';

// import { ITEM_IMG_CDN_URL,swiggy_menu_api_URL} from '../src/constants.js';

// function RestaurantMenu() {
//     const { restaurantId } = useParams();
//     const [restaurantInfo, setRestaurantInfo] = useState(null);
//     const [restaurantMenu, setRestaurantMenu] = useState(null);

    


//     const getRestaurantInfo = async () => {
//         try {
//             const response = await fetch(`${swiggy_menu_api_URL}${restaurantId}`);
//             const data = await response.json();
//             console.log(data?.data);
//             // console.log(data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.dishes)
//             // console.log(data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards)
//             setRestaurantInfo(data?.data?.cards[0]?.card?.card?.info);
//             setRestaurantMenu(data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards)
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getRestaurantInfo();
//     }, []);

//     if (!restaurantInfo) {
//         return <Shimmer />;
//     }

//     return (
//         <div>
//             {/* {restaurantMenu[1].card.card.itemCards.map((item, index) => (
//                 <div key={index}>
//                     <h2>{item.card.info.name}</h2>
//                     <img src={ITEM_IMG_CDN_URL+item.card.info.imageId} alt={item.card.info.name} />
//                     <p>Category: {item.card.info.category}</p>
//                     <p>Description: {item.card.info.description}</p>
//                     <p>Price: {item.card.info.price ? (item.card.info.price / 100).toFixed(2) : 'Not available'}</p>
//                 </div>
//             ))} */}
//         {/* {console.log(restaurantMenu[1].card.card.itemCards[0].card.info.name)} */}
//         {/* {restaurantInfo && restaurantInfo.data.cards[0].card.card.info.name} */}
//         {/* {restaurantMenu.map((item, index) => (
//             <div key={index}>
//                 <h2>{item.name}</h2>
//                 <p>{item.description}</p>
//             </div>
//         ))} */}
//     </div>
//     )
// }

// export default RestaurantMenu