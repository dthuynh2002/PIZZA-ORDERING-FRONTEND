export const setToken = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};

export const getToken = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

export const removeToken = (name) => {
    localStorage.removeItem(name);
};

// Save local storage
export const setCartToLocal = (value) => {
    localStorage.setItem('carts', JSON.stringify(value));
};

export const getCartsFromLocal = () => {
    return JSON.parse(localStorage.getItem('carts'));
};

export const removeCartsFromLocal = () => {
    localStorage.removeItem('carts');
};
