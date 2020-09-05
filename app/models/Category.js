import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required!'],
    },
  },
  { timestamps: true },
);

CategorySchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
    };
  },
};

let Category;

try {
  Category = mongoose.model('Category');
} catch (e) {
  Category = mongoose.model('Category', CategorySchema);
}

export default Category;
