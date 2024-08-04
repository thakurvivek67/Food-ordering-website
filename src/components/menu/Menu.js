import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Menu.css";
import Navbar from "../navbar/Navbar";

const Menu = () => {
  const [name, setName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("appetizer");
  const [amount, setAmount] = useState("");
  const [img, setImg] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  // Fetch menu items from the API on component mount
  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-472a5-default-rtdb.firebaseio.com/menu.json"
        );
        const data = response.data;
        if (data) {
          const items = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setMenuList(items);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuList();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (name && ingredients && category && amount && img && uniqueId) {
      const item = {
        name,
        uniqueId,
        ingredients,
        category,
        amount,
        img,
      };

      try {
        if (editingItemId) {
          // Update existing menu item
          await axios.put(
            `https://restaurant-472a5-default-rtdb.firebaseio.com/menu/${editingItemId}.json`,
            item
          );

          setMenuList((prevItems) =>
            prevItems.map((menuItem) =>
              menuItem.id === editingItemId
                ? { ...menuItem, ...item }
                : menuItem
            )
          );

          setEditingItemId(null);
        } else {
          // Add new menu item
          const response = await axios.post(
            `https://restaurant-472a5-default-rtdb.firebaseio.com/menu.json`,
            item
          );

          if (response.status === 200) {
            setMenuList((prevItems) => [
              {
                id: response.data.name,
                ...item,
              },
              ...prevItems,
            ]);
          }
        }

        // Clear form fields
        setName("");
        setIngredients("");
        setCategory("appetizer");
        setAmount("");
        setImg("");
        setUniqueId("");
      } catch (error) {
        console.error("Error saving menu item:", error);
      }
    } else {
      alert("Please enter all details.");
    }
  };

  const handleEditClick = (id) => {
    const menuToEdit = menuList.find((item) => item.id === id);
    if (menuToEdit) {
      setName(menuToEdit.name);
      setIngredients(menuToEdit.ingredients);
      setCategory(menuToEdit.category);
      setAmount(menuToEdit.amount);
      setImg(menuToEdit.img);
      setEditingItemId(id);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `https://restaurant-472a5-default-rtdb.firebaseio.com/menu/${id}.json`
      );
      setMenuList((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleFormSubmit} className="form">
          <label htmlFor="ID" className="label">
            Uniqe id
          </label>
          <input
            id="ID"
            type="number"
            className="input"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            required
          />
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="category" className="label">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select"
          >
            <option value="appetizer" className="option">
              Appetizer
            </option>
            <option value="main courses" className="option">
              Main Courses
            </option>
            <option value="desserts" className="option">
              Desserts
            </option>
          </select>

          <label htmlFor="ingredients" className="label">
            Ingredients
          </label>
          <input
            id="ingredients"
            type="text"
            className="input"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />

          <label htmlFor="amount" className="label">
            Price
          </label>
          <input
            id="amount"
            type="number"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label htmlFor="img" className="label">
            Image URL
          </label>
          <input
            id="img"
            type="url"
            className="input"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />

          <button type="submit" className="btn-m">
            Submit
          </button>
        </form>
      </div>

      <h3 className="heading-list">Menu</h3>
      <div className="list-container">
        <ul>
          {menuList.map((item) => (
            <li key={item.id} className="list">
              <div className="image-container">
                <img src={item.img} alt={item.name} className="item-image" />
              </div>

              <p className="value">{`UniqueId: ${item.uniqueId}`}</p>
              <p className="value">{`Name: ${item.name}`}</p>
              <p className="value">{`Category: ${item.category}`}</p>
              <p className="value">{`Ingredients: ${item.ingredients}`}</p>
              <p className="value">{`Amount: ${item.amount}`}</p>

              <div>
                <button
                  className="edit"
                  onClick={() => handleEditClick(item.id)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
