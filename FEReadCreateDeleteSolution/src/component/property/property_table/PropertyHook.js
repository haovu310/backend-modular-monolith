import { useEffect, useState } from "react"
import { deleteProperty, loadAllProperties } from "./PropertyTableService"


function usePropertyHook() {
  const [properties, setProperties] = useState([])

  async function loadData() {
    const response = await loadAllProperties();

    console.log("Response ", response)

    if (Array.isArray(response)) {
      setProperties(response)
    } else {
      console.error("Expected array but got:", response)
      setProperties([])
    }
  }

  async function sendDeleteRequest(propertyId) {
    const response = await deleteProperty(propertyId)
    await loadData()
  }

  // Event Handler
  useEffect(() => {
    loadData()
  }, [])

  return {
    properties,
    setProperties,
    sendDeleteRequest,
    loadData
  }
}

export default usePropertyHook