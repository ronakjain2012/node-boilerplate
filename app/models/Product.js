import mongoose from 'mongoose';
import Category from './Category.js';
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required!'],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Category, is required!'],
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    symbol: {
      type: String,
      trim: true,
      required: [true, 'Symbol is required!'],
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    net_price: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, virtuals: true },
);
ProductSchema.virtual('category_lookup').get( async function () {
  return (await this.getCategoryLookup());
});
ProductSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      category: this.category,
      image: this.image,
      price: this.price,
      symbol: this.symbol,
      discount: this.discount,
      net_price: this.net_price,
      description: this.description,
      category_lookup: this.category_lookup
    };
  },
};

ProductSchema.method('getCategoryLookup', async function () {
  let category_lookup = await Category.findById(this.category);
  if(category_lookup){
    return category_lookup.name;
  } else {
    return null;
  }
});

ProductSchema.pre('save', function (next) {
  if (this.isModified('discount')) {
    this.net_price = (this.price-((this.price * this.discount) / 100)).toFixed(2);
    return next();
  } else {
    this.net_price = this.price;
  }
  return next();
});

let Product;

try {
  Product = mongoose.model('Product');
} catch (e) {
  Product = mongoose.model('Product', ProductSchema);
}

export default Product;
