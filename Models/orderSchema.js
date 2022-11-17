import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  records: [{ type: Schema.Types.ObjectId, ref:"records", required: true }],
  totalPrice: {
    type: Number,
    required: true,
  },
  userId:({type:Schema.Types.ObjectId, ref:"users", required:true})
});

const OrdersCollection = mongoose.model("orders", orderSchema);

export default OrdersCollection;
