import Sesi from "../models/sesi.model.js";

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