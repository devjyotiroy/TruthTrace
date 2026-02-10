function analyzeSecurityThreats(trackers, policyText) {
    const securityIssues = [];
    
    // Check for known malicious trackers
    const suspiciousTrackers = [
        'cryptominer', 'malware', 'phishing', 'adware', 'spyware'
    ];
    
    trackers.forEach(tracker => {
        if (suspiciousTrackers.some(threat => tracker.toLowerCase().includes(threat))) {
            securityIssues.push(`Potentially malicious tracker detected: ${tracker}`);
        }
    });
    
    // Check for excessive tracking
    if (trackers.length > 15) {
        securityIssues.push(`Excessive tracking detected: ${trackers.length} trackers found (High Risk)`);
    } else if (trackers.length > 10) {
        securityIssues.push(`High number of trackers: ${trackers.length} trackers detected`);
    }
    
    // Check for fingerprinting scripts
    const fingerprintingKeywords = ['fingerprint', 'canvas', 'webgl', 'audioctx'];
    trackers.forEach(tracker => {
        if (fingerprintingKeywords.some(keyword => tracker.toLowerCase().includes(keyword))) {
            securityIssues.push('Browser fingerprinting detected - Advanced tracking technique');
        }
    });
    
    // Check for cross-site tracking
    const uniqueDomains = new Set(trackers.map(t => {
        try {
            return new URL(t).hostname;
        } catch {
            return null;
        }
    }).filter(Boolean));
    
    if (uniqueDomains.size > 8) {
        securityIssues.push(`Cross-site tracking risk: Data shared with ${uniqueDomains.size} third-party domains`);
    }
    
    // Check for advertising networks
    const adNetworks = ['doubleclick', 'adsense', 'adservice', 'advertising'];
    const hasAds = trackers.some(t => adNetworks.some(ad => t.toLowerCase().includes(ad)));
    
    if (hasAds && policyText.includes('no ads')) {
        securityIssues.push('Privacy policy claims "no ads" but advertising trackers detected');
    }
    
    // Check for social media tracking
    const socialTrackers = ['facebook', 'twitter', 'linkedin', 'instagram', 'tiktok'];
    const socialCount = trackers.filter(t => 
        socialTrackers.some(social => t.toLowerCase().includes(social))
    ).length;
    
    if (socialCount > 0) {
        securityIssues.push(`Social media tracking detected: ${socialCount} social network tracker(s)`);
    }
    
    // Check for analytics without disclosure
    const analyticsTrackers = trackers.filter(t => 
        t.toLowerCase().includes('analytics') || t.toLowerCase().includes('google-analytics')
    );
    
    if (analyticsTrackers.length > 0 && policyText.includes('no data collection')) {
        securityIssues.push('Privacy policy claims "no data collection" but analytics trackers found');
    }
    
    // Check for missing HTTPS
    const insecureTrackers = trackers.filter(t => t.startsWith('http://'));
    if (insecureTrackers.length > 0) {
        securityIssues.push(`Insecure tracking detected: ${insecureTrackers.length} non-HTTPS tracker(s)`);
    }
    
    return [...new Set(securityIssues)];
}

function categorizeTrackers(trackers) {
    const categories = {
        analytics: [],
        advertising: [],
        social: [],
        other: []
    };
    
    const analyticsKeywords = ['analytics', 'google-analytics', 'googletagmanager', 'stats'];
    const adKeywords = ['doubleclick', 'adsense', 'adservice', 'advertising', 'ads'];
    const socialKeywords = ['facebook', 'twitter', 'linkedin', 'instagram', 'pinterest', 'tiktok'];
    
    trackers.forEach(tracker => {
        const lowerTracker = tracker.toLowerCase();
        
        if (analyticsKeywords.some(k => lowerTracker.includes(k))) {
            categories.analytics.push(tracker);
        } else if (adKeywords.some(k => lowerTracker.includes(k))) {
            categories.advertising.push(tracker);
        } else if (socialKeywords.some(k => lowerTracker.includes(k))) {
            categories.social.push(tracker);
        } else {
            categories.other.push(tracker);
        }
    });
    
    return categories;
}

module.exports = { analyzeSecurityThreats, categorizeTrackers };
