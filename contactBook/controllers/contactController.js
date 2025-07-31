import { Contact } from "../models/contactModel.js";

export const getContacts = async (req, res) => {
  try {
    const constacts = await Contact.find();
    return res.status(200).json({ msg: "get the contacts ", constacts });
  } catch (error) {
    return res.status(500).json({ msg: "server Error" });
  }
};

export const createContact = async (req, res) => {
  try {
    const newCantact = new Contact(req.body);

    await newCantact.save();
    res.status(200).json(newCantact);
  } catch (error) {
    return res.status(500).json({ msg: "Invalid data", error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const data = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (phone) {
      data.phone = phone;
    }
    console.log("reqdata", data);
    const updateData = await Contact.findByIdAndUpdate(id, data);
    if (!updateData) {
      return res.status.json({ msg: "constact not found" });
    }
    res.status(200).json(updateData);
  } catch (error) {
    res.status(400).json({ msg: "update failed", error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ msg: "contact not found" });
    }
    res.status(200).json({ msg: "Deleteed Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
