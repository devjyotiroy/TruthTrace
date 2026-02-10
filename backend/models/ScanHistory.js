const mongoose = require("mongoose");

const scanHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    trackerCount: Number,
    driftScore: Number,
    riskLevel: String,
    scannedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ScanHistory", scanHistorySchema);
