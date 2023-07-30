const Babysitter = require("../models/Babysitter")
exports.createBabysitter = async (req, res) => {

    try {
        await Babysitter
        .insertMany(req.body)
        .then(() =>
          res.status(200).json({ success: true, message: "product added" })
        )
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }

}