const stays = [
  {
    "_id": "s101",
    "name": "Unikt designat ekologiskt naturhus, off-grid",
    "type": "House",
    "imgUrls": ["../assets/img/s101/0.jpg", "../assets/img/s101/1.jpg","../assets/img/s101/2.jpg","../assets/img/s101/3.jpg"],
    "price": 327,
    "summary": "Welcome to the future's house, off-grid with its own energy and food production. One of the world's most environmentally friendly and sustainable houses. Here you can enjoy a wax house garden with Mediterranean plants. On a mountain lake with mile-wide views of Lake Vänern, the house is close to the beach, boat harbor and beautiful nature nearby.",
    "capacity": 8,
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics"
    ],
    "labels": [
      "Top of the world",
      "Trending",
      "Play",
      "Tropical"
    ],
    "host": {
      "_id": "u101",
      "fullname": "Davit Pok",
      "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    },
    "loc": {
      "country": "Sweden",
      "countryCode": "SE",
      "city": "Brålanda",
      "address": "Västra Götalands län",
      "lat": 62,
      "lng": 15
    },
    "reviews": [
      {
        "id": "madeId",
        "txt": "Very helpful hosts. Cooked traditional...",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "/img/img2.jpg"
        }
      }
    ],
    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
  },
  {
    "_id": "s102",
    "name": "Cabane Drommen - L'Arbre à Cabane",
    "type": "House",
    "imgUrls": ["../assets/img/s102/0.jpg", "../assets/img/s102/1.jpg","../assets/img/s102/2.jpg","../assets/img/s102/3.jpg"],
    "price": 51,
    "summary": "Discover the magical world of the Drommen hut, unique in France. With 4 levels : the living room, then the toilet, then the bedroom. Guests can dine on the perched terrace.",
    "capacity": 2,
    "amenities": [
      "Free parking on premises",
      "Hair dryer",
      "Private patio or balcony"
    ],
    "labels": [
      "Top of the world",
      "Trending",
      "Play",
      "Tropical"
    ],
    "host": {
      "_id": "u102",
      "fullname": "Dudi Du",
      "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    },
    "loc": {
      "country": "France",
      "countryCode": "FR",
      "city": "Guyonvelle",
      "address": "Grand Est",
      "lat": 47.855,
      "lng": 5.8
    },
    "reviews": [
      {
        "id": "madeId",
        "txt": "Very helpful hosts. Cooked traditional...",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "/img/img2.jpg"
        }
      }
    ],
    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
  }
]

const orders = [
  {
    "_id": "o1225",
    "hostId": "u102",
    "buyer": {
      "_id": "u101",
      "fullname": "User 1"
    },
    "totalPrice": 160,
    "startDate": "2025/10/15",
    "endDate": "2025/10/17",
    "guests": {
      "adults": 2,
      "kids": 1
    },
    "stay": {
      "_id": "h102",
      "name": "House Of Uncle My",
      "price": 80.00
    },
    "msgs": [],
    "status": "pending" // pending, approved
  }
]

const users = [
  {
    "_id": "u101",
    "fullname": "User 1",
    "imgUrl": "/img/img1.jpg",
    "username": "user1",
    "password": "secret"
  },
  {
    "_id": "u102",
    "fullname": "Dudi Du",
    "imgUrl": "/img/img2.jpg",
    "username": "user2",
    "password": "secret",
    // "isOwner" : true // OPTIONAL
  }
]

//json copy

// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})

// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering



// Example - figuring up if the user is an owner:
// userService.login()
  //  const userStays = stayService.query({ownerId: loggeinUser._id})
  //  loggeinUser.isOwner = userStays.length > 0
