const HOST_PORT = 8080
const BACKEND_HOST_ENV = 
  process.env.REACT_APP_BACKEND_HOST 
  ? process.env.REACT_APP_BACKEND_HOST
  : "localhost"

const HOST_URL = `http://${BACKEND_HOST_ENV}:` + HOST_PORT

export default HOST_URL