const setToken = token => {
  localStorage.setItem("token", token);
};

const getToken = () => localStorage.getItem("token") || "";

const delToken = () => localStorage.removeItem("token");

export { setToken, getToken, delToken };
