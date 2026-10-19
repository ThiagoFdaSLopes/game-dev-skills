#!/usr/bin/env node
// Copies every file in shared/ into skills/<name>/references/ so each skill is
// self-contained (per-skill installers copy only the skill folder).
// Usage: node scripts/sync-shared.mjs          write the copies
//        node scripts/sync-shared.mjs --check  exit 1 if any copy is missing or stale
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sharedDir = join(root, "shared");
const skillsDir = join(root, "skills");
const check = process.argv.includes("--check");

const sharedFiles = readdirSync(sharedDir).filter((f) => f.endsWith(".md"));
const skills = readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory());

const problems = [];
for (const skill of skills) {
  const refDir = join(skillsDir, skill, "references");
  if (!check) mkdirSync(refDir, { recursive: true });
  for (const file of sharedFiles) {
    const source = readFileSync(join(sharedDir, file), "utf8");
    const target = join(refDir, file);
    if (check) {
      if (!existsSync(target)) problems.push(`missing: skills/${skill}/references/${file}`);
      else if (readFileSync(target, "utf8") !== source) problems.push(`stale:   skills/${skill}/references/${file}`);
    } else {
      writeFileSync(target, source);
    }
  }
}

if (check) {
  if (problems.length) {
    console.error(problems.join("\n"));
    console.error("\nRun `node scripts/sync-shared.mjs` and commit the result.");
    process.exit(1);
  }
  console.log(`ok: ${sharedFiles.length} shared files in sync across ${skills.length} skills`);
} else {
  console.log(`synced ${sharedFiles.length} shared files into ${skills.length} skills`);
}
