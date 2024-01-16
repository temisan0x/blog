/**
 * MongoDB Configuration
 * @param {string} MONGODB_URI - The URI for MongoDB connection.
 */

import { MongoClient, MongoClientOptions } from "mongodb";

declare const global: {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI as string;

/**
 * MongoDB connection options
 * @params {boolean} useNewUrlParser - Whether to use the new URL parser.
 * @params {boolean} useUnifiedTopology - Whether to use the new Server Discovery and Monitoring engine.
 */

const options: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as MongoClientOptions;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((err) => {
    console.error("MongoDB connection error:", err);
    throw err;
  });
}

export default clientPromise;
