import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trime: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)
const Product =
    mongoose.models.Product ||
    mongoose.model("Product", ProductSchema)

export default Product;