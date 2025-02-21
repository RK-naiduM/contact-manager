import React, { useState } from "react";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const refreshContacts = () => {
    // Fetch the latest contacts from the backend
    fetchContacts();
  };

  return (
    <div>
      <h1>Contact Manager</h1>
      <AddContact refreshContacts={refreshContacts} />
      <ContactList />
    </div>
  );
}

export default App;
