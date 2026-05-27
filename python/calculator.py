"""
FinTech Platform Cost Calculator
Swift Tech Co. — https://swifttechco.com

Estimates build cost and timeline for FinTech platforms based on platform type,
user scale, feature set, and compliance requirements.
"""

PLATFORMS = {
    "Payment Gateway":    (12, 35),
    "Digital Wallet":     (18, 50),
    "Trading Platform":   (25, 75),
    "Neobank":            (40, 120),
    "Crypto Exchange":    (35, 95),
}

USER_RANGES = [
    "< 1,000 users",
    "1,000 to 10,000 users",
    "10,000 to 100,000 users",
    "100,000+ users",
]
USER_MULTIPLIERS = [1.0, 1.25, 1.6, 2.2]

FEATURES = [
    "KYC / AML compliance",
    "Multi-currency support",
    "Real-time transactions",
    "Third-party API integrations",
    "Mobile app (iOS & Android)",
    "Admin dashboard",
]

COMPLIANCE_LEVELS = [
    "Basic (internal use)",
    "Standard (PCI-DSS)",
    "Enterprise (PCI-DSS + GDPR + SOC2)",
]
COMPLIANCE_MULTIPLIERS = [1.0, 1.35, 1.8]


def calculate(platform: str, user_range: str, features: list, compliance: str) -> dict:
    """
    Returns estimated cost range (USD thousands) and timeline (weeks).

    Args:
        platform: One of the PLATFORMS keys.
        user_range: One of USER_RANGES.
        features: List of strings from FEATURES.
        compliance: One of COMPLIANCE_LEVELS.

    Returns:
        dict with keys: low_k, high_k, weeks
    """
    if platform not in PLATFORMS:
        raise ValueError(f"Unknown platform: {platform}")
    if user_range not in USER_RANGES:
        raise ValueError(f"Unknown user range: {user_range}")
    if compliance not in COMPLIANCE_LEVELS:
        raise ValueError(f"Unknown compliance level: {compliance}")

    lo, hi = PLATFORMS[platform]
    um = USER_MULTIPLIERS[USER_RANGES.index(user_range)]
    fm = 1 + len(features) * 0.12
    cm = COMPLIANCE_MULTIPLIERS[COMPLIANCE_LEVELS.index(compliance)]
    ci = COMPLIANCE_LEVELS.index(compliance)
    ui = USER_RANGES.index(user_range)
    weeks = round(12 + len(features) * 2 + ci * 4 + ui * 2)

    return {
        "low_k":  round(lo * um * fm * cm),
        "high_k": round(hi * um * fm * cm),
        "weeks":  weeks,
    }
