import PropertyCreatePanel from "../property_create_panel/PropertyCreatePanel";
import usePropertyHook from "./PropertyHook";
import PropertyDialog from "./property_update_panel/PropertyDialog";

export default function PropertyTable() {

  // State Variable 
  const {
    properties,
    setProperties,
    sendDeleteRequest,
    loadData
  } = usePropertyHook()

  return (
    <>
      <PropertyCreatePanel />
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Agent Email</th>
            <th>Action</th>
          </tr>
        </tbody>
        {
          properties.map((property) =>
          (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.name}</td>
              <td>{property.type || "N/A"}</td>
              <td>{property.price}</td>
              <td>{property.agentEmail}</td>
              <td>
                <button onClick={() => sendDeleteRequest(property.id)}>
                  Delete
                </button>
                <PropertyDialog item={property} />
              </td>
            </tr>
          )
          )
        }
      </table>
    </>
  )

}