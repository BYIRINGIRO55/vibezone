import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strickQuery', true)

    if (isConnected) {
        console.log("MongoDB is arleady connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "VibeZone",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log("Mongodb is connected")
    } catch (error) {
        console.log(error)
    }
}