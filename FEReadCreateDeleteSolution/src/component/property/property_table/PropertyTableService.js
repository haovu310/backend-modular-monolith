import { PROPERTY_URL } from "../../../service_url/RouteUrlConfig"
import sendHttpRequest from "../../../http_call/HttpRequest"

// API Call
async function loadAllProperties() {
  const response = await sendHttpRequest(PROPERTY_URL)

  if (response.status === 200) {
    return response.json
  } else {
    return []
  }
}

async function deleteProperty(id) {
  const response = await sendHttpRequest(
    PROPERTY_URL + "/" + id,
    "DELETE"
  )

  if (response.status === 200) {
    return response.json
  } else {
    return []
  }
}


export { loadAllProperties, deleteProperty }