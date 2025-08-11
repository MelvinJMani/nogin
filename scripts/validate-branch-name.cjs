#!/usr/bin/env node
/**
 * Enforce branch names like:
 *   feat/..., fix/..., hotfix/..., release/..., test/..., experimental/...
 */
const { execSync } = require("node:child_process");

function getBranchFromGit() {
  try {
    const name = execSync("git rev-parse --abbrev-ref HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return name;
  } catch {
    return null;
  }
}

const input = process.env.BRANCH_NAME || process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || getBranchFromGit() || "";
const branch = input.trim();

const ALLOW_EXACT = new Set(["main", "develop"]);
const PATTERN = /^(feat|fix|hotfix|release|test|experimental)\/[a-z0-9._\-\/]+$/i;

if (!branch) {
  console.error("❌ Could not determine branch name.");
  process.exit(1);
}

if (!PATTERN.test(branch)) {
  console.error(
    [
      "❌ Invalid branch name:",
      `   "${branch}"`,
      "   <type>/<slug>",
      "   Where <type> ∈ { feat, fix, hotfix, release, test, experimental }",
      "   Examples:",
      "     feat/daily-cap-lock",
      "     fix/pwa-register-typing",
      "     hotfix/build-breakage",
      "     release/1.2.0",
      "     test/vitest-setup",
      "     experimental/crosswords-prototype",
    ].join("\n")
  );
  process.exit(1);
}
