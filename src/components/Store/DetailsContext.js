import React from "react";

const DetailsContext = React.createContext({
  details: [],
  addDetails: () => {},
  removeDetails: () => {}
})

export default DetailsContext;