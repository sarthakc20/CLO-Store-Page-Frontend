import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listContents } from "../actions/contentActions";
import ProductCard from "../components/ProductCard";
import "./CollectionPage.css";

const pricingLabels = {
  0: "Paid",
  1: "Free",
  2: "View Only",
};

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { loading, error, contents } = useSelector(
    (state) => state.contentList
  );

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPricing, setSelectedPricing] = useState([]);

  // Load data from Redux when the component mounts
  useEffect(() => {
    dispatch(listContents());
  }, [dispatch]);

  // Filter content every time the filters or Redux data change
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
          item.creator.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredData);
  }, [contents, selectedPricing, search]);

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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="grid">
          {filtered.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
