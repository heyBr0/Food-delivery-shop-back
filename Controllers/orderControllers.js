import OrdersCollection from "../Models/orderSchema.js";
import UsersCollection from "../Models/userSchema.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await OrdersCollection.find().populate(
      "records userId",
      "-__v -_id"
    );

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleOrder = await OrdersCollection.findById(id);
    res.json({ success: true, data: singleOrder });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = new OrdersCollection(req.body);
    await order.save();
    /*const user = await UsersCollection.findById(order.userId)
    user.orders.push(order._id)
    await user.save() */

    const updatedUser = await UsersCollection.findByIdAndUpdate(
      order.userId,
      { $push: { orders: order._id } },
      { new: true }
    ).populate({path:"orders", populate: {
      path: "records", 
      model: "records"
    }});

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const patchOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedOrder = await OrdersCollection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingOrder = await OrdersCollection.findById(id);

    if (existingOrder) {
      await OrdersCollection.deleteOne({
        _id: existingOrder._id,
      });

      // delete order from user orders as well
      const updatedUser = await UsersCollection.findByIdAndUpdate(
        req.user._id,
        { $pull: { orders: id} },
        { new: true }
      ).populate({path:"orders", populate: {
        path: "records", 
        model: "records"
      }});

      res.json({ success: true, data: updatedUser });
    } else {
      throw new Error("record id doesn't exist");
    }
  } catch (error) {
    next(error);
  }
};
