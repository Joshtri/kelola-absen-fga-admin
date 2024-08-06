import mongoose from "mongoose";


const sesiSchema = new mongoose.Schema({
    sesi_ke:{
        type:Number,
        required:true
    }
});

const Sesi = mongoose.model("Sesi", sesiSchema);
export default Sesi;