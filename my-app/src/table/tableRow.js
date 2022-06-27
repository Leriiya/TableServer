import React from "react";
import Table from "./table";


const TableRow = ({detailRow, table}) => {
  return (
    <tr
      className="table_row"
      key={table.table_id + table.phone}
      onClick={() => {
        detailRow(table);
      }}
    >
      <td className="description">{table.description}</td>
      <td>{table.quantity}</td>
      <td>{table.price_one}</td>
      <td>{table.price_lot}</td>
      <td>{table.volume}</td>
      <td>{Math.floor((table.price_one / table.price_lot - 1) * 100)}</td>
      <td>{table.company}</td>
      <td>{table.phone}</td>

      <td>
        <button
          className="btn btn-danger table_delete"
          onClick={(e) => {
            Table.deleteTable(table.table_id);
            const row = e.target.parentNode.parentNode;
            row.remove();
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
