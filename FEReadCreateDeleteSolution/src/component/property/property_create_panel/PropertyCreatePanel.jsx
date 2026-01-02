import usePropertyCreateHook from "./PropertyCreateHook"

export default function PropertyCreatePanel() {

  // State Variable 
  const { newProperty, setNewProperty, updateNewProperty, submitProperty }
    = usePropertyCreateHook()

  return (
    <form onSubmit={() => submitProperty()}>
      <input type="text" name="name"
        placeholder="Property Name"
        onChange={(e) => updateNewProperty(e)}>
      </input>



      <input type="number" name="price"
        placeholder="Price"
        onChange={(e) => updateNewProperty(e)}>
      </input>

      <input type="text" name="agentEmail"
        placeholder="Agent Email"
        onChange={(e) => updateNewProperty(e)}>
      </input>

      <button type="submit">
        Create Property
      </button>
    </form>
  )

}