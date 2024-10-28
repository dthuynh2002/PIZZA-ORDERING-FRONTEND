export const setToken = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
};

export const getToken = (name) => {
    return JSON.parse(sessionStorage.getItem(name));
};

export const removeToken = (name) => {
    sessionStorage.removeItem(name);
};

// Save local storage
export const setCartToLocal = (value) => {
    localStorage.setItem('carts', JSON.stringify(value));
};

export const getCartsFromLocal = (carts) => {
    return JSON.parse(localStorage.getItem(carts));
};

export const removeCartsFromLocal = (carts) => {
    localStorage.removeItem(carts);
};
