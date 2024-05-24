import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessesThunk } from "../../redux/businesses";
import Businesses from "./Businesses";
import { FaSearch } from "react-icons/fa";
import { FaBreadSlice } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

import "./Businesses.css";

function AllBusinesses() {
  const dispatch = useDispatch();
  const businessList = useSelector(state => state.businesses?.Businesses?.businesses || []);
  const [searched, setSearched] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  // const [page, setPage] = useState(1);
  // const [size, setSize] = useState(4);

  // const fetchPage = async (page, size) => {
  //   const res = await fetch(`/api/bus?page=${page}&size=${size}`)
  //   const data = await res.json()
  //   console.log(data)
  //   if (res.ok) setFilteredList(data.businesses)
  //   return data
  // }pagination
  useEffect(() => {
    let list = businessList;
    if (categoryId) {
      list = list.filter(bus => bus.category_id == categoryId);
    }
    if (rating) {
      list = list.filter(bus => bus.rating >= rating);
    }
    if (price) {
      list = list.filter(bus => bus.price_range == price);
    }
    setFilteredList(list);
  }, [categoryId, rating, price, businessList]);

  useEffect(() => {
    if (searched.trim() == '') setFilteredList(businessList)
  }, [searched, businessList])


  useEffect(() => {
    dispatch(getAllBusinessesThunk())//add page and size if paginating
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  // useEffect(() => {
  //   setFilteredList(businessList);
  // }, [businessList]);

  // const nextPage = () => {
  //   setPage(prevPage => prevPage + 1)
  // }
  // const previousPage = () => {
  //   setPage(prevPage => prevPage - 1)
  // }

  // const changeSize = (newSize) => {
  //   setSize(newSize);
  // } PAGINATION FOR FUTURE
  const handleSearch = () => {
    let filtered = businessList;

    if (searched.trim() !== '') {
      filtered = filtered.filter(bus =>
        bus.name.toLowerCase().includes(searched.toLowerCase()) ||
        bus.description.toLowerCase().includes(searched.toLowerCase())
      );
    }

    if (categoryId) {
      filtered = filtered.filter(bus => bus.category_id == categoryId);
    }
    if (rating) {
      filtered = filtered.filter(bus => bus.rating >= rating);
    }
    if (price) {
      filtered = filtered.filter(bus => bus.price_range >= price);
    }
    setFilteredList(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const searchBar = (
    <div className="search-bar">
      <input
        type="search"
        style={{ border: "none" }}
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search for businesses"
        id="search-bar-itself"
      />
      <div id="search-icon">
        <FaSearch id="search-icon-itself" onClick={handleSearch} />
      </div>
    </div>
  );

  return isLoaded ? (
    <div className="all-bus-page">
      <div className="search-container">
        <p className="searchTitle">Search for businesses</p>
        {searchBar}
      </div>
      <div className="container-filter-bus">
        <div className="filter-container">
          <p className="filter-title-main">Filters</p>
          <div className="filters category">
            <p className="filter-title">Categories :</p>
            <div className="name-val">
              <p className="filter-title-icon">Bakery <FaBreadSlice /></p>
              <input
                type="checkbox"
                value={1}
                checked={1 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">Restaurant <FaBowlFood /></p>
              <input
                type="checkbox"
                value={2}
                checked={2 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">Cafe <FaCoffee /></p>
              <input
                type="checkbox"
                value={3}
                checked={3 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">Store <FaStore /></p>
              <input
                type="checkbox"
                value={4}
                checked={4 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
          </div>
          <div className="filters price">
            <p className="filter-title">Price Range  :</p>
            <div className="name-val">
              <p className="filter-title-icon">(0 - 15 USD) <span className="span-dollar">$</span></p>
              <input
                type="checkbox"
                value="Low"
                checked={"Low" == price}
                onChange={(e) => setPrice(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">(15 - 40 USD <span className="span-dollar">$$</span></p>
              <input
                type="checkbox"
                value="Medium"
                checked={"Medium" == price}
                onChange={(e) => setPrice(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon"> (40+ USD) <span className="span-dollar">$$$</span></p>
              <input
                type="checkbox"
                value="High"
                checked={"High" == price}
                onChange={(e) => setPrice(e.target.checked ? e.target.value : '')}
              />
            </div>
          </div>
          <div className="filters rating">
            <p className="filter-title">Star Rating :</p>
            <div className="name-val">
              <p className="filter-title-icon">1 Star & Up <FaStar style={{ color: "#B90000" }} /></p>
              <input
                type="checkbox"
                value={1}
                checked={1 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">2 Stars & Up <FaStar style={{ color: "#B95F00" }} /></p>
              <input
                type="checkbox"
                value={2}
                checked={2 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">3 Stars & Up <FaStar style={{ color: "#8A9300" }} /></p>
              <input
                type="checkbox"
                value={3}
                checked={3 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p className="filter-title-icon">4 Stars & Up <FaStar style={{ color: "green" }} /></p>
              <input
                type="checkbox"
                value={4}
                checked={4 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
          </div>
        </div>
        <div className="bus-container">
          <p id="all-results">All Results</p>
          {filteredList.length > 0 ? filteredList.map(business => (
            <Businesses key={business.id} business={business} />
          )) : <h1> No Results Found</h1>}
          {/* <div className="pagination-controls">
            <button onClick={previousPage} disabled={page === 1}>Previous</button> PAGGGINATIONNN
            <span>Page {page}</span>
            <button onClick={nextPage}>Next</button>
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default AllBusinesses;
