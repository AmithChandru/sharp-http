import { useState } from "react";
import DetailsContext from "./DetailsContext";

const DetailsProvider = (props) => {
  const initialItem = localStorage.getItem('userDetails');
  const [details, setDetails] = useState(initialItem);

  const addDetails = (item) => {
    setDetails(item);
    localStorage.setItem('userDetails', item);
    setTimeout(() => {
      setDetails(null);
      localStorage.removeItem('userDetails');
    }, 300000);
  }

  const removeDetails = () => {
    setDetails(null);
    localStorage.removeItem('userDetails');
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