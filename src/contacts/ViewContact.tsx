import { useState } from "react";
import { Contact } from "../models/Contact";
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "../redux/ContactApi";

type Prop = {
  contact: Contact;
};
function ViewContact({ contact }: Prop) {
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [Phone, setPhone] = useState(contact.phone);

  const handleUpdate = async (id: string) => {
    await updateContact({
      id: id,
      name: name,
      email: email,
      phone: Phone,
    });
  };

  const handleDelete = async (id:string) => {
    await deleteContact(id);
  };
  return (
    <div>
      <li key={contact.id}>
        {isEdit ? (
          <span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input value={Phone} onChange={(e) => setPhone(e.target.value)} />
            <button
              onClick={() => {
                setIsEdit(!isEdit);
                handleUpdate(contact.id);
              }}
            >
              Save
            </button>
          </span>
        ) : (
          <span>
            {contact.name}- {contact.email} - {contact.phone}
            <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </span>
        )}
      </li>
    </div>
  );
}

export default ViewContact;
