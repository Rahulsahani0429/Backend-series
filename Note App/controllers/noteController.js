import { Note } from "../models/noteModel.js";

export const createNode = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      createdBy: req.user.id,
    });
    res.status(201).json({ msg: "Note Create", status: true, note });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "failed to create note", Error: error.message });
  }
};
  
// using this method you can getalluser how created the notes

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.id });
    if (notes) return res.status(200).json({ msg: "fetch  user notes", notes });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "failed to fetch notes", Error: error.message });
  }
};
 
// this is second
// if use this only find the one user

// export const getNotes = async (req, res) => {
//   try {
//     const user = req.user;
//     if (!user) {
//       return res.status(404).json({
//         msg: "user not found",
//         status: "false",
//       });
//     }
//     res
//       .status(200)
//       .json({ msg: "user information found", userInfo: user, status: true });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "Server Error", status: false, Error: error.message });
//   }
// };


// this is first method

// export const updateNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const { id } = req.params;

//     // Step 1: Find note by ID and ownership
//     const note = await Note.findOne({ _id: id, createdBy: req.user.id });

//     if (!note) {
//       return res.status(404).json({ msg: "Note not found or unauthorized" });
//     }

//     // Step 2: Update only provided fields
//     if (title) note.title = title;
//     if (content) note.content = content;

//     // Step 3: Save the note manually
//     await note.save();

//     res.status(200).json({ msg: "Note updated", note });

//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "Note not updated", Error: error.message });
//   }
// };




// second method
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ msg: "user not found" });
    res.status(200).json({ msg: "note updated", note });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "note not updated", Error: error.message });
  }
};




export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete(
      { _id: id },
      { createdBy: req.user.id }
    );
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json({ msg: "note deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Delete failed", Error: error.message });
  }
};
