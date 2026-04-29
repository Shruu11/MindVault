const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/mindvault")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
  url: String,
});

const Item = mongoose.model("Item", itemSchema);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MindVault API is running 🚀");
});

// Save API
app.post("/save-item", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const newItem = new Item({ url });
    await newItem.save();

    res.json({
      message: "Item saved successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving item" });
  }
});

// GET API
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});