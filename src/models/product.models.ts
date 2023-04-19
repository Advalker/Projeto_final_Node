import { Schema } from "mongoose";
import mongoose from "mongoose";


export const productSchema = new Schema({

    name: {
        type: String
    },

    brand: {
        type: String
    },

    cod: {
        type: String
    },

    createAt: {
        type: String || Date,
        default: new Date()
    }
});

export const Product = mongoose.model('Product', productSchema)