const Images = [
  { image: require("../assets/box.png") },
  { image: require("../assets/box.png") },
  { image: require("../assets/box.png") },
];

export const packages = [
  {
    id: "1",
    type: "Small",
    price: "200",
    class: "Less than 5 Kgs",
    image: Images[0].image,
  },
  {
    id: "2",
    type: "Medium",
    price: "500",
    class: "5 - 50 kgs",
    image: Images[1].image,
  },
  {
    id: "3",
    type: "Large",
    price: "1000",
    class: "> 50 kgs",
    image: Images[2].image,
  },
];
