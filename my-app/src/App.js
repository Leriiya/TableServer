import React, { useState, useEffect } from "react";
import Table from "./table/table";
import Loader from "./loader/loader";
import DetailItem from "./detailRow/detailRow";
import UserServerData from "./hooks/userServerData";
import AddButton from "./addForm/addForm";

function App() {
  const url = "http://localhost:5000/tables";
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [directionSort, setDirectionSort] = useState(true);
  const [rowItem, setRowItem] = useState("");
  const [{ contactData, isLoading, setContactData, setIsLoading }, getData] =
    UserServerData({ url, isButtonClick });

  const detailRow = (row) => {
    return setRowItem(row);
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          contactData={contactData}
          setContactData={setContactData}
          setDirectionSort={setDirectionSort}
          directionSort={directionSort}
          // detailRow={detailRow}
        />
      )}
      <AddButton />
      <DetailItem detailItemData={rowItem} />
    </div>
  );
}

export default App;
