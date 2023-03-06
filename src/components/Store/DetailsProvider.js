import { useState } from "react";
import DetailsContext from "./DetailsContext";

const DetailsProvider = (props) => {

  const [details, setDetails] = useState(null);

  const addDetails = (item) => {
    setDetails(item);
  }

  const removeDetails = () => {
    setDetails(null);
  }

  const detailsContext = {
    details: details,
    addDetails: addDetails,
    removeDetails: removeDetails
  }

  return (
    <DetailsContext.Provider value={detailsContext}>
      {props.children}
    </DetailsContext.Provider>
  )
}

export default DetailsProvider;