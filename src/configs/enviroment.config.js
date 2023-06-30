// enviroments
const environment = {
  production: {
    API_BASE_URL: "https://",
  },
  development: {
    API_BASE_URL: "http://localhost:5000/api/v1/",
  },
};

const currentEnvironment = process.env.REACT_APP_ENV || "development";

export default environment[currentEnvironment] 
