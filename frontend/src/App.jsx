import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./components/InputField";

const INPUT_FIELDS = [
  { label: "Name", type: "text" },
  { label: "Email", type: "text" },
  { label: "Phone", type: "text" },
];

function App() {
  const [addressBook, setAddressBook] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contacts")
      .then((response) => setAddressBook(response.data));
  });

  return (
    <div className="h-screen flex justify-center items-center bg-neutral-200">
      <main className="bg-neutral-50 rounded p-8 font-['Inter']">
        <h1 className="font-bold text-center text-xl pb-3">Address Book</h1>
        <form className="flex flex-col gap-2">
          {INPUT_FIELDS.map(({ label, type }) => (
            <InputField key={label} label={label} type={type} />
          ))}
        </form>
      </main>
    </div>
  );
}

export default App;
