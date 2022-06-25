import React, { useEffect, useState } from "react";
import ArrowDown from "../svg/arrowDown";
import ArrowUp from "../svg/arrowUp";

const Table = (props) => {
  const directionSort = props.directionSort;

  const sortData = (field) => {
    const copyData = props.contactData.concat(); //копировали данные из массива

    let sortData;
    if (directionSort) {
      sortData = copyData.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });
    }
    sortData = copyData.reverse((a, b) => {
      return a[field] > b[field] ? 1 : -1;
    });

    props.setContactData(sortData);
    props.setDirectionSort(!directionSort);
    //console.log(directionSort)
  };

  const [fieldData, setFieldData] = useState("");

  const Arrow = () => {
    return directionSort ? <ArrowDown /> : <ArrowUp />;
  };

  const FieldSortData = (field) => {
    sortData(field);
    setFieldData(field);
  };
  //
  const [tables, setTables] = useState([]);

  const deleteTable = async id => {
    try {
      const deleteTable = await fetch(`http://localhost:5000/tables/${id}`, {
        method: "DELETE",
      });

      setTables(tables.filter(table => table.table_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTables = async () => {
    try {
      const response = await fetch("http://localhost:5000/tables");
      const jsonData = await response.json();

      setTables(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  console.log(tables);

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() => {
              FieldSortData("description");
            }}
          >
            Название {fieldData === "description" ? <Arrow /> : null}
          </th>
          <th
            onClick={() => {
              FieldSortData("quantity");
            }}
          >
            ед.изм. {fieldData === "quantity" ? <Arrow /> : null}
          </th>
          <th
            onClick={() => {
              FieldSortData("price_one");
            }}
          >
            цена розн. {fieldData === "price_one" ? <Arrow /> : null}
          </th>
          <th
            onClick={() => {
              FieldSortData("price_lot");
            }}
          >
            цена опт. {fieldData === "price_lot" ? <Arrow /> : null}
          </th>
          <th
            onClick={() => {
              FieldSortData("volume");
            }}
          >
            объём опта {fieldData === "volume" ? <Arrow /> : null}
          </th>
          <th
            onClick={() => {
              FieldSortData("company");
            }}
          >
            компания {fieldData === "company" ? <Arrow /> : null}
          </th>
          <th
            onClick={() => {
              FieldSortData("phone");
            }}
          >
            тел для заказа {fieldData === "phone" ? <Arrow /> : null}
          </th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {props.contactData.map((table) => (
          <tr
            key={table.table_id + table.phone}
            // onClick={() => {
            //   props.detailRow(table);
            // }}
          >
            <td>{table.description}</td>
            <td>{table.quantity}</td>
            <td>{table.price_one}</td>
            <td>{table.price_lot}</td>
            <td>{table.volume}</td>
            <td>{table.company}</td>
            <td>{table.phone}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteTable(table.table_id)}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
