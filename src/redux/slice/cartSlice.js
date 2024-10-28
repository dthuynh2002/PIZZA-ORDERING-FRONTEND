import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getCartsFromLocal, setCartToLocal } from '~/utils/token';

const initialState = {
    carts: getCartsFromLocal('carts') || []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // newItem : id => product.id, product, size, quantity, notes
            const newItem = action.payload;

            const index = state.carts.findIndex(
                (item) => item.id === newItem.id && item.size === newItem.size
            );

            if (index >= 0) {
                state.carts[index].quantity += newItem.quantity;
            } else {
                state.carts.push(newItem);
            }

            toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
            setCartToLocal(state.carts);
        },
        setQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.carts.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.carts[index].quantity = quantity;
                setCartToLocal(state.carts);
            }
        },
        removeFromCart: (state, action) => {
            const { id, sizeId } = action.payload;
            state.carts = state.carts.filter(
                (item) => !(item.id === id && item.size.id === sizeId)
            );
            setCartToLocal(state.carts);
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
