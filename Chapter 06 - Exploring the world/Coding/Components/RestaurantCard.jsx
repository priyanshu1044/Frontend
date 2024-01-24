import { IMG_CDN_URL } from "../src/constants";

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
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h2>{name}</h2>
      <h5>{cuisines.join(", ")}</h5>
      <h6>{areaName}</h6>
      <span>
        <h4
          style={
            avgRating < 4 ? { backgroundColor: "red" } : { color: "white" }
          }
        >
          {avgRating}★
          {/* <p className="fa fa-star checked"></p> */}
        </h4>
        <h4>{sla.lastMileTravelString}</h4>
        <h4>{costForTwo}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;
