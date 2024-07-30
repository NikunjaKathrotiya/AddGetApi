import React, { useState, useEffect } from "react";
import "./FethchData.css"; // Assuming this is your CSS file for styling
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const FetchDetails = () => {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newfirstName, setNewfirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newHobbies, setNewHobbies] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  
      // ----------fetch api function-----------//
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://6686363783c983911b013327.mockapi.io/details/details"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Failed to fetch data");
    }
  };
// ----------Delete API function------------//
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://6686363783c983911b013327.mockapi.io/details/details/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
      toast.success("Item deleted successfully", { autoClose: 3000 });
    } catch (error) {
      console.error("Error deleting item: ", error);
      toast.error("Failed to delete item");
    }
  };

// -------add new record into Api------------// 


  const handleCreate = async () => {
    const response = await fetch(
      "https://6686363783c983911b013327.mockapi.io/details/details",
      {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          firstname: newfirstName,
          Lastname: newfirstName,
          Age: newAge,
          gender: newGender,
          Hobbies: newHobbies,
          Address: newAddress,
          city: newCity,
        }),
      }
    );
    fetchData();
    setNewfirstName("");
    setNewLastName("");
    setNewAge("");
    setNewGender("");
    setNewHobbies("");
    setNewAddress("");
    setNewCity("");
  };

  // ------searching functionality------------//

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDetails = details.filter((detail) => {
    return detail.firstname.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div className="details-container">
      <h2>Details List</h2>
      <div className="line"></div>
      <input
        type="text"
        placeholder="Search by First Name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="details-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map((detail) => (
            <tr key={detail.id}>
              <td className="fnm">{detail.firstname}</td>
              <td className="fnm">{detail.Lastname}</td>
              <td className="fnm">{detail.Age}</td>
              <td className="fnm">{detail.gender}</td>
              <td className="fnm">{detail.Hobbies}</td>
              <td className="fnm">
                {detail.Address}, {detail.city}
              </td>
              <td>
                <button onClick={() => handleDelete(detail.id)}>Delete</button>
              </td>
            </tr>
          ))}
        <div className="add-details">
          <h2  className="add-details">ADD NEW DETAILS HERE</h2></div>
          <tr>
            <td>
              <input
                type="text"
                placeholder="first name.."
                value={newfirstName}
                onChange={(e) => setNewfirstName(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="Last Name.."
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              ></input>
            </td>

            <td>
              <input
                type="text"
                placeholder="Age.."
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
              ></input>
            </td>

            <td>
              <input
                type="text"
                placeholder="Gender.."
                value={newGender}
                onChange={(e) => setNewGender(e.target.value)}
              ></input>
            </td>

            <td>
              <input
                type="text"
                placeholder="Hobbies.."
                value={newHobbies}
                onChange={(e) => setNewHobbies(e.target.value)}
              ></input>
            </td>

            <td>
              <input
                type="text"
                placeholder="Address.."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              ></input>
            </td>
            
            <td>
              <input
                type="text"
                placeholder="city.."
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              ></input>
            </td>

            <td>
              <button onClick={handleCreate}>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FetchDetails;
