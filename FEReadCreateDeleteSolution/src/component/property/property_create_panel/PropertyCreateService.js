import { PROPERTY_URL } from "../../../service_url/RouteUrlConfig"
import sendHttpRequest from "../../../http_call/HttpRequest"

// API Call
async function createNewProperty(newProperty) {
  const response = await sendHttpRequest(
    PROPERTY_URL,
    "POST",
    newProperty
  )

  if (response.status == 200) {
    return response.json
  } else {
    return []
  }
}

export { createNewProperty }