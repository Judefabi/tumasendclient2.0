const Images = [
  {image: require('../assets/motocycle.png')},
  {image: require('../assets/car.png')},
  {image: require('../assets/car.png')},
  {image: require('../assets/lorry.png')},
];

export const Vehicles = [
  {
    id: '1',
    type: 'Boda Boda',
    priceRate: 200,
    time: '8.00 AM',
    image: Images[0].image,
    isSelected: false,
  },
  {
    id: '2',
    type: 'Car',
    priceRate: 500,
    time: '8.00 AM',
    image: Images[1].image,
    isSelected: false,
  },
  {
    id: '3',
    type: 'Van',
    priceRate: 1000,
    time: '8.00 AM',
    image: Images[2].image,
    isSelected: false,
  },
  {
    id: '4',
    type: 'Lorry',
    priceRate: 500,
    time: '8.00 AM',
    image: Images[3].image,
    isSelected: false,
  },
];
