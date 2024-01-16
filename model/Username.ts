import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUsername extends Document {
  username: string;
  userId: mongoose.Types.ObjectId; // Reference to the associated user;
  isPublic: boolean; 
}

const UsernameSchema: Schema<IUsername> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength:2,
    maxlength:20,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isPublic: {
    type: Boolean,
    default: false,
  }
});

UsernameSchema.index({ username: 1 }, { unique: true })

const UsernameModel: Model<IUsername> =
  mongoose.models.Username ||
  mongoose.model<IUsername>("Username", UsernameSchema);

export default UsernameModel;
