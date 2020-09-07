import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required!'],
    },
    __version: [
      {
        vIndex: {
          type: Number,
          default: 0,
        },
        vDoc: {},
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true, versionKey: '__v' },
);

CategorySchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
    };
  },
};

CategorySchema.pre('save', function(next) {
  if(this.__v == undefined) {
    this.__v = 0;
  } else {
    this.__v++;
    let oldDoc = this.toJSON();
    oldDoc['_id'] = undefined;
    this.__version.push({
      vIndex: this.__v,
      vDoc: oldDoc,
      createdAt: Date.now
    });
  }
  
  return next();
});

let Category;

try {
  Category = mongoose.model('Category');
} catch (e) {
  Category = mongoose.model('Category', CategorySchema);
}

export default Category;
