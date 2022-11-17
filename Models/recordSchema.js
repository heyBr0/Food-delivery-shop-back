import mongoose from "mongoose";

const Schema = mongoose.Schema;
// document structure
const recordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  /*   currency: {
    type: Enum,
    values: ["€", "$"],
  }, */
});

// create collection and store such type of documents in that collection
const RecordsCollection = mongoose.model("records", recordSchema);

export default RecordsCollection;
