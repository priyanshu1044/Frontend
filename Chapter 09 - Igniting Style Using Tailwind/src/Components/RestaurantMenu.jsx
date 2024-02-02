import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurant from "../Utils/useRestaurant";
import { swiggy_menu_api_URL, IMG_CDN_URL, ITEM_IMG_CDN_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY } from "../constants";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const { restaurant, menuItems } = useRestaurant(restaurantId);

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu m-2.5 font-custom-font min-h-screen bg-white p-5 shadow-md rounded-md space-y-6">
      <div className="restaurant-summary flex justify-center items-center">
        <img
          className="restaurant-img w-64 h-44 object-cover rounded-md"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details ml-6 flex flex-col">
          <h2 className="restaurant-title text-4xl font-light mb-2">{restaurant?.name}</h2>
          <p className="restaurant-tags text-sm opacity-70">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details flex mt-2 space-x-2 text-sm font-semibold">
            <div className={`restaurant-rating ${restaurant?.avgRating < 4 && restaurant?.avgRating !== "--" ? 'bg-red-500' : (restaurant?.avgRating === "--" ? 'text-black' : 'bg-green-500')} text-white rounded px-2`}>
              <span>★ {restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className=" flex justify-center">
        <div className="w-2/3  ">
          <div className="menu-title-wrap p-4 bg-custom-light-beige rounded-md">
            <h3 className="menu-title text-2xl font-semibold  ">Recommended</h3>
            <p className="menu-count text-sm">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list mt-5 space-y-6 ">
            {menuItems.map((item) => (
              <div className="menu-item flex justify-between p-4 shadow-custom-light  bg-custom-light-beige rounded-md border-b border-gray-300" key={item?.id}>
                <div className="menu-item-details flex flex-col">
                  <h3 className="item-title text-xl font-semibold">{item?.name}</h3>
                  <p className="item-cost text-sm">{item?.price > 0 ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(item?.price / 100) : " "}</p>
                  <p className="w-1/2 item-desc text-sm">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper  flex flex-col items-end ">
                  {item?.imageId && (
                    <img
                      className="menu-item-img w-32 h-30 object-cover rounded-md"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn bg-custom-beige px-4 py-2 rounded-md mt-2"> ADD +</button>
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
