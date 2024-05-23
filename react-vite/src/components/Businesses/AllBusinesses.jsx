import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessesThunk } from "../../redux/businesses";
import Businesses from "./Businesses";
import { FaSearch } from "react-icons/fa";

function AllBusinesses() {
  const dispatch = useDispatch();
  const businessList = useSelector(state => state.businesses?.Businesses?.businesses || []);
  const [searched, setSearched] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    dispatch(getAllBusinessesThunk())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(businessList);
  }, [businessList]);

  const handleSearch = () => {
    if (searched.trim() === '') {
      setFilteredList(businessList);
    } else {
      const filtered = businessList.filter(bus =>
        bus.name.toLowerCase().includes(searched.toLowerCase()) ||
        bus.description.toLowerCase().includes(searched.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const searchBar = (
    <div className="search-bar">
      <input
        type="search"
        style={{ border: "none" }}
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
      />
      <FaSearch onClick={handleSearch} />
    </div>
  );

  return isLoaded ? (
    <div>
      <p className="searchTitle"> Search for businesses</p>
      {searchBar}
      <div>All Results</div>
      <div>
        {filteredList.map(business => (
          <Businesses key={business.id} business={business} />
        ))}
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
