import mongoose from 'mongoose';

/**
 * Intialize Mongoose connection to MongoDB.
 * @returns {Promise<mongoose.Mongoose>} The initialized Mongoose instance
 */

export async function initMongoose(){
   try {
    //Check if connection is already established
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }

    // Connect to MongoDB with specified options
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log("Connected to MongoDB");

    //Return the Mongoose instance for flexibility
    return mongoose;
   } catch (error){
    console.error('Failed to connect to MongoDB', error);
    throw error;
   }
}