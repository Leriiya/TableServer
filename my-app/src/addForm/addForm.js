import React, { useState } from "react";
import "./addForm.css";

const AddButton = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price_one, setPriceone] = useState("");
  const [price_lot, setPricelot] = useState("");
  const [volume, setVolume] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description, quantity, price_one, price_lot, volume, company, phone };
      const response = await fetch("http://localhost:5000/tables", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      window.location = "/";

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h4>Добавить запчасть</h4>
      <form className="form_container" onSubmit={onSubmitForm}>
        <input
          className="input_form"
          type="text"
          name="description"
          required="required"
          placeholder="Введите запчасть"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="input_form"
          type="text"
          name="quantity"
          placeholder="ед.изм."
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          className="input_form"
          type="text"
          name="price_one"
          placeholder="цена розн"
          onChange={(e) => setPriceone(e.target.value)}
        />
        <input
          className="input_form"
          type="text"
          name="price_lot"
          placeholder="цена опт"
          onChange={(e) => setPricelot(e.target.value)}
        />
        <input
          className="input_form"
          type="text"
          name="volume"
          placeholder="объём опта"
          onChange={(e) => setVolume(e.target.value)}
        />
        <input
          className="input_form"
          type="text"
          name="company"
          placeholder="компания"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="input_form"
          type="text"
          name="phone"
          placeholder="телефон"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddButton;
