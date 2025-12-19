




import mongoose from "mongoose";
// const thegoblenews jobs  mongodb+srv://mobilelovehimeonline:<db_password>@cluster0.weffwll.mongodb.net/?appName=Cluster0
const MONGODB_URI = "mongodb+srv://shortnewsb:12@cluster0.svutnph.mongodb.net/news?appName=Cluster0";
//mongodb+srv://shortnewsb:<db_password>@cluster0.svutnph.mongodb.net/?appName=Cluster0
if (!MONGODB_URI) {
    throw new Error("❌ Please define MONGODB_URI in .env.local");
}
// news.linksnames
// students
// ✅ Global cache (Next.js safe)
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
export default async function connectMongo() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}



const HomeSchema = new mongoose.Schema({
    title: String,
    description: String,
    service: String,
    name: String,
    sediol: String,
    photo: String, // Cloudinary URL
});





export const Link =
    mongoose.models.links || mongoose.model("links", HomeSchema);
