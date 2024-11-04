import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [addressBook, setAddressBook] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contacts")
      .then((response) => setAddressBook(response.data));
  });
  return <div>{JSON.stringify(addressBook)}</div>;
}

export default App;
