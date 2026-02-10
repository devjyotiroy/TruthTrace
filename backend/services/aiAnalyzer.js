function analyzePrivacyPolicy(policyText) {
    if (!policyText || policyText === "Policy not found") {
        return {
            score: 0,
            concerns: ["No privacy policy found"],
            positives: []
        };
    }
    
    const text = policyText.toLowerCase();
    const concerns = [];
    const positives = [];
    let score = 50; // Base score
    
    // Positive indicators
    const positiveKeywords = {
        'gdpr compliant': 10,
        'ccpa compliant': 10,
        'data encryption': 8,
        'user consent': 8,
        'opt-out': 7,
        'data deletion': 7,
        'anonymized': 6,
        'minimal data': 6,
        'no selling': 8,
        'transparent': 5
    };
    
    Object.entries(positiveKeywords).forEach(([keyword, points]) => {
        if (text.includes(keyword)) {
            score += points;
            positives.push(`Policy mentions: ${keyword}`);
        }
    });
    
    // Negative indicators
    const negativeKeywords = {
        'third party': -8,
        'share data': -10,
        'sell information': -15,
        'advertising partners': -8,
        'tracking cookies': -7,
        'behavioral advertising': -10,
        'indefinitely': -8,
        'may share': -7,
        'affiliates': -5
    };
    
    Object.entries(negativeKeywords).forEach(([keyword, points]) => {
        if (text.includes(keyword)) {
            score += points;
            concerns.push(`Policy contains: ${keyword}`);
        }
    });
    
    // Vague language detection
    const vagueTerms = ['may', 'might', 'could', 'possibly', 'sometimes'];
    const vagueCount = vagueTerms.filter(term => text.includes(term)).length;
    
    if (vagueCount > 5) {
        score -= 10;
        concerns.push('Policy uses vague language frequently');
    }
    
    // Length analysis
    const wordCount = text.split(/\\s+/).length;
    if (wordCount < 200) {
        score -= 15;
        concerns.push('Privacy policy is too short (lacks detail)');
    } else if (wordCount > 5000) {
        score -= 5;
        concerns.push('Privacy policy is excessively long (may hide important info)');
    }
    
    // Data retention
    if (!text.includes('retention') && !text.includes('delete')) {
        score -= 8;
        concerns.push('No clear data retention policy');
    }
    
    // User rights
    const userRights = ['access', 'rectify', 'delete', 'port', 'object'];
    const rightsCount = userRights.filter(right => text.includes(right)).length;
    
    if (rightsCount >= 3) {
        score += 10;
        positives.push('User rights clearly defined');
    } else {
        score -= 5;
        concerns.push('Limited user rights mentioned');
    }
    
    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    
    return {
        score,
        concerns,
        positives
    };
}

function extractPolicyInsights(policyText) {
    if (!policyText || policyText === "Policy not found") {
        return {
            dataCollected: "Unknown",
            thirdPartySharing: "Unknown",
            userRights: "Unknown"
        };
    }
    
    const text = policyText.toLowerCase();
    
    // Data collection analysis
    let dataCollected = "Not specified";
    if (text.includes('personal information') || text.includes('personal data')) {
        dataCollected = "Personal information collected";
    }
    if (text.includes('no data') || text.includes('minimal data')) {
        dataCollected = "Minimal data collection";
    }
    
    // Third-party sharing
    let thirdPartySharing = "Not specified";
    if (text.includes('no third party') || text.includes('not share')) {
        thirdPartySharing = "No third-party sharing";
    } else if (text.includes('third party') || text.includes('partners')) {
        thirdPartySharing = "Data shared with third parties";
    }
    
    // User rights
    let userRights = "Not specified";
    if (text.includes('access') && text.includes('delete')) {
        userRights = "Access and deletion rights provided";
    } else if (text.includes('gdpr') || text.includes('ccpa')) {
        userRights = "Regulatory compliance mentioned";
    }
    
    return {
        dataCollected,
        thirdPartySharing,
        userRights
    };
}

module.exports = { analyzePrivacyPolicy, extractPolicyInsights };
