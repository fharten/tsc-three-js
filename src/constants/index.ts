import {
  americano,
  butterCroissant,
  cappucino,
  chocolateChipCookie,
  coldBrew,
  flatWhite,
  hojichaLatte,
  hotChocolate,
  icedAmericano,
  icedLatte,
  matchaLatte,
  matchaPoundCake,
  mochaSupreme,
  organicTeas,
  seasonalFruitDanish,
  singleOriginEspresso,
} from '../assets/images';
export const EspressoClassics = [
  {
    name: 'Single Origin Espresso',
    description: 'Rich, complex, and vibrant. Rotating seasonal beans.',
    price: [
      { title: 'Single', sum: '¥400' },
      { title: 'Double', sum: '¥500' },
    ],
    image: singleOriginEspresso,
  },
  {
    name: 'Americano',
    description: 'Smooth and balanced; espresso mellowed with hot water.',
    price: [
      { title: 'Small', sum: '¥450' },
      { title: 'Large', sum: '¥550' },
    ],
    image: americano,
  },
  {
    name: 'Cappuccino',
    description: 'Velvety microfoam with a delicate dusting of cocoa.',
    price: [
      { title: 'Small', sum: '¥550' },
      { title: 'Large', sum: '¥650' },
    ],
    image: cappucino,
  },
  {
    name: 'Flat White',
    description: 'A creamy balance of espresso and milk with a silky finish.',
    price: [
      { title: 'Small', sum: '¥550' },
      { title: 'Medium', sum: '¥600' },
    ],
    image: flatWhite,
  },

  {
    name: 'Mocha Supreme',
    description:
      'Espresso blended with rich dark chocolate and steamed milk, topped with whipped cream.',
    price: [
      { title: 'Small', sum: '¥600' },
      { title: 'Large', sum: '¥700' },
    ],
    image: mochaSupreme,
  },
];

export const PourOverSelection = [
  {
    name: 'Guatemala Huehuetenango',
    description: 'Bright citrus & caramel sweetness.',
    price: [{ title: 'One size', sum: '¥650' }],
    image: '../assets/images/guatemala-huehuetenango.png',
  },
  {
    name: 'Ethiopia Yirgacheffe',
    description: 'Floral aroma, jasmine & bergamot.',
    price: [{ title: 'One size', sum: '¥700' }],
    image: '../assets/images/ethiopia-yirgacheffe.png',
  },
  {
    name: 'Sumatra Mandheling',
    description: 'Earthy, full-bodied with chocolate depth.',
    price: [{ title: 'One size', sum: '¥650' }],
    image: '../assets/images/sumatra-mandheling.png',
  },
];

export const SeasonalAndSignature = [
  {
    name: 'Tokyo Sakura Latte',
    description:
      'Steamed milk infused with sakura essence, topped with pink sugar crystals.',
    price: [
      { title: 'Small', sum: '¥600' },
      { title: 'Medium', sum: '¥650' },
    ],
    image: '../assets/images/tokyo-sakura-latte.png',
  },
  {
    name: 'Matcha Espresso Fusion',
    description: 'Layers of ceremonial-grade matcha and bold espresso.',
    price: [
      { title: 'Small', sum: '¥650' },
      { title: 'Medium', sum: '¥700' },
    ],
    image: '../assets/images/matcha-espresso-fusion.png',
  },
  {
    name: 'Yuzu Honey Cold Brew',
    description: 'Refreshing cold brew sweetened with local yuzu and honey.',
    price: [{ title: 'One size', sum: '¥650' }],
    image: '../assets/images/yuzu-honey-cold-brew.png',
  },
];

export const ColdCoffeeCreations = [
  {
    name: 'Iced Americano',
    description: 'Crisp, clean, and refreshing.',
    price: [
      { title: 'Medium', sum: '¥500' },
      { title: 'Large', sum: '¥550' },
    ],
    image: icedAmericano,
  },
  {
    name: 'Iced Latte',
    description: 'Smooth espresso over chilled milk and ice.',
    price: [
      { title: 'Medium', sum: '¥550' },
      { title: 'Large', sum: '¥600' },
    ],
    image: icedLatte,
  },
  {
    name: 'Cold Brew',
    description: 'Slow-steeped 18 hours, naturally sweet and bold.',
    price: [{ title: 'One size', sum: '¥600' }],
    image: coldBrew,
  },
];

export const NonCoffeeAndLight = [
  {
    name: 'Matcha Latte',
    description: 'Creamy, earthy matcha with steamed milk.',
    price: [
      { title: 'Small', sum: '¥550' },
      { title: 'Large', sum: '¥650' },
    ],
    image: matchaLatte,
  },
  {
    name: 'Hojicha Latte',
    description: 'Roasted green tea with a nutty, caramel-like depth.',
    price: [
      { title: 'Small', sum: '¥550' },
      { title: 'Medium', sum: '¥600' },
    ],
    image: hojichaLatte,
  },
  {
    name: 'Hot Chocolate',
    description: 'Rich Belgian chocolate, topped with whipped cream.',
    price: [
      { title: 'Small', sum: '¥500' },
      { title: 'Large', sum: '¥600' },
    ],
    image: hotChocolate,
  },
  {
    name: 'Organic Teas',
    description: 'Earl Grey, Chamomile, or Jasmine.',
    price: [{ title: 'Pot', sum: '¥450' }],
    image: organicTeas,
  },
];

export const SmallBitesAndPastries = [
  {
    name: 'Butter Croissant',
    description: 'Flaky, buttery pastry from local bakery partners.',
    price: [{ title: 'One size', sum: '¥300' }],
    image: butterCroissant,
  },
  {
    name: 'Matcha Pound Cake',
    description: 'Moist, lightly sweet with earthy matcha flavor.',
    price: [{ title: 'One size', sum: '¥350' }],
    image: matchaPoundCake,
  },
  {
    name: 'Seasonal Fruit Danish',
    description: 'Crisp pastry topped with seasonal fruits.',
    price: [{ title: 'One size', sum: '¥400' }],
    image: seasonalFruitDanish,
  },
  {
    name: 'Chocolate Chip Cookie',
    description: 'Classic cookie with rich chocolate chips.',
    price: [{ title: 'One size', sum: '¥250' }],
    image: chocolateChipCookie,
  },
];
