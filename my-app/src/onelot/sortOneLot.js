import React, { useEffect, useState } from "react";


const lotOneSortDirection = props.lotOneSortDirection;

  const sortOneLot = (one, lot) => {
    const copyData = props.contactData.concat(); //копировали данные из массива

    let sortData;
    if (lotOneSortDirection) {
      sortData = copyData.sort((a, b) => {
        return a[lot] / a[one] > b[lot] / b[one] ? 1 : -1;
      });
    }
    sortData = copyData.reverse((a, b) => {
      return a[lot] / a[one] > b[lot] / b[one] ? 1 : -1;
    });

    props.setContactData(sortData);
    props.setlotOneSortDirection(!lotOneSortDirection);
  };