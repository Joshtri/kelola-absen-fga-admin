import Presensi from "../models/presensi.model.js";

export const createPresensi = async(presensiData)=>{
    try {
        const newPresensi = await Presensi.create(presensiData);
        return newPresensi;

    } catch (error) {
        throw error;
    }
}


export const getPresensi = async()=>{
    try {
        const presensi = await Presensi.find();
        return presensi;
        
    } catch (error) {
        throw error;
    }
}

export const getPresensiBySession = async (liveSesi) => {
    try {
        const presensiSession = await Presensi.find({ live_sesi: liveSesi });
        return presensiSession;
    } catch (error) {
        throw error;
    }
};