//PACKAGES
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import cloudinary from "cloudinary"
import fileupload from "express-fileupload"
//IMPORTS
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"


//CONFIGURATIONS
dotenv.config()
const app = express()
app.use(express.json())
app.use(fileupload({useTempFiles: true}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())


//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRET,
});

//ROUTES
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)


//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
}).catch((error) => {
    console.log(`${error} did not connect`)
})
