import { createSelector } from '@reduxjs/toolkit';

const cartsSelector = (state) => state.cart.carts;

// Count quantities
export const cartsCountSelector = createSelector(cartsSelector, (carts) =>
    carts.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total to cart
export const cartTotalSelector = createSelector(cartsSelector, (carts) =>
    carts.reduce((total, item) => total + (item.product.price + item.size.price) * item.quantity, 0)
);

// Selector to calculate total discount
export const cartDiscountTotalSelector = createSelector(cartsSelector, (carts) =>
    carts.reduce((totalDiscount, item) => {
        const discountAmount = ((item.product.price * item.product.sale) / 100) * item.quantity;
        return totalDiscount + discountAmount;
    }, 0)
);
