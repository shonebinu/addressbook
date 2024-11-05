import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./components/InputField";

const API_URL = "http://localhost:3000/api/contacts";

const INPUT_FIELDS = [
  { label: "Name", type: "text", name: "name" },
  { label: "Email", type: "text", name: "email" },
  { label: "Phone", type: "text", name: "phone" },
];

function App() {
  const [addressBook, setAddressBook] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((response) => setAddressBook(response.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, formData).then((response) => {
        setAddressBook((prev) =>
          prev.map((addr) => (addr._id === editingId ? response.data : addr))
        );
        setEditingId(null);
        setFormData({ name: "", email: "", phone: "" });
      });
    } else {
      axios.post(API_URL, formData).then((response) => {
        setAddressBook([...addressBook, response.data]);
        setFormData({ name: "", email: "", phone: "" });
      });
    }
  };

  const handleAddressDelete = (id) => {
    axios.delete(`${API_URL}/${id}`);
    setAddressBook(addressBook.filter((addr) => addr._id !== id));
  };

  const handleAddressEdit = (id) => {
    const addressToEdit = addressBook.find((addr) => addr._id === id);
    setFormData({
      name: addressToEdit.name,
      email: addressToEdit.email,
      phone: addressToEdit.phone,
    });
    setEditingId(id);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-neutral-200">
      <main className="bg-neutral-50 rounded p-8 font-['Inter'] flex gap-10">
        <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
          <h2 className="font-bold text-center text-lg pb-3">
            {editingId ? "Update Address" : "Add an Address"}
          </h2>
          {INPUT_FIELDS.map(({ label, type, name }) => (
            <InputField
              key={label}
              label={label}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
            />
          ))}
          <button
            type="submit"
            className="border rounded p-2 bg-neutral-700 text-neutral-100 text-sm transition hover:scale-105"
          >
            {editingId ? "Update Address" : "Add Address"}
          </button>
        </form>
        <section className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold text-center">Address Records</h2>
          {addressBook.map(({ _id, name, email, phone }) => (
            <div key={email} className="border rounded p-3">
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-sm">{email}</p>
              <p className="text-sm">{phone}</p>
              <div className="flex flex-col text-xs mt-2 gap-1">
                <button
                  className="border rounded p-1 bg-green-300 hover:scale-105 transition font-medium"
                  onClick={() => handleAddressEdit(_id)}
                >
                  Update
                </button>
                <button
                  className="border rounded p-1 bg-red-300 hover:scale-105 transition font-medium"
                  onClick={() => handleAddressDelete(_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
}

export default App;
