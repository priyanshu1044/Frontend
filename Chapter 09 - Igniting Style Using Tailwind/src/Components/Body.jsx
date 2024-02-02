import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Offline from "../Pages/Offline";
import {swiggy_api_URL} from "../constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../Utils/filterDataHelper";
import useOnlineStatus from "../Utils/useOnlineStatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRestaurants();
  },[]);

  async function fetchRestaurants() {
    const response = await fetch(swiggy_api_URL);
    const data = await response.json();
    const desiredData = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setRestaurants(desiredData);
    setFilteredRestaurants(desiredData); // Initialize filteredRestaurants with all restaurants
  }

  const handleSearch = () => {
    setErrorMessage('');
    const filteredData = filterData(searchText, restaurants);
    setFilteredRestaurants(filteredData); // Set the filtered data
  
    if (filteredData.length === 0) {
      setErrorMessage('No restaurants found matching your query.');
      // If no restaurants match, display all 20 restaurants
      setFilteredRestaurants(restaurants);
    }
  }  



  const isOnline=useOnlineStatus();
  if(!isOnline){
    return <Offline/>
  }


  if (!restaurants) return null;

  return (
    <div className=" bg-custom-light-beige rounded-lg shadow-lg m-2">
      <div className="text-center w-full relative flex items-center justify-center">
  <input
    className="w-2/5 mt-5 mb-5 box-border rounded-l-lg bg-custom-light-beige shadow-md p-3.5 pl-5 pr-10 border border-custom-darkest-blue text-black outline-none text-lg"
    placeholder="Search a restaurant you want..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    }}
  />
  <button
    className="rounded-r-lg bg-custom-darkest-blue shadow-md p-3.5 pl-5 pr-4 ml-[-1px] cursor-pointer border-none outline-none text-lg text-white"
    onClick={handleSearch}
  >
    Search
  </button>
</div>

      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {filteredRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (

        <div className="flex flex-wrap items-stretch w-auto justify-center ">
          {/* {filteredRestaurants.map((restaurant) => {
            return (
                <RestaurantCard key={restaurant?.info?.id} {...restaurant?.info} />
            );
          })} */}
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              <RestaurantCard {...restaurant?.info} />
            </Link>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Body;