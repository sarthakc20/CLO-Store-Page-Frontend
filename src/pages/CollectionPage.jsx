import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listContents } from "../actions/contentActions";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "./CollectionPage.css";
import { ITEMS_PER_PAGE } from "../constants/contentConstants";
import SkeletonCard from "../components/SkeletonCard";

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

    if (search.trim()) {
      filteredData = filteredData.filter(
        (item) =>
          item.creator.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredData);
    setDisplayedItems(filteredData.slice(0, ITEMS_PER_PAGE));
    setHasMore(filteredData.length > ITEMS_PER_PAGE);
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
        <input
          type="text"
          placeholder="Find the items you're looking for"
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
