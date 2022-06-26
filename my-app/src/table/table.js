import React, { useEffect, useState } from "react";
import ArrowDown from "../svg/arrowDown";
import ArrowUp from "../svg/arrowUp";
import "./table.css";

const Table = (props) => {
  const directionSort = props.directionSort;
  // const lotOneSortDirection = props.lotOneSortDirection;

  //сортировка сумма опта и розницы по убыванию
  const sortOnePlusLot = (field) => {
    const copyData = props.contactData.concat();
    let sortOnePlusLot;
    if (directionSort) {
      sortOnePlusLot = copyData.sort((a, b) => {
        const attitude1 = a.price_one + a.price_lot;
        const attitude2 = b.price_one + b.price_lot;
        return attitude2 - attitude1;
      });
    }
    sortOnePlusLot = copyData.reverse((a, b) => {
      const attitude1 = a.price_one + a.price_lot;
      const attitude2 = b.price_one + b.price_lot;
      return attitude2 - attitude1;
    });
    props.setContactData(sortOnePlusLot);
    props.setDirectionSort(!directionSort);
  };

  //сортировка По отношению
  const sortOneLot = () => {
    const copyData = props.contactData.concat(); //копировали данные из массива
    console.log("sortonelot")
    let sortOneLot;
    if (directionSort) {
      sortOneLot = copyData.sort((a, b) => {
        const attitude1 = a.price_one / a.price_lot;
        const attitude2 = b.price_one / b.price_lot;
        return attitude2 - attitude1;
      });
    }
    sortOneLot = copyData.reverse((a, b) => {
      const attitude1 = a.price_one / a.price_lot;
      const attitude2 = b.price_one / b.price_lot;
      return attitude2 - attitude1;
    });

    props.setContactData(sortOneLot);
    props.setDirectionSort(!directionSort);
  };

  //сортировка по цене
  const sortData = (field) => {
    const copyData = props.contactData.concat(); //копировали данные из массива
    let sortData;
    console.log(directionSort)
    sortData = copyData.sort((a, b) => {
      return a[field] > b[field] ? 1 : -1;
    });
    if (directionSort) {
      sortData = copyData.reverse((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });
    }
    
    
    props.setContactData(sortData);
    props.setDirectionSort(!directionSort);
  };

  const [fieldData, setFieldData] = useState("");

  const Arrow = () => {
    return directionSort ? <ArrowDown /> : <ArrowUp />;
  };

  const FieldSortData = (field) => {
    sortData(field);
    setFieldData(field);
  };
  
  const OneLotSort = () => {
    sortOneLot();
    setFieldData()
  }
  //
  const [tables, setTables] = useState([]);

  const deleteTable = async (id) => {
    try {
      const deleteTable = await fetch(`http://localhost:5000/tables/${id}`, {
        method: "DELETE",
      });

      setTables(tables.filter((table) => table.table_id !== id));
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
    <div>
      <button title="процентное соотношение"
        className="btn btn-success"
        onClick={() => {
          OneLotSort();
        }}
      >
        разница/опт{" "}
        {fieldData === "price_one" && "price_lot" ? <Arrow /> : null}
      </button>
      <button
        className="btn btn-success"
        onClick={() => {
          FieldSortData("price_one", "price_lot");
        }}
      >
        опт+розница{" "}
        {fieldData === "price_one" && "price_lot" ? <Arrow /> : null}
      </button>

      <table className="table">
        <thead>
          <tr>
            <th title="А-Я"
              className="description"
              onClick={() => {
                FieldSortData("description");
              }}
            >
              Название {fieldData === "description" ? <Arrow /> : null}
            </th>
            <th
              className="description"
              onClick={() => {
                FieldSortData("quantity");
              }}
            >
              ед.изм. {fieldData === "quantity" ? <Arrow /> : null}
            </th>
            <th
              className="description"
              onClick={() => {
                FieldSortData("price_one");
              }}
            >
              цена розн. {fieldData === "price_one" ? <Arrow /> : null}
            </th>
            <th
              className="description"
              onClick={() => {
                FieldSortData("price_lot");
              }}
            >
              цена опт. {fieldData === "price_lot" ? <Arrow /> : null}
            </th>
            <th
            className="description"
              onClick={() => {
                FieldSortData("volume");
              }}
            >
              объём опта {fieldData === "volume" ? <Arrow /> : null}
            </th>
            <th
            className="description"
              onClick={() => {
                FieldSortData("company");
              }}
            >
              компания {fieldData === "company" ? <Arrow /> : null}
            </th>
            <th
            className="description"
              onClick={() => {
                FieldSortData("phone");
              }}
            >
              тел для заказа {fieldData === "phone" ? <Arrow /> : null}
            </th>
            <th 
            title="розница/опт">%</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {props.contactData.map((table) => (
            <tr className="table_row"
              key={table.table_id + table.phone}
              onClick={() => {
                props.detailRow(table);
              }}
            >
              <td className="description">{table.description}</td>
              <td>{table.quantity}</td>
              <td>{table.price_one}</td>
              <td>{table.price_lot}</td>
              <td>{table.volume}</td>
              <td>{table.company}</td>
              <td>{table.phone}</td>
              <td></td>
              <td>
                <button
                  className="btn btn-danger table_delete"
                  onClick={(e) => {
                    deleteTable(table.table_id);
                    const row = e.target.parentNode.parentNode;
                    row.remove();
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
