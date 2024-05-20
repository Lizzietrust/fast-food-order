import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    products: any[];
}
  
const initialState: InitialState = {
    products: [],
};
  
export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = state.products.find((product) => product.id === action.payload.id);

            if(product) {
                product.quantity += action.payload.quantity
            } else {
                state.products.push(action.payload);
            }
        },

        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload)
        },

        resetCart: (state) => {
            state.products = []
        },
        
        increaseQuantity: (state, action) => {
            const product = state.products.find((product) => product.id === action.payload.id);
            if(product) {
                product.quantity++;
            }
        },

        decreaseQuantity: (state, action) => {
            const product = state.products.find((product) => product.id === action.payload.id);
            if(product.quantity === 1) {
                product.quantity = 1;
            } else {
                product.quantity--;
            }
        }
    },
});

export const {
    addToCart,
    removeFromCart,
    resetCart,
    increaseQuantity,
    decreaseQuantity
} = itemSlice.actions;

export default itemSlice.reducer;