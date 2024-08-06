import { createSesi } from "../repositories/sesi.repository.js";

export const createSesiController = async (req, res) => {
    try {
        const sesiData = req.body;
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