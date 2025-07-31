import Feature from "../models/Feature.js";

export const createFeature = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const feature = await Feature.create({
      title,
      description,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating feature" });
  }
};

export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.find({ createdBy: req.user.id });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch features" });
  }
};

export const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const feature = await Feature.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { title, description, status },
      { new: true }
    );
    console.log(req.body);
    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json(feature);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating feature" });
  }
};

export const deleteFeature = async (req, res) => {
  const { id } = req.params;

  try {
    const feature = await Feature.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json({ message: "Feature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feature" });
  }
};
