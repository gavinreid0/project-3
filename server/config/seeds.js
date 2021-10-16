const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  // await Category.deleteMany();

  // const categories = await Category.insertMany([
  //   { name: 'Food' },
  //   { name: 'Household Supplies' },
  //   { name: 'Electronics' },
  //   { name: 'Books' },
  //   { name: 'Toys' }
  // ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Nike Air Jordans',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'camera.jpg',
      // category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Nike Huaraches',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'camera.jpg',
      // category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Adidas Boost 32',
      // category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'camera.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Reebok Jam34',
      // category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'camera.jpg',
      price: 3.99,
      quantity: 50
    },
]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
