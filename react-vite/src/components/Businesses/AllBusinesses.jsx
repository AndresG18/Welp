import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessesThunk } from "../../redux/businesses";
import Businesses from "./Businesses";
import { FaSearch } from "react-icons/fa";
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
  const handleSearch = (e) => {
    e.preventDefault();
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

  const searchBar = (
    <div className="search-bar">
      <input
        type="search"
        style={{ border: "none" }}
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
        placeholder="Search for businesses"
      />
      <FaSearch onClick={handleSearch} />
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
          <p className="filter-title">Filters</p>
          <div className="filters category">
            <p>Categories :</p>
            <div className="name-val">
              <p>Bakery</p>
              <input
                type="checkbox"
                value={1}
                checked={1 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>Restaurant</p>
              <input
                type="checkbox"
                value={2}
                checked={2 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>Cafe</p>
              <input
                type="checkbox"
                value={3}
                checked={3 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>Store</p>
              <input
                type="checkbox"
                value={4}
                checked={4 == categoryId}
                onChange={(e) => setCategoryId(e.target.checked ? e.target.value : '')}
              />
            </div>
          </div>
          <div className="filters price">
            <p>Price Range  :</p>
            <div className="name-val">
              <p>$ (0 - 15 USD)</p>
              <input
                type="checkbox"
                value="Low"
                checked={"Low" == price}
                onChange={(e) => setPrice(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>$$ (15 - 40 USD)</p>
              <input
                type="checkbox"
                value="Medium"
                checked={"Medium" == price}
                onChange={(e) => setPrice(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>$$$ (40+ USD)</p>
              <input
                type="checkbox"
                value="High"
                checked={"High" == price}
                onChange={(e) => setPrice(e.target.checked ? e.target.value : '')}
              />
            </div>
          </div>
          <div className="filters rating">
            <p>Star Rating :</p>
            <div className="name-val">
              <p>1 Star & Up</p>
              <input
                type="checkbox"
                value={1}
                checked={1 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>2 Stars & Up</p>
              <input
                type="checkbox"
                value={2}
                checked={2 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>3 Stars & Up</p>
              <input
                type="checkbox"
                value={3}
                checked={3 == rating}
                onChange={(e) => setRating(e.target.checked ? e.target.value : '')}
              />
            </div>
            <div className="name-val">
              <p>4 Stars & Up</p>
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
          <p>All Results</p>
          {filteredList.map(business => (
            <Businesses key={business.id} business={business} />
          ))}
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
