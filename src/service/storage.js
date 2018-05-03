const clientStorage = {
    setItem(key, val) {
        val = JSON.stringify(val);
        return window.localStorage.setItem(key, val);
    },
    getItem(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    removeItem(key) {
        return window.localStorage.removeItem(key);
    }
};
export default clientStorage
