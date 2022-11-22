import RecordsCollection from "../Models/recordSchema.js";

// GET
export const getRecords = async (req, res, next) => {
  try {
    const records = await RecordsCollection.find();
    res.json(records);
  } catch (error) {
    next(error)
  }
};

export const getSingleRecord = async (req, res, next) => {
  //"/records/:id"
  try {
    const id = req.params.id;
    const singleRecord = await RecordsCollection.findById(id);
    res.json({ success: true, record: singleRecord });
  } catch (error) {
    next(error)
  }
};

// POST
export const createRecord = async (req, res, next) => {
  try {
    const record = new RecordsCollection(req.body);
    await record.save();
    res.json({ success: true, record: record });
  } catch (error) {
    next(error)
  }
};

// UPDATE
export const patchRecord = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRecord = await RecordsCollection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json({ success: true, record: updatedRecord });
  } catch (error) {
    next(error)
  }
};
// simple DELETE
/* export const deleteRecord = async(req, res) => {
try {
  const {id} = req.params;
  const deletedRecord = await RecordsCollection.findByIdAndDelete(id)
  res.json({success:true, status: deletedRecord})
} catch (error) {
  res.json({ success: false, message: error.message });
}
}; */

// alternative DELETE with error message

export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingRecord = await RecordsCollection.findById(id);

    if (existingRecord) {
      const deleteStatus = await RecordsCollection.deleteOne({
        _id: existingRecord._id,
      });
      res.json({ success: true, status: deleteStatus });
    } else {
      throw new Error("record id doesn't exist");
    }
  } catch (error) {
    next(error)
  }
};
