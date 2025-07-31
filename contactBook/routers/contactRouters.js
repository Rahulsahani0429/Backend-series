import express from 'express';
import { getContacts, createContact,updateContact, deleteContact  } from '../controllers/contactController.js';

const contaceRouter = express.Router();

contaceRouter.get('/',getContacts);
contaceRouter.post('/',createContact);
contaceRouter.put('/:id',updateContact);
contaceRouter.delete('/:id',deleteContact);

export default contaceRouter;