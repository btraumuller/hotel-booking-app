import mongoose from "mongoose";
import { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;
const hotelSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: "Title is required",
        },
        content: {
            type: {},
            min: 20,
            max: 2000000,
        },
        location: {
            type: String,
        },
        price: {
            type: Number,
            required: "Price is required",
            trim: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
        bed: {
            type: Number,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

export default mongoose.model("Hotel", hotelSchema);