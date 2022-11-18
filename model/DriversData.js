const Images = [
  { image: require("../assets/female-one.jpg") },
  { image: require("../assets/male-one.jpg") },
  { image: require("../assets/female-two.jpg") },
];

export const Drivers = [
  {
    id: "1",
    vehicletype: "Motocycle",
    rating: "200",
    distance: "4km",
    minutesaway: "3.5 min",
    name: "Lizzie Doen",
    image: Images[0].image,
    rating: 4,
    reviews: 50,
    amountPayable: 200
  },
  {
    id: "2",
    vehicletype: "Car",
    rating: "200",
    distance: "6.5km",
    minutesaway: "5.5 min",
    name: "John Doe",
    image: Images[1].image,
    rating: 5,
    reviews: 40,
    amountPayable: 250
  },
  {
    id: "3",
    vehicletype: "Van",
    rating: "200",
    distance: "1km",
    minutesaway: "0.5 min",
    name: "Jane Doejane",
    image: Images[2].image,
    rating: 4,
    reviews: 30,
    amountPayable: 350
  },
];
