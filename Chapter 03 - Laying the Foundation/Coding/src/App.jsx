import React from "react";
import ReactDOM from "react-dom/client";

// what is react element ??=>its just js object

// React.createElement => gives object => renders in HTML(DOM)


// const heading = React.createElement(
//   "h1",
//   {
//     id: "title",
//     key: "title1",
//   },
//   "Priiyanshu"
// );


//JSX ??


//this is not normal html its like html but its not html

// const heading = (
//   <h1 id="title" key="title1">
//     Priiyanshu using JSX
//   </h1>
// );
const Heading = () => {
  return (
    <h1 id="title" key="title1">
      Priiyanshu using JSX
    </h1>
  );
}


//functional commponent => just JS function which returns react-element OR JSX

const HeaderComponent = () => {
  return (
    <div>
      <Heading/>
      <h1>hello from functional h1</h1>
      <h2>hello from functional h2</h2>
    </div>
  );
};


// create root using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
// passing react element inside root



// if we want to render functional component then we have to use < _____ />
root.render(<HeaderComponent/>);
