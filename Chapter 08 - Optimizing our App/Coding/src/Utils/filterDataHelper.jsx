// export function filterData(searchText, restaurants) {
//   // in this search function we are filtering the data based on search text
//   // we are checking if restaurant name contains search text then we are returning that restaurant
//   const filteredData = restaurants.filter((restaurant) =>
//     restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
//   );
//   return filteredData;
// }


// improved search function


export function filterData(searchText, restaurants) {
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