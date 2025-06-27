const mongoose = require('mongoose');
const Listing = require('./models/Listing');

mongoose.connect('mongodb://localhost:27017/stayfinder');

const listings = [
  {
    title: "Beachside Villa",
    location: "Goa",
    price: 2500,
    maxGuests: 4,
    images:["https://www.luxuryvillasstay.com/wp-content/uploads/2019/01/bedroom-3.jpg",
        "https://www.luxuryvillasstay.com/wp-content/uploads/2019/01/pool-1.jpg",
        "https://www.luxuryvillasstay.com/wp-content/uploads/2019/01/hall-1.jpg",
    ],
    description: "A luxurious beachside villa in Goa."
  },
  {
    title: "Hilltop Cabin",
    location: "Manali",
    price: 1800,
    maxGuests: 3,
    images:["https://fabvenues.s3.amazonaws.com/uploads/1666078342951339.jpeg",
       "https://th.bing.com/th/id/OIP.Y-C0dWOWHcYNhZLcPmwBhgHaFj?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
       "https://fabvenues.s3.amazonaws.com/uploads/1666078354195224.jpeg", 
    ],
    description: "Scenic mountain stay in Manali."
  },
  {
    title: "City Loft",
    location: "Bangalore",
    price: 2000,
    maxGuests: 2,
    images:[
        "https://modeloft.fr/wp-content/uploads/2016/08/loft-jardin-bangalore-inde-une.jpg",
        "https://th.bing.com/th/id/OIP.mCOnsauz2lLMMCHWttgQ-AHaEz?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
        "https://modeloft.fr/wp-content/uploads/2016/08/loft-jardin-bangalore-inde-10.jpg",
    ],
    description: "Modern loft in Bangalore’s downtown."
  },
  {
    title: "Goa Bungalow",
    location: "Goa",
    price: 1700,
    maxGuests: 5,
    images: [
        "https://media.cntraveller.in/wp-content/uploads/2018/05/Goa-Bungalow--866x487.jpg",
        "https://assets.cntraveller.in/photos/60ba1198e341ff812178e2c2/master/w_1600,c_limit/Goa-Bungalow-1.jpg",
        "https://assets.cntraveller.in/photos/60ba11970f3a5367ec9fdf2c/master/w_1600,c_limit/Goa-Bungalow-2.jpg"
      ],
    description: "Family-friendly bungalow near the beach."
  },
  {
    title: "Palm Grove Stay",
    location: "Goa",
    price: 1900,
    maxGuests: 4,
    images: [
      "https://www.keralatourism.org/images/service-providers/photos/property-3317-Exterior-7640-20180720171143.jpg",
      "https://www.keralatourism.org/images/service-providers/photos/property-3317-Facilities-7642-20180720171201.jpg",
      "https://www.keralatourism.org/images/service-providers/photos/property-3317-profile-7637-20180720171053.jpg"
    ],
    description: "Peaceful stay amidst palm trees."
  },
  {
    title: "Portuguese Heritage Home",
    location: "Goa",
    price: 2200,
    maxGuests: 3,
    images: [
      "https://www.tripsavvy.com/thmb/93IuVYfYDkJ6HlGps1v2ICAISpY=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-148593157-1--591aaf515f9b58f4c07e8c87.jpg",
      "https://tse1.mm.bing.net/th/id/OIP.O4ASGHYjjEPJkuTLXuaitgHaE2?r=0&pid=ImgDet&w=474&h=310&rs=1&cb=idpwebp2&o=7&rm=3",
      "https://tse2.mm.bing.net/th/id/OIP.T1J47Nc1-7g1Q54gALQYSAHaE5?r=0&pid=ImgDet&w=474&h=313&rs=1&cb=idpwebp2&o=7&rm=3"
    ],
    description: "A charming Portuguese home near the beach."
  },
  {
    title: "Seaside Cottage",
    location: "Goa",
    price: 2100,
    maxGuests: 4,
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.WNvFKOC9gmsu-lmqlyMx8wHaEK?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      "https://tse4.mm.bing.net/th/id/OIP.t-OTzFdRtXL1nROM_Qf0TAHaEK?r=0&pid=ImgDet&w=474&h=266&rs=1&cb=idpwebp2&o=7&rm=3",
      "https://tse2.mm.bing.net/th/id/OIP.f2p6xZChG1SuJpQbDXlHgAHaEK?r=0&pid=ImgDet&w=474&h=266&rs=1&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Relaxing cottage steps away from the beach."
  },
  {
    title: "Lagoon House",
    location: "Goa",
    price: 2300,
    maxGuests: 5,
    images: [
      "https://cdn.tatlerasia.com/tatlerasia/i/2022/12/04205311-befunky-2022-11-0-20-52-53_cover_1500x1000.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.bbqk0pPdLVDHBOgc3bmpMwHaE8?r=0&pid=ImgDet&w=474&h=316&rs=1&cb=idpwebp2&o=7&rm=3",
      "https://tse2.mm.bing.net/th/id/OIP.lgnFLITeZ01APkSC1IpU5QHaE8?r=0&pid=ImgDet&w=60&h=60&c=7&dpr=1.5&rs=1&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Private house beside a serene lagoon."
  },

  {
    title: "Snow View Chalet",
    location: "Manali",
    price: 2400,
    maxGuests: 4,
    images: [
      "https://res.cloudinary.com/purnesh/image/upload/w_1000,f_auto,q_auto:eco,c_limit/chalet-03.jpg",
      "https://tse1.mm.bing.net/th/id/OIP.w_VEZdv87Pqo111kHKHGrAHaE7?r=0&pid=ImgDet&w=474&h=315&rs=1&cb=idpwebp2&o=7&rm=3",
      "https://tse3.mm.bing.net/th/id/OIP.2p9zJQAB3u6kwcFSwW-86wHaE7?r=0&pid=ImgDet&w=474&h=315&rs=1&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Chalet with stunning snow-capped views."
  },
  {
    title: "Woodland Retreat",
    location: "Manali",
    price: 2000,
    maxGuests: 3,
    images: [
      "https://www.indovacations.net/hotels/images1/AppleBudCottages-Manali13.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.O_p0fZxWO7AVnTXoEQO_zAHaE8?r=0&pid=ImgDet&w=60&h=60&c=7&dpr=1.5&rs=1&cb=idpwebp2&o=7&rm=3",
      "https://tse2.mm.bing.net/th/id/OIP.DJjqfjjP0ZERuS3wEfiPXwHaE8?r=0&pid=ImgDet&w=60&h=60&c=7&dpr=1.5&rs=1&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Wooden cottage surrounded by pine trees."
  },
  {
    title: "Apple Orchard House",
    location: "Manali",
    price: 2100,
    maxGuests: 4,
    images: [
      "https://tse4.mm.bing.net/th/id/OIP.rCqH4o6J9J4czoACfHzgeQHaE8?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      "https://pix10.agoda.net/hotelImages/agoda-homes/9346681/7b5cd666736716e7276f6eba86d5b4c6.jpg?s=1024x768",
      "https://tse3.mm.bing.net/th/id/OIP.IZv8hYPcsKVhmTrbaUGyEgHaE8?r=0&pid=ImgDet&w=178&h=118&c=7&dpr=1.5&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Stay in a house surrounded by apple orchards."
  },
  {
    title: "Riverfront Camp",
    location: "Manali",
    price: 1600,
    maxGuests: 2,
    images: [
      "https://d26dp53kz39178.cloudfront.net/media/uploads/products/Camping-32_znlcDsh.jpg",
      "https://image.freepik.com/free-photo/adventures-camping-tourism-tent-pine-forest-with-reflection-water-mor_51195-3180.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.cWHebY2DQStioHOZ5o8wpQHaE7?r=0&w=626&h=417&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Tented camp stay near the river."
  },
  {
    title: "Mountain View Resort",
    location: "Manali",
    price: 2300,
    maxGuests: 4,
    images: [
      "https://www.travelcharacter.com/wp-content/uploads/2022/12/Mountain-View-Ride-Inn-Cafe-Resort-768x427.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.-4v0kBZLKw8Hx1WTAK_hewHaEH?r=0&pid=ImgDet&w=60&h=60&c=7&dpr=1.5&rs=1&cb=idpwebp2&o=7&rm=3",
      "https://tse3.mm.bing.net/th/id/OIP.uYIcijC7quwqixmzUAG_LQHaEH?r=0&pid=ImgDet&w=60&h=60&c=7&dpr=1.5&rs=1&cb=idpwebp2&o=7&rm=3"
    ],
    description: "Elegant resort with panoramic views."
  },

];

Listing.insertMany(listings).then(() => {
  console.log("Seeded listings.");
  mongoose.connection.close();
});
