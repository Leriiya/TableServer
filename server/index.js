const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//create todo
app.post("/tables", async (req, res) => {
  try {
    // console.log(req.body)
    const { description, quantity, price_one, price_lot, volume, company, phone } = req.body;
    const newTables = await pool.query(
      "INSERT INTO mytable (description, quantity, price_one, price_lot, volume, company, phone) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      [description, quantity, price_one, price_lot, volume, company, phone]
    );

    res.json(newTables);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/tables", async (req, res) => {
  try {
    const allTables = await pool.query("SELECT * FROM mytable");
    res.json(allTables.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/tables/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table = await pool.query(
      "SELECT * FROM mytable WHERE table_id = $1",
      [id]
    );

    res.json(table.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/tables/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, quantity, price_one, price_lot, volume, company, phone } = req.body;
    const updateTable = await pool.query(
      "UPDATE mytable SET (description, quantity, price_one, price_lot, volume, company, phone) = ($1, $2, $3, $4, $5, $6, $7) WHERE table_id = $8",
      [description, quantity, price_one, price_lot, volume, company, phone, id]
    );

    res.json("Table was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/tables/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTable = await pool.query("DELETE FROM mytable WHERE table_id = $1",
    [id]);

    res.json("Todo was deleted")
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("start");
});
