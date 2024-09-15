export const setToken = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
};

export const getToken = (name) => {
    return JSON.parse(sessionStorage.getItem(name));
};

export const removeToken = (name) => {
    sessionStorage.removeItem(name);
};
