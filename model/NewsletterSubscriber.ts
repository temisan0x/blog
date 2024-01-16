import mongoose, { Schema, model, Document } from "mongoose";

interface NewsletterSubscriberDoc extends Document {
    email: string;
    createAt: Date;
}

const newsletterSubcriberSchema = new Schema<NewsletterSubscriberDoc>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createAt: {
        type:Date,
        default: Date.now,
    }
},{timestamps: true});

export default mongoose.models.NewsletterSubcriber ||
    mongoose.model<NewsletterSubscriberDoc>("NewsletterSubcriber", newsletterSubcriberSchema)