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
        const presensi = await Presensi.find()
        return presensi;
        
    } catch (error) {
        throw error;
    }
}

export const getPresensiBySession = async (liveSesi) => {
    try {
        const presensiSession = await Presensi.find({ live_sesi: liveSesi }).populate('pesertaId');
        return presensiSession;
    } catch (error) {
        throw error;
    }
};

export const updatePresensiByLiveSesiandPesertaId = async(pesertaId,liveSesi)=>{
    try {
        // const updatePresensi = await Presensi.findOneAndUpdate({})
    } catch (error) {
        throw error;
    }
}

export const totalPesertaBySesi = async(liveSesi)=>{
    try {
        const totalPesertaPresensi = await Presensi.countDocuments({live_sesi:liveSesi});
        return totalPesertaPresensi;
    } catch (error) {
        throw error;
    }
};

export const totalHadirBySesi = async(liveSesi)=>{
    try {
        const totalHadir = await Presensi.countDocuments({
            live_sesi:liveSesi,
            status_kehadiran: 'hadir'
        });

        return totalHadir
    } catch (error) {
        throw error;
    }
}

export const totalAlphaBySesi = async(liveSesi)=>{
    try {
        const totalAlpha = await Presensi.countDocuments({
            live_sesi: liveSesi,
            status_kehadiran:'alpha'
        });

        return totalAlpha;
    } catch (error) {
        throw error;
    }
}