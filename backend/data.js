import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Irfan',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Riya',
            email:'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products:[
        {
            
            name: 'Chair',
            category: 'HomeCare',
            image: '/images/images.jpeg',
            price: 180,
            countInStock: 10,
            brand: 'BigBasket',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',

        },
        {
            
            name: 'Body Lotion',
            category: 'Personal Care',
            image: '/images/images1.jpeg',
            price: 480,
            countInStock: 20,
            brand: 'Greenly',
            rating: 4.9,
            numReviews: 11,
            description: 'high quality product',

        },
        {
            
            name: 'Holiday',
            category: 'HolidayDestination',
            image: '/images/images2.jpeg',
            price: 340,
            countInStock: 0,
            brand: 'Umatter',
            rating: 4.6,
            numReviews: 120,
            description: 'high quality product',

        },
        {
            
            name: 'Corn Flakes',
            category: 'Grocery',
            image: '/images/images3.jpeg',
            price: 70,
            countInStock: 40,
            brand: 'Cadbury',
            rating: 4.4,
            numReviews: 16,
            description: 'high quality product',

        },
        {
            
            name: 'Vegetables2',
            category: 'Grocery',
            image: '/images/images4.jpeg',
            price: 235,
            countInStock: 100,
            brand: 'Vega',
            rating: 4.3,
            numReviews: 150,
            description: 'high quality product',

        },
        {
            
            name: 'Vege',
            category: 'Grocery',
            image: '/images/images5.jpeg',
            price: 100,
            countInStock: 109,
            brand: 'GreenVege',
            rating: 4.0,
            numReviews: 50,
            description: 'high quality product',

        },
    ],
};

export default data;