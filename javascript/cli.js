#!/usr/bin/env node
/**
 * FinTech Platform Cost Calculator — CLI
 * Swift Tech Co. — https://swifttechco.com
 *
 * Usage:
 *   node cli.js
 *   node cli.js --platform "Payment Gateway" --users "1,000 to 10,000 users" \
 *               --features "KYC / AML compliance,Real-time transactions" \
 *               --compliance "Standard (PCI-DSS)"
 */

const { PLATFORMS, USER_RANGES, FEATURES, COMPLIANCE_LEVELS, calculate } = require("./calculator");
const readline = require("readline");

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : null;
}

function printResult(result) {
  console.log(`\nCost:     $${result.lowK}K to $${result.highK}K USD`);
  console.log(`Timeline: ${result.weeks} weeks`);
  console.log("\nBallpark estimate. Final pricing confirmed after discovery call.");
  console.log("Get a detailed quote: https://swifttechco.com/contact");
}

const platform  = getArg("--platform");
const userRange = getArg("--users");
const featRaw   = getArg("--features");
const compliance = getArg("--compliance");

if (platform && userRange && compliance) {
  const features = featRaw ? featRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  try {
    const result = calculate(platform, userRange, features, compliance);
    printResult(result);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  process.exit(0);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function interactive() {
  console.log("\nFinTech Platform Cost Calculator");
  console.log("Swift Tech Co. — https://swifttechco.com");
  console.log("=".repeat(48));

  const platforms = Object.keys(PLATFORMS);
  console.log("\nPlatform type:");
  platforms.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  const pIdx = parseInt(await ask("Select (1-5): "), 10) - 1;

  console.log("\nExpected user base:");
  USER_RANGES.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));
  const uIdx = parseInt(await ask("Select (1-4): "), 10) - 1;

  console.log("\nRequired features (comma-separated numbers, or leave blank):");
  FEATURES.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  const featRaw = await ask("Select features: ");
  const features = featRaw.trim()
    ? featRaw.split(",").map(s => FEATURES[parseInt(s.trim(), 10) - 1]).filter(Boolean)
    : [];

  console.log("\nCompliance level:");
  COMPLIANCE_LEVELS.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
  const cIdx = parseInt(await ask("Select (1-3): "), 10) - 1;

  rl.close();

  const result = calculate(platforms[pIdx], USER_RANGES[uIdx], features, COMPLIANCE_LEVELS[cIdx]);
  console.log("\n" + "=".repeat(48));
  console.log("Your Estimate");
  printResult(result);
}

interactive().catch(e => { console.error(e.message); process.exit(1); });
