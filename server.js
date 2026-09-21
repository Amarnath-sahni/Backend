// import {connectDB} from "./src/config/database.config.js";
// import app from './app.js'

// connectDB().then(()=>{
//     app.listen(process.env.PORT,()=>{
//         if(err){
//             console.log("error while starting the server");
//             process.exit(1)
//         }else{
//             console.log(`server running at ${process.env.PORT}`)
//         }
//     })

// }).catch(()=>{
//      console.log("error while starting the server");
//       if(err){
//             console.log(err);
//         }
// });

//? ===============================
//?  SERVER ENTRY POINT
//? ===============================

import app from "./app.js";
import { connectDB } from "./src/config/database.config.js";
import dotenv from "dotenv";

dotenv.config({quiet: true});

//? Ensure PORT exists
const PORT = process.env.PORT || 5000;


//? ===============================
//?  CONNECT DATABASE → THEN START SERVER
//? ===============================

const startServer = async () => {
  try {
    //! Connect to MongoDB
    await connectDB();
    console.log("📦 MongoDB connected successfully");

    //! Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    const message = err?.message ?? err;
    console.error("❌ Server startup failed:", message);
    process.exit(1); //! Stop process if DB/server fails
  }
};


//? Start Server
startServer();


