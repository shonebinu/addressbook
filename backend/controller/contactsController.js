import Contact from "../model/contactsModel.js";

export const getAllContacts = (req, res) =>
  Contact.find().then((contact) => res.json(contact));

export const createContact = (req, res) => {
  const contact = new Contact(req.body);
  console.log(contact);
  contact.save().then((savedContact) => res.json(savedContact));
};

export const updateContact = (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedContact) => res.json(updatedContact)
  );
};

export const deleteContact = (req, res) => {
  Contact.findByIdAndDelete(req.params.id).then(() => res.end());
};
