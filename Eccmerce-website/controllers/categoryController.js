import { Category } from "../models/Category.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    // const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "name and description are required" });
    }
    const existingCategory = await findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "category already exists" });
    }
    const slug = slugify(name);
    const category = await Category.create({
      name,
      description,
      slug,
      createdBy: req.user._id,
    });
    return res.status(200).json({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "server Error", Error: error.message });
  }
};

// get a single category by slug

export const getCategoryBySlug = async (req, res) => {
  try {
    const slug = req.params;
    const category = await findOne({ slug });
    if (!category) {
      return res
        .status(404)
        .json({ success: true, message: "category not found" });
    }
    return res.status(200).json({ success: true, category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: error.message });
  }
};

// update category

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(name && { name }),
          ...(description && { description }),
          ...(slug && { slug }),
        },
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ msg: "category not found" });
    }
    return res
      .status(200)
      .json({ msg: "category updated successfully", category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: error.message });
  }
};

//  Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      deleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
