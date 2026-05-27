#!/usr/bin/env python3
"""
FinTech Platform Cost Calculator — CLI
Swift Tech Co. — https://swifttechco.com

Usage:
    python cli.py
    python cli.py --platform "Payment Gateway" --users "1,000 to 10,000 users" \
                  --features "KYC / AML compliance,Real-time transactions" \
                  --compliance "Standard (PCI-DSS)"
"""

import argparse
import sys
from calculator import PLATFORMS, USER_RANGES, FEATURES, COMPLIANCE_LEVELS, calculate


def interactive():
    print("\nFinTech Platform Cost Calculator")
    print("Swift Tech Co. — https://swifttechco.com")
    print("=" * 48)

    print("\nPlatform type:")
    platforms = list(PLATFORMS.keys())
    for i, p in enumerate(platforms, 1):
        print(f"  {i}. {p}")
    idx = int(input("Select (1-5): ")) - 1
    platform = platforms[idx]

    print("\nExpected user base:")
    for i, r in enumerate(USER_RANGES, 1):
        print(f"  {i}. {r}")
    idx = int(input("Select (1-4): ")) - 1
    user_range = USER_RANGES[idx]

    print("\nRequired features (enter numbers, comma-separated, or leave blank):")
    for i, f in enumerate(FEATURES, 1):
        print(f"  {i}. {f}")
    raw = input("Select features: ").strip()
    features = []
    if raw:
        for n in raw.split(","):
            n = n.strip()
            if n.isdigit():
                features.append(FEATURES[int(n) - 1])

    print("\nCompliance level:")
    for i, c in enumerate(COMPLIANCE_LEVELS, 1):
        print(f"  {i}. {c}")
    idx = int(input("Select (1-3): ")) - 1
    compliance = COMPLIANCE_LEVELS[idx]

    result = calculate(platform, user_range, features, compliance)

    print("\n" + "=" * 48)
    print("Your Estimate")
    print(f"  Build cost:  ${result['low_k']}K to ${result['high_k']}K USD")
    print(f"  Timeline:    {result['weeks']} weeks")
    print("\nBallpark estimate. Final pricing depends on design complexity,")
    print("third-party integrations, and regional regulatory requirements.")
    print("\nGet a detailed quote: https://swifttechco.com/contact")


def main():
    parser = argparse.ArgumentParser(description="FinTech Platform Cost Calculator")
    parser.add_argument("--platform", choices=list(PLATFORMS.keys()))
    parser.add_argument("--users", choices=USER_RANGES)
    parser.add_argument("--features", default="",
                        help="Comma-separated list of features")
    parser.add_argument("--compliance", choices=COMPLIANCE_LEVELS)
    args = parser.parse_args()

    if not all([args.platform, args.users, args.compliance]):
        interactive()
        return

    features = [f.strip() for f in args.features.split(",") if f.strip()] if args.features else []
    result = calculate(args.platform, args.users, features, args.compliance)
    print(f"Cost: ${result['low_k']}K to ${result['high_k']}K | Timeline: {result['weeks']} weeks")


if __name__ == "__main__":
    main()
