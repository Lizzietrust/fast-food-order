import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';

interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number
}

export const products: Product[] = [
    {   
        id: 1,
        image: product1,
        name: 'Double Beef Burger',
        price: 10500.0,
        quantity: 1
    },
    {
        id: 2,
        image: product2,
        name: 'Single Beef Burger',
        price: 8500.0,
        quantity: 1
    },
    {
        id: 3,
        image: product3,
        name: 'Double Crunchy Chicken Burger',
        price: 12000.0,
        quantity: 1
    },
    {   id: 4,
        image: product4,
        name: 'Breakfast Burger',
        price: 5000.0,
        quantity: 1
    },
    {
        id: 5,
        image: product5,
        name: 'Grilled Chicken Burger',
        price: 9000.0,
        quantity: 1
    },
    {
        id: 6,
        image: product6,
        name: 'Double Grilled Chicken Burger',
        price: 11000.0,
        quantity: 1
    },
];
