import React, { useEffect, useState } from "react";
import "./CollectionPage.css";

const dummyData = [
  {
    id: 1,
    photo: "https://via.placeholder.com/150",
    username: "Anisha Roy",
    title: "Photography Tips",
    pricingOption: 0, // Paid
    price: 49,
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/150",
    username: "John Doe",
    title: "React Basics",
    pricingOption: 1, // Free
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/150",
    username: "Emily Smith",
    title: "Design Portfolio",
    pricingOption: 2, // View Only
  },
  {
    id: 4,
    photo: "https://via.placeholder.com/150",
    username: "Anisha Roy",
    title: "Advanced JavaScript",
    pricingOption: 0,
    price: 99,
  },
];

const pricingLabels = {
  0: "Paid",
  1: "Free",
  2: "View Only",
};

const CollectionPage = () => {
  const [contents, setContents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPricing, setSelectedPricing] = useState([]);

  useEffect(() => {
    setContents(dummyData);
    setFiltered(dummyData);
  }, []);

  useEffect(() => {
    let filteredData = [...contents];

    if (selectedPricing.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedPricing.includes(item.pricingOption)
      );
    }

    if (search.trim()) {
      filteredData = filteredData.filter(
        (item) =>
          item.username.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredData);
  }, [selectedPricing, search, contents]);

  const togglePricing = (value) => {
    setSelectedPricing((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedPricing([]);
  };

  return (
    <div className="collection-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="checkboxes">
          {Object.entries(pricingLabels).map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={selectedPricing.includes(Number(key))}
                onChange={() => togglePricing(Number(key))}
              />
              {label}
            </label>
          ))}
        </div>

        <button onClick={resetFilters}>Reset</button>
      </div>

      <div className="grid">
        {filtered.map((item) => (
          <div key={item.id} className="card">
            <img src={item.photo} alt={item.title} />
            <div className="info">
              <h3>{item.title}</h3>
              <p>{item.username}</p>
              <p>
                {pricingLabels[item.pricingOption]}
                {item.pricingOption === 0 && item.price
                  ? ` - $${item.price}`
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
