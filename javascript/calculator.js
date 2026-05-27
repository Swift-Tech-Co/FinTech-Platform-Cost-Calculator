/**
 * FinTech Platform Cost Calculator
 * Swift Tech Co. — https://swifttechco.com
 *
 * Estimates build cost and timeline for FinTech platforms.
 */

const PLATFORMS = {
  "Payment Gateway":  [12, 35],
  "Digital Wallet":   [18, 50],
  "Trading Platform": [25, 75],
  "Neobank":          [40, 120],
  "Crypto Exchange":  [35, 95],
};

const USER_RANGES = [
  "< 1,000 users",
  "1,000 to 10,000 users",
  "10,000 to 100,000 users",
  "100,000+ users",
];
const USER_MULTIPLIERS = [1.0, 1.25, 1.6, 2.2];

const FEATURES = [
  "KYC / AML compliance",
  "Multi-currency support",
  "Real-time transactions",
  "Third-party API integrations",
  "Mobile app (iOS & Android)",
  "Admin dashboard",
];

const COMPLIANCE_LEVELS = [
  "Basic (internal use)",
  "Standard (PCI-DSS)",
  "Enterprise (PCI-DSS + GDPR + SOC2)",
];
const COMPLIANCE_MULTIPLIERS = [1.0, 1.35, 1.8];

/**
 * Calculate FinTech platform cost and timeline.
 *
 * @param {string} platform - One of the PLATFORMS keys.
 * @param {string} userRange - One of USER_RANGES.
 * @param {string[]} features - Array of feature strings from FEATURES.
 * @param {string} compliance - One of COMPLIANCE_LEVELS.
 * @returns {{ lowK: number, highK: number, weeks: number }}
 */
function calculate(platform, userRange, features, compliance) {
  if (!PLATFORMS[platform]) throw new Error(`Unknown platform: ${platform}`);
  const uIdx = USER_RANGES.indexOf(userRange);
  if (uIdx === -1) throw new Error(`Unknown user range: ${userRange}`);
  const cIdx = COMPLIANCE_LEVELS.indexOf(compliance);
  if (cIdx === -1) throw new Error(`Unknown compliance level: ${compliance}`);

  const [lo, hi] = PLATFORMS[platform];
  const um = USER_MULTIPLIERS[uIdx];
  const fm = 1 + features.length * 0.12;
  const cm = COMPLIANCE_MULTIPLIERS[cIdx];
  const weeks = Math.round(12 + features.length * 2 + cIdx * 4 + uIdx * 2);

  return {
    lowK:  Math.round(lo * um * fm * cm),
    highK: Math.round(hi * um * fm * cm),
    weeks,
  };
}

module.exports = { PLATFORMS, USER_RANGES, FEATURES, COMPLIANCE_LEVELS, calculate };
