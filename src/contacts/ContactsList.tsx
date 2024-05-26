import React, { useState } from "react";
import { Contact } from "../models/Contact";
import {
  useGetContactsQuery,
  useAddContactMutation,
} from "../redux/ContactApi";
import ViewContact from "./ViewContact";
import { v4 as uuidv4 } from "uuid";

function Contacts() {
  const intialCotact: Contact = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const [newContact, setNewContact] = useState<Contact>(intialCotact);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setNewContact({ ...newContact, id: uuidv4() });
    await addContact({...newContact,id: uuidv4()});
    setNewContact(intialCotact);
  };

  return (
    <div>
      <div className="contacts-list ">
        <h1> Contact list</h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={newContact.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            value={newContact.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="phone"
            value={newContact.phone}
            placeholder="phone number"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Add Contact</button>
        </form>

        <ul>
          {contacts?.map((c) => (
            <ViewContact key={c.id} contact={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
