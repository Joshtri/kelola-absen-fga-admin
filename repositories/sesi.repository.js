import Sesi from "../models/sesi.model.js";
import SetSesiActive from "../models/set_sesi.model.js";

export const getSesi = async()=>{
    try {
        const sesi = await Sesi.find();
        return sesi;
    } catch (error) {
        console.log(error);
    }
}

export const createSesi = async(sesiData)=>{
    try {
        const newSesi = await Sesi.create(sesiData);
        return newSesi;
    } catch (error) {
        console.log(error);
    }
}

export const setSesiActive = async(sesiSetActiveData)=>{
    try {
        const newSetActive = await SetSesiActive.create(sesiSetActiveData)
        return newSetActive;
    } catch (error) {
        throw error;
    }
}


export const getSetSesi = async () => {
    try {
        // Mengurutkan berdasarkan _id secara descending (terbaru di atas) dan mengambil satu data pertama
        const SetSesi = await SetSesiActive.find().sort({ _id: -1 }).limit(1);
        return SetSesi;
    } catch (error) {
        throw error;
    }
};


