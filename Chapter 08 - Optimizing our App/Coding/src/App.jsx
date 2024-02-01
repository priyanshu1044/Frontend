// ## Namaste React Course by Akshay Saini

import React,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
//components
import Body from "./Components/Body";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RestaurantMenu from "./Components/RestaurantMenu";
//lazy loading
const InstaMart = lazy(() => import("./Components/InstaMart"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));

//pages
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";

//static files
import "./index.css";
import Shimmer from "./Components/Shimmer";




/* My Food App structure will look like this, 
            1) Header
                - Logo
                - Nav Items(right side)
                - Cart
            2) Body
                - Search bar
                - Restaurants List
                    - Restaurant card
                        - Image
                        - Name
                        - Rating
            3) Footer
                - Links
                - Copyrights
       
*/

// AppLayout component to render: Header, Body and Footer Component
const AppLayout = () => {
  return (
    <>
      <Header />

      <Outlet/>
      <Footer />
    </>
  );
};


const appRouter = createBrowserRouter([

    {
      path: "/",
      element: <AppLayout/>,
      errorElement: <PageNotFound/>,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/about-us",
          element: <Suspense><AboutUs/></Suspense>,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path:"/restaurant/:restaurantId",
          element: <RestaurantMenu/>
        },
        {
          path:"/instaMart",
          element: (<Suspense fallback={<Shimmer/>}><InstaMart/></Suspense>)
        }
      ], 
    },
    {
      path: "/login",
      element: <Login />,
    },
    
    

]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
