// const baseURL = "https://owldaccabackend.onrender.com";

const baseURL = import.meta.env.MODE === 'development'
    ? "http://localhost:8000"
    : "https://server.owldaccabd.com";

export { baseURL };
