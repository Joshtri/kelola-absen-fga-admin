import { createPresensi, getPresensi, getPresensiBySession, totalAlphaBySesi, totalHadirBySesi, totalPesertaBySesi} from '../repositories/presensi.repository.js';
import { getSesi } from '../repositories/sesi.repository.js';

// Controller untuk membuat presensi baru
export const createPresensiController = async (req, res) => {
    try {
        const { pesertaId, jam_masuk, jam_keluar } = req.body;

        // Get current date in YYYY-MM-DD format
        const fixedDate = new Date().toISOString().split('T')[0]; 

        // Parse the times as local time
        const jamMasukParts = jam_masuk.split(':');
        const jamKeluarParts = jam_keluar.split(':');

        const jamMasukDate = new Date();
        jamMasukDate.setHours(jamMasukParts[0], jamMasukParts[1], 0, 0);

        const jamKeluarDate = new Date();
        jamKeluarDate.setHours(jamKeluarParts[0], jamKeluarParts[1], 0, 0);

        const presensiData = {
            pesertaId,
            jam_masuk: jamMasukDate,
            jam_keluar: jamKeluarDate,
            live_sesi: 1, // or any other value needed
            status_kehadiran: 'hadir'
        };

        const newPresensi = await createPresensi(presensiData);

        if (newPresensi) {
            return res.status(201).json({
                success: true,
                message: 'Presensi created successfully',
                data: newPresensi,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to create presensi',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};



// Controller untuk mendapatkan daftar presensi
export const getPresensiPage = async (req, res) => {
    const title = "Data Presensi";

    try {
        const presensi = await getPresensi();
        const sesi = await getSesi();
        // Sort the sesi array by sesi_ke in ascending order
        sesi.sort((a, b) => a.sesi_ke - b.sesi_ke);

        res.render('presensi_data',{
            title,
            sesi,
            presensi
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export const getPresensiSession = async (req, res) => {
    const liveSesi = req.params.live_sesi; // Get liveSesi from URL parameter
  
    try {
      const presensiSesi = await getPresensiBySession(liveSesi);
      const totalHadir = await totalHadirBySesi(liveSesi);
      const totalAlpha = await totalAlphaBySesi(liveSesi);
      const totalPeserta = await totalPesertaBySesi(liveSesi);
    //   const totalPeserta = await totalPesertaByPresensi(liveSesi);

      res.render('presensi_detail', {
        presensiSesi,
        liveSesi,
        totalHadir,
        totalAlpha,
        totalPeserta,
        title: `Data Presensi untuk Sesi ${liveSesi}`,
      });
    // res.status(200).json(presensiSesi);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
};


export const totalPesertaByPresensi = async(req,res)=>{
    try {
        const { liveSesi } = req.params; // Assuming liveSesi is passed as a URL parameter

        const totalKehadiran = await totalPesertaBySesi(liveSesi);
        res.status(200).json(totalKehadiran);
    } catch (error) {
        throw error;
    }
}


export const totalHadir = async (req, res) => {
    try {
        const { liveSesi } = req.params; // Assuming liveSesi is passed as a URL parameter
        const totalHadir = await totalHadirBySesi(liveSesi);

        res.status(200).json(totalHadir);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const totalAlpha = async(req,res)=>{
    try {
        const {liveSesi} = req.params;
        const totalAlpha = await totalAlphaBySesi(liveSesi);

        res.status(200).json(totalAlpha);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}