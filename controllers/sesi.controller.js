import { createSesi } from "../repositories/sesi.repository.js";
import { getPeserta } from "../repositories/peserta.repository.js";
import { createPresensi } from "../repositories/presensi.repository.js";

export const createSesiController = async (req, res) => {
    try {
        const sesiData = req.body;

        // Get pesertas from the repository or any other source
        const pesertas = await getPeserta();

        // Create presensi entries for each peserta
        const presensiPromises = pesertas.map(peserta => createPresensi({
            pesertaId: peserta._id,
            live_sesi:sesiData.sesi_ke,
            jam_masuk: '00:00', // Set your default value here
            jam_keluar: '00:00'  // Set your default value here
        }));

        // Wait for all presensi entries to be created
        const presensiEntries = await Promise.all(presensiPromises);

        // Extract presensiIds from the created presensi entries
        const presensiIds = presensiEntries.map(presensi => presensi._id);

        // Add presensiIds to sesiData
        sesiData.presensiIds = presensiIds;

        // Create the new sesi
        const newSesi = await createSesi(sesiData);

        res.redirect('/data/presensi');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};


export const updatePresensiByPeserta = async(req,res)=>{
    try {
      
    } catch (error) {
        throw error;
    }
};
