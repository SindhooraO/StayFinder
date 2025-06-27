import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoginModal from '../components/LoginModal';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get(`http://localhost:5000/api/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => console.error("Listing fetch error:", err));
  }, [id]);

  const calculateNights = () => {
    if (!checkin || !checkout) return 0;
    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const diffTime = outDate - inDate;
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  const handleReserve = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLogin(true);
      return;
    }

    const nights = calculateNights();
    if (!checkin || !checkout || guests < 1 || nights <= 0) {
      alert("❌ Please select valid check-in and check-out dates.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        listingId: id,
        checkIn: checkin,
        checkOut: checkout,
        guests,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`✅ Booking confirmed for ${nights} night(s) with ${guests} guest(s)!`);
      setCheckin("");
      setCheckout("");
      setGuests(1);
    } catch (err) {
      alert("❌ Booking failed. Please try again.");
      console.error(err);
    }
  };

  if (!listing) return <div className="text-center mt-20">Loading...</div>;

  const nights = calculateNights();
  const total = nights * listing.price;

  return (
    <>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onOpenRegister={() => {
          setShowLogin(false);
          alert("Redirect to register modal not supported here. Use navbar.");
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
          <p className="text-gray-600 mb-3">{listing.location}</p>
          <p className="text-rose-600 font-semibold mb-4">
            ₹{listing.price}/night • Max Guests: {listing.maxGuests}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {listing.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Stay ${idx}`}
                className="rounded-lg object-cover w-full h-52"
              />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About this stay</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-6 shadow-md sticky top-20 h-fit">
          <div className="text-xl font-semibold mb-4">
            <span className="text-gray-900">₹{listing.price}</span>
            <span className="text-gray-500 font-normal text-sm"> / night</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className="text-xs text-gray-500">CHECK-IN</label>
              <input
                type="date"
                className="w-full border rounded-lg px-2 py-2"
                min={today}
                value={checkin}
                onChange={e => setCheckin(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">CHECK-OUT</label>
              <input
                type="date"
                className="w-full border rounded-lg px-2 py-2"
                min={checkin || today}
                value={checkout}
                onChange={e => setCheckout(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-500">GUESTS</label>
            <select
              className="w-full border rounded-lg px-2 py-2"
              value={guests}
              onChange={e => setGuests(parseInt(e.target.value))}
            >
              {[...Array(listing.maxGuests).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} guest{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReserve}
            className="bg-rose-500 hover:bg-rose-600 w-full py-3 text-white font-bold rounded-lg mb-2"
          >
            Reserve
          </button>
          <p className="text-center text-xs text-gray-500">You won't be charged yet</p>

          {nights > 0 && (
            <div className="border-t mt-4 pt-4">
              <p className="text-sm text-gray-700">{nights} night(s)</p>
              <p className="font-semibold">Total: ₹{total}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListingDetails;