import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listContents } from "../actions/contentActions";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "./CollectionPage.css";
import { ITEMS_PER_PAGE } from "../constants/contentConstants";
import SkeletonCard from "../components/SkeletonCard";
import { FiSearch } from "react-icons/fi";
import Slider from "@mui/material/Slider";

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
  const [displayedItems, setDisplayedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPricing, setSelectedPricing] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 999]);

  useEffect(() => {
    dispatch(listContents());
  }, [dispatch]);

  // Filter logic
  useEffect(() => {
    let filteredData = [...contents];

    if (selectedPricing.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedPricing.includes(item.pricingOption)
      );
    }

    if (selectedPricing.includes(0)) {
      filteredData = filteredData.filter(
        (item) =>
          item.pricingOption !== 0 ||
          (item.price >= priceRange[0] && item.price <= priceRange[1])
      );
    }

    if (search.trim().length >= 3) {
      filteredData = filteredData.filter(
        (item) =>
          item.creator.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredData);
    setDisplayedItems(filteredData.slice(0, ITEMS_PER_PAGE));
    setHasMore(filteredData.length > ITEMS_PER_PAGE);
  }, [contents, selectedPricing, search, priceRange]);

  const togglePricing = (value) => {
    setSelectedPricing((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedPricing([]);
    setPriceRange([0, 999]);
  };

  const fetchMoreData = () => {
    const nextItems = filtered.slice(
      displayedItems.length,
      displayedItems.length + ITEMS_PER_PAGE
    );

    setDisplayedItems((prev) => [...prev, ...nextItems]);

    if (displayedItems.length + nextItems.length >= filtered.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="collection-container">
      <div className="filters">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Find the items you're looking for"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="search-info">
            <span>
              <span>3</span> keyword search
            </span>
            <FiSearch className="icon" />
          </div>
          {search.trim().length > 0 && search.trim().length < 3 && (
            <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
              Please enter at least 3 characters to search
            </p>
          )}
        </div>

        <div className="checkbox-wrapper">
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

          {selectedPricing.includes(0) && (
            <div className="slider-container">
              <label style={{ marginBottom: "0.5rem", display: "block" }}>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={999}
                disableSwap
                sx={{ width: "100%", maxWidth: "300px" }}
              />
            </div>
          )}

          <button onClick={resetFilters}>Reset</button>
        </div>
      </div>
      {selectedPricing.includes(0) &&
        (selectedPricing.includes(1) || selectedPricing.includes(2)) && (
          <p
            style={{ fontSize: "0.85rem", color: "#666", marginTop: "-0.5rem", marginBottom: "0.5rem"  }}
          >
            *Price range only applies to Paid items
          </p>
        )}

      {loading ? (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="grid">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          }
        >
          <div className="grid">
            {displayedItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CollectionPage;
