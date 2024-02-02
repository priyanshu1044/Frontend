import { IMG_CDN_URL } from "../constants.js";

// Restaurant card component: Image, name, cuisine
const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRating,
}) => {
  return (
    <div className="font-custom-font font-bold w-48 shadow-custom rounded-lg p-2 m-5 flex-grow bg-custom-beige cursor-pointer transform hover:scale-105">
      <img className="w-full rounded-lg" src={IMG_CDN_URL + cloudinaryImageId} />
      <h2 className="text-2xl font-bold">{name}</h2>
      <h5 className="text-sm">{cuisines.join(", ")}</h5>
      <h6 className="text-sm">{areaName}</h6>
      <div className="flex justify-evenly mt-5 text-center">
        <h4 className="text-sm text-white rounded-lg  ">
          {avgRating < 4 ? (
            <div className="bg-red-600 rounded-lg p-1 ">{avgRating}★</div>
          ) : (
            <div className="bg-green-600 rounded-lg p-1  ">{avgRating}★</div>
          )}
        </h4>
        <h4 className="text-md">{sla.lastMileTravelString}</h4>
        <h4 className="text-md">{costForTwo}</h4>
      </div>
    </div>
    // <div className="card">
    //   <img src={IMG_CDN_URL + cloudinaryImageId} />
    //   <h2>{name}</h2>
    //   <h5>{cuisines.join(", ")}</h5>
    //   <h6>{areaName}</h6>
    //   <span>
    //     <h4
    //       style={
    //         avgRating < 4 ? { backgroundColor: "red" } : { color: "white" }
    //       }
    //     >
    //       {avgRating}★
    //       {/* <p className="fa fa-star checked"></p> */}
    //     </h4>
    //     <h4>{sla.lastMileTravelString}</h4>
    //     <h4>{costForTwo}</h4>
    //   </span>
    // </div>
  );
};

export default RestaurantCard;
