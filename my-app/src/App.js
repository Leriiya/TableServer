import React, { useState, useEffect } from "react";
import Table from "./table/table";
import Loader from "./loader/loader";
import DetailItem from "./detailRow/detailRow";
import UserServerData from "./hooks/userServerData";
import AddButton from "./addForm/addForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const url = "http://localhost:5000/tables";
  const [directionSort, setDirectionSort] = useState(true);
  const [lotOneSortDirection, setlotOneSortDirection] = useState(true);
  const [rowItem, setRowItem] = useState("");
  const [{ contactData, isLoading, setContactData }] =
    UserServerData({ url });

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
                  lotOneSortDirection={lotOneSortDirection}
                  setlotOneSortDirection={setlotOneSortDirection}
                  detailRow={detailRow}
                />
             
      )}
      <AddButton detailRow={detailRow} />
      <DetailItem detailItemData={rowItem} />
    </div>
  );
}

export default App;
