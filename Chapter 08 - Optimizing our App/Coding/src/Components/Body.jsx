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
    <div className="search-res">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        ></input>
        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {filteredRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
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