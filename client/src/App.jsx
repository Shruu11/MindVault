import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch items
  const fetchItems = () => {
    fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then(data => setItems(data));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = () => {
    fetch("http://localhost:5000/save-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setUrl("");
        fetchItems(); // 🔥 refresh list
      });
  };

  return (
    <div style={{
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px"
  }}>
      <h1>MindVault</h1>

      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br></br>

      <button onClick={handleSave}>Save</button>
      

      <input
  type="text"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <p>{message}</p>

      <h2>Saved Items</h2>
<ul>
  {items
    .filter(item =>
      item.url.toLowerCase().includes(search.toLowerCase())
    )
    .map(item => (
      <li key={item.id}>{item.url}</li>
    ))}
</ul>
    </div>
  );
}

export default App;