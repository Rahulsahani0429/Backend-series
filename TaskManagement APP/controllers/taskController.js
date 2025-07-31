import { Task } from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      project,
    } = req.body;
    // console.log(req.body);
    // ▶️ 1. Duplicate check before creation
    const existing = await Task.findOne({
      title,
      dueDate,
      project,
      assignedTo,
    });
    if (existing) {
      return res.status(400).json({
        status: false,
        msg: "Task with same title, dueDate, project and assigned user already exists",
      });
    }

    // ▶️ 2. Now create new task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      project,
      createdBy: req.user._id, // NOTE: add `req.`!
    });

    return res
      .status(201)
      .json({ status: true, msg: "Task created successfully", data: task });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, msg: "Server Error", error: error.message });
  }
};

// Get All the Task

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "name description")
      .populate("createdBy", "name email");
    if (!tasks) {
      return res.status(404).json({ status: false, msg: "task not found" });
    }
    return res.status(200).json({
      status: true,
      msg: "task create successfully",
      totalTask: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "server Error", Error: error.message });
  }
};

// Get task by Id

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("project", "name ")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({ msg: "task not found", status: false });
    }
    return res.status(200).json({ status: true, data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "server error", Error: error.message });
  }
};

// Update the tast

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      project,
    } = req.body;
    const updated = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        priority,
        dueDate,
        assignedTo,
        project,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "task updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ msg: "server Error", Error: error.message });
  }
};

// this is second method for update

// export const updateTask = async (req, res) => {
//   try {
//     const updated = await Task.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ status: false, msg: "Task not found" });
//     }

//     res.status(200).json({
//       status: true,
//       msg: "Task updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     res.status(500).json({ status: false, msg: "Server Error", error: error.message });
//   }
// };

// Delete the task

export const deleteTask = async (req, res) => {
  try {
    // if we want to delete the project one by one the use these two line
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    // if we want to delete the task , project ect, with login user how create the multiple  project and task etc then use these two line
    // const userid = req.user.id;

    // const deleted = await Task.findOneAndDelete({

    //   createdBy: userid,

    // });

    if (!deleted) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, msg: "server Errro", Error: error.message });
  }
};
