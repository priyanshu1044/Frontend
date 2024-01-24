import { restaurantList } from "../src/constants";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import {API_URL} from "../src/constants";
import Shimmer from "./Shimmer";

// function filterData(searchText, restaurants) {
//   // in this search function we are filtering the data based on search text
//   // we are checking if restaurant name contains search text then we are returning that restaurant
//   const filteredData = restaurants.filter((restaurant) =>
//     restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
//   );
//   return filteredData;
// }


// improved search function
function filterData(searchText, restaurants) {
  const filteredData = restaurants.filter((restaurant) => {
    const { name, cuisines, areaName, costForTwo, avgRating } = restaurant?.info || {};

    // Convert all data to string and lower case for case insensitive search
    const nameMatch = name?.toLowerCase().includes(searchText.toLowerCase());
    const cuisinesMatch = cuisines?.some(cuisine => cuisine.toLowerCase().includes(searchText.toLowerCase()));
    const areaNameMatch = areaName?.toLowerCase().includes(searchText.toLowerCase());
    const costForTwoMatch = costForTwo?.toString().includes(searchText);
    const avgRatingMatch = avgRating?.toString().includes(searchText);

    // Return true if any of the fields match the search text
    return nameMatch || cuisinesMatch || areaNameMatch || costForTwoMatch || avgRatingMatch;
  });

  return filteredData;0
}
const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRestaurants();
  },[]);

  async function fetchRestaurants() {
    const response = await fetch(API_URL);
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
        {filteredRestaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
          );
        })}
      </div>
      )}
    </div>
  );
};



// Body Component for body section: It contain all restaurant cards
// We are mapping restaurantList array and passing JSON data to RestaurantCard component as props with unique key as index
// const Body = () => {
//   // useState: To create a state variable, searchText is local state variable
//   const [searchText, setSearchText] = useState("");
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     fetchRestaurants();
//   },[]);

//   async function fetchRestaurants() {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     const desiredData = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
//     setRestaurants(desiredData);
//   }



//   return (
//     <div className="search-res">
//       <div className="search-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search a restaurant you want..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         ></input>
//         <button
//           className="search-btn"
//           onClick={() => {
//             filterData(searchText, restaurants);
//           }}
//         >
//           Search
//         </button>
//       </div>
//       {restaurants?.length === 0 ? (
//         <Shimmer />
//       ) : (
//         <div className="restaurant-list">
//         {restaurants.map((restaurant) => {
//           return (
//             <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
//           );
//         })}
//       </div>
//       )}
//     </div>
//   );
// };

export default Body; 