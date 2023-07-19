// enviroments
const environment = {
  production: {
    API_BASE_URL: "https://carbonible-46cc019868d0.herokuapp.com/api/v1/",
  },
  development: {
    API_BASE_URL: "http://localhost:5000/api/v1/",
  },
};

const currentEnvironment = process.env.REACT_APP_ENV || "development";

export default environment[currentEnvironment] 
