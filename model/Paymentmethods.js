export const Images = [
  {
    image: require('../assets/mpesa.png'),
  },
  {
    image: require('../assets/visa.png'),
  },
  {
    image: require('../assets/mastercard.png'),
  },
];

export const paymentMethods = [
  {
    name: 'Mpesa',
    image: Images[0].image,
    selected: 'true',
    id: '1',
    number: '07 **** **52',
  },
  {
    name: 'Visa',
    image: Images[1].image,
    selected: 'false',
    id: '2',
    number: '**** **** **** 4425',
  },
  {
    name: 'MasterCard',
    image: Images[2].image,
    selected: 'false',
    id: '3',
    number: '**** **** **** 4321',
  },
];
