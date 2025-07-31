import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
    default: null,
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    default: null,
  },
});

const Store = mongoose.model("store", storeSchema);
export default Store;
