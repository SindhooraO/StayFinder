import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Home() {
  const [listings, setListings] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const scrollRefs = useRef({});

  const [inputFilters, setInputFilters] = useState({
    location: '',
    guests: '',
    checkin: '',
    checkout: ''
  });

  const [filters, setFilters] = useState({
    location: '',
    guests: '',
    checkin: '',
    checkout: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/listings')
      .then(res => setListings(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  const handleSearch = () => {
    if (inputFilters.checkin && inputFilters.checkout && inputFilters.checkin >= inputFilters.checkout) {
      alert("Checkout date must be after check-in date.");
      return;
    }
    setFilters({ ...inputFilters });
  };

  const calculateNights = (checkin, checkout) => {
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const diffTime = outDate - inDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredListings = listings.filter(listing => {
    const matchLocation =
      filters.location.trim() === '' ||
      listing.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchGuests =
      filters.guests.trim() === '' ||
      (!isNaN(filters.guests) && listing.maxGuests >= parseInt(filters.guests));

    return matchLocation && matchGuests;
  });

  const listingsByLocation = filteredListings.reduce((acc, listing) => {
    if (!acc[listing.location]) acc[listing.location] = [];
    acc[listing.location].push(listing);
    return acc;
  }, {});

  const today = new Date().toISOString().split("T")[0];

  const scroll = (location, direction) => {
    const el = scrollRefs.current[location];
    if (el) {
      el.scrollBy({ left: direction * 260, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Desktop Filter Bar */}
      <div className="hidden md:flex mx-auto w-full max-w-4xl bg-white rounded-full shadow-lg px-4 py-2 items-center justify-between gap-3 mb-8 border border-gray-200">
        <input
          type="text"
          placeholder="Search location"
          className="flex-1 min-w-[120px] px-4 py-2 rounded-full border border-gray-200"
          value={inputFilters.location}
          onChange={e => setInputFilters({ ...inputFilters, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Guests"
          className="w-24 px-4 py-2 rounded-full border border-gray-200"
          value={inputFilters.guests}
          onChange={e => setInputFilters({ ...inputFilters, guests: e.target.value })}
        />
        <input
          type="date"
          min={today}
          value={inputFilters.checkin}
          onChange={e => setInputFilters({ ...inputFilters, checkin: e.target.value })}
          className="min-w-[120px] px-4 py-2 rounded-full border border-gray-200"
        />
        <input
          type="date"
          min={inputFilters.checkin || today}
          value={inputFilters.checkout}
          onChange={e => setInputFilters({ ...inputFilters, checkout: e.target.value })}
          className="min-w-[120px] px-4 py-2 rounded-full border border-gray-200"
        />
        <button
          onClick={handleSearch}
          className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full"
        >
          <FaSearch />
        </button>
      </div>

      {/* Mobile Filter Bar - Step by Step */}
      <div className="md:hidden flex flex-col gap-4 bg-white p-4 rounded-xl shadow mb-8 border border-gray-200">
        {currentStep === 1 && (
          <input
            type="text"
            placeholder="Enter location"
            className="w-full px-4 py-2 border rounded-lg"
            value={inputFilters.location}
            onChange={(e) => setInputFilters({ ...inputFilters, location: e.target.value })}
          />
        )}
        {currentStep === 2 && (
          <input
            type="number"
            placeholder="Guests"
            className="w-full px-4 py-2 border rounded-lg"
            value={inputFilters.guests}
            onChange={(e) => setInputFilters({ ...inputFilters, guests: e.target.value })}
          />
        )}
        {currentStep === 3 && (
          <input
            type="date"
            min={today}
            value={inputFilters.checkin}
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setInputFilters({ ...inputFilters, checkin: e.target.value })}
          />
        )}
        {currentStep === 4 && (
          <input
            type="date"
            min={inputFilters.checkin || today}
            value={inputFilters.checkout}
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setInputFilters({ ...inputFilters, checkout: e.target.value })}
          />
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button onClick={() => setCurrentStep(currentStep - 1)} className="text-sm text-gray-600 underline">Back</button>
          )}
          {currentStep < 4 ? (
            <button onClick={() => setCurrentStep(currentStep + 1)} className="ml-auto bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg">Next</button>
          ) : (
            <button onClick={handleSearch} className="ml-auto bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg">Search</button>
          )}
        </div>
      </div>

      {/* Listings */}
      {Object.keys(listingsByLocation).length === 0 ? (
        <p className="text-center text-gray-500">No listings found for selected filters.</p>
      ) : (
        Object.keys(listingsByLocation).map(location => (
          <div key={location} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{location}</h2>
            <div className="relative">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow"
                onClick={() => scroll(location, -1)}
              >
                <IoIosArrowBack />
              </button>
              <div
                className="flex overflow-x-auto gap-6 pb-2 scroll-smooth"
                ref={el => (scrollRefs.current[location] = el)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {listingsByLocation[location].map(listing => {
                  const nights = (filters.checkin && filters.checkout)
                    ? calculateNights(filters.checkin, filters.checkout)
                    : 0;
                  const totalPrice = nights * listing.price;

                  return (
                   <Link
  to={`/listing/${listing._id}`}
  key={listing._id}
  className="w-[48%] md:min-w-[250px] md:max-w-[250px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0"
>

                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{listing.title}</h3>
                        <p className="text-sm text-gray-500">{listing.location}</p>
                        <p className="text-rose-600 font-bold mt-1">₹{listing.price}/night</p>
                        {nights > 0 && (
                          <p className="text-sm mt-1 text-gray-600">
                            {nights} night{nights > 1 ? 's' : ''} – Total: ₹{totalPrice}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow"
                onClick={() => scroll(location, 1)}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        ))
      )}

      {/* Hide scrollbar globally */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Home;
