import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface ICertificate extends Document {
    _id: Types.ObjectId;
    name: string;
    credentials_url: string;
    year_obtained: string;
    theme_color: string;
    logo_src: string;
}

// Mongoose Schema for Certificate
const CertificateSchema: Schema<ICertificate> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        credentials_url: {
            type: String,
            trim: true,
        },
        logo_src: {
            type: String,
            trim: true,
        },
        theme_color: {
            type: String,
            trim: true,
        },
        year_obtained: {
            type: String,
            trim: true,
        },
    },
    {
        collection: 'certifications',
        timestamps: true, // Adds createdAt and updatedAt timestamps
        // Optional: Define a transform for toJSON to map _id to id for GraphQL
        toJSON: {
            virtuals: true, // Ensure virtuals are included
            transform(doc, ret) {
                ret.id = ret._id; // Map _id to id
                delete ret._id; // Remove _id
                delete ret.__v; // Remove __v
            },
        },
        toObject: {
            // Also apply transform for toObject if needed
            virtuals: true,
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

// Create a virtual 'id' field that gets the string representation of '_id'
// This is often preferred for GraphQL to ensure 'id' is a string.
CertificateSchema.virtual('id').get(function (this: ICertificate) {
    return this._id.toHexString();
});

// Create and export the Mongoose model
// The mongoose.models.Certificate check prevents redefining the model during hot reloads
const Certificate: Model<ICertificate> =
    mongoose.models.Certificate ||
    mongoose.model<ICertificate>('Certificate', CertificateSchema);

export default Certificate;
