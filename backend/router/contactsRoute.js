import express from "express";
import {
  getAllContacts,
  deleteContact,
  createContact,
  updateContact,
} from "../controller/contactsController.js";

const contactRouter = express.Router();

contactRouter.get("/contacts", getAllContacts);

contactRouter.get("/contacts", getAllContacts);
contactRouter.post("/contacts", createContact);
contactRouter.put("/contacts/:id", updateContact);
contactRouter.delete("/contacts/:id", deleteContact);

export default contactRouter;
