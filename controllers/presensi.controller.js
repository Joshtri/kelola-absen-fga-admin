import { createPresensi, getPresensi, getPresensiBySession} from '../repositories/presensi.repository.js';
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
      res.render('presensi_detail', {
        presensiSesi,
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