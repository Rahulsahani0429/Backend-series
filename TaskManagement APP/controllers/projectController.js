import { Project } from "../models/porjectModel.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    // console.log(req.body);
    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members,
    });
    return res.status(201).json({
      status: true,
      msg: "Project created successfully",
      data: project,
    });
  } catch (error) {
    // console.log(error.message);
    return res
      .status(500)
      .json({
        status: false,
        msg: "server error gi bhal",
        Error: error.message,
      });
  }
};

// Get All Project

export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name, email")
      .populate("members", "name, email");

    return res.status(200).json({
      status: true,
      msg: "I get all Project",
      count: projects.lenght,
      data: projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Server Error", Error: error.message });
  }
};

// get single Project by ID

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ createdBy: id })
      .populate("createdBy", "name email")
      .populate("members", "name email");
    console.log(id);
    if (!project) {
      return res.status(404).json({ status: false, msg: "Project not found" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "Project found by Id", project });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", Error: error.message });
  }
};

// 🔹 Update Project
export const updateProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const id = req.params.id;
    // console.log(req.body);

    const updated = await Project.findByIdAndUpdate(
      id,
      { name, description, members },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, msg: "Project not found" });
    }

    res.status(200).json({
      status: true,
      msg: "Project updated successfully",

      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// this is second method for update project

// export const updateProject = async (req, res) => {
//   try {
//     const { name, description, members } = req.body;

//     const { id } = req.params;

//     const updated = await Project.findByIdAndUpdate(
//       id,
//       { name, description, members },
//       { new: true, runValidators: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ status: false, msg: "Project not found" });
//     }
//     return res.status(200).json({
//       status: true,
//       msg: "Project updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     return res.status(500).json({ msg: "server error", Error: error.message });
//   }
// };

// Delete project

export const deleteProject = async (req, res) => {
  try {
    // if we want to delete in multiple project, task,etc to one  then use these to line

    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);

    // if we want to delete login  user, who create the project and task etc then use these two line

    // const userid = req.user._id;
    // const deleted = await Project.findOneAndDelete({ createdBy: userid });

    // const deleted = await Project.deleteOne({ createdBy: userid });

    // console.log(userid);
    if (!deleted) {
      return res.status(404).json({ msg: "Project not found" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "server error", Error: error.message });
  }
};
