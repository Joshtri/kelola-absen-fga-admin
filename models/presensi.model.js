import mongoose from "mongoose";

const presensiSchema = new mongoose.Schema({

    pesertaId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Peserta',
        required: true
    },

    jam_masuk:{
        type:Date,
        required:true
    },

    jam_keluar:{
        type:Date,
        required:true
    },
    live_sesi:{
        type:Number,
        required:false
    },
    status_kehadiran:{
        type:String,
        enum:[
            'hadir',
            'alpha',
            'izin',
            'sakit'
        ],
        required:true,
        default:'alpha'
    }
},{
    timestamps:true
});

const Presensi = mongoose.model("Presensi", presensiSchema);
export default Presensi;