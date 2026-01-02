import { useEffect, useState } from "react"
import { createNewProperty } from "./PropertyCreateService"

export default function usePropertyCreateHook() {
  const [newProperty, setNewProperty] = useState({})

  function updateNewProperty(e) {
    let attrName = e.target.name
    let attrValue = e.target.value

    console.log(`${attrName}: ${attrValue}`)

    setNewProperty(currProperty => ({
      ...currProperty,
      [attrName]: attrValue
    })
    )
  }

  async function submitProperty() {
    const result = await createNewProperty(JSON.stringify(newProperty));
    console.log("Created ", JSON.stringify(result))
  }

  return { newProperty, setNewProperty, updateNewProperty, submitProperty }
}