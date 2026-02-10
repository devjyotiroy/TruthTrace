const express = require("express");
const scanWebsite = require("../services/scanner");
const fetchPolicy = require("../services/policyAnalyzer");
const calculateDrift = require("../services/driftEngine");
const { analyzeSecurityThreats, categorizeTrackers } = require("../services/securityAnalyzer");
const { analyzePrivacyPolicy, extractPolicyInsights } = require("../services/aiAnalyzer");
const auth = require("../middleware/auth");
const ScanHistory = require("../models/ScanHistory");

const router = express.Router();

router.post("/scan", auth, async (req, res) => {
    try {
        const { url } = req.body;
        console.log('Scan request from user:', req.userId, 'for URL:', url);

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        // Validate URL format
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        console.log(`Scanning: ${url}`);

        // Scan website for trackers
        const trackers = await scanWebsite(url);
        console.log(`Found ${trackers.length} trackers`);

        // Fetch and analyze privacy policy
        const policyText = await fetchPolicy(url);
        console.log(`Policy found: ${policyText !== "Policy not found"}`);

        // Calculate privacy drift score
        const driftScore = calculateDrift(trackers, policyText);

        // Analyze security threats
        const securityIssues = analyzeSecurityThreats(trackers, policyText);

        // Categorize trackers
        const trackerCategories = categorizeTrackers(trackers);

        // AI-based policy analysis
        const policyAnalysis = analyzePrivacyPolicy(policyText);
        const policyInsights = extractPolicyInsights(policyText);

        // Determine risk level
        const riskLevel = driftScore > 60 ? "High" : driftScore > 30 ? "Medium" : "Low";

        // Save to database
        const scanHistory = new ScanHistory({
            userId: req.userId,
            url,
            trackerCount: trackers.length,
            driftScore,
            riskLevel
        });
        await scanHistory.save();

        res.json({ 
            trackers,
            trackerCount: trackers.length,
            driftScore,
            riskLevel,
            policyFound: policyText !== "Policy not found",
            securityIssues,
            trackerCategories,
            policyAnalysis,
            policyInsights
        });

    } catch (error) {
        console.error("Scan error:", error.message);
        console.error("Stack:", error.stack);
        res.status(500).json({ error: error.message || "Failed to scan website" });
    }
});

// Get scan history
router.get("/history", auth, async (req, res) => {
    try {
        const history = await ScanHistory.find({ userId: req.userId })
            .sort({ scannedAt: -1 })
            .limit(20);
        res.json({ history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
