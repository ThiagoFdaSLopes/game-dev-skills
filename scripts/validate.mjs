#!/usr/bin/env node
// Structural checks that need no agent CLI: SKILL.md frontmatter, relative links
// inside each skill, and the plugin/marketplace manifests. Exit 1 on any error.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
const errors = [];
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function frontmatter(text, file) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) {
    errors.push(`${file}: missing YAML frontmatter`);
    return {};
  }
  const fields = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].replace(/^(['"])([\s\S]*)\1$/, "$2");
  }
  return fields;
}

for (const skill of readdirSync(skillsDir)) {
  const dir = join(skillsDir, skill);
  if (!statSync(dir).isDirectory()) continue;
  const file = `skills/${skill}/SKILL.md`;
  const path = join(dir, "SKILL.md");
  if (!existsSync(path)) {
    errors.push(`${file}: missing`);
    continue;
  }
  const text = readFileSync(path, "utf8");
  const fm = frontmatter(text, file);
  if (fm.name !== skill) errors.push(`${file}: name "${fm.name}" must equal the folder name "${skill}"`);
  if (fm.name && !NAME.test(fm.name)) errors.push(`${file}: name must be lowercase kebab-case`);
  if (!fm.description) errors.push(`${file}: description is required`);
  else if (fm.description.length > 1024) errors.push(`${file}: description is ${fm.description.length} chars (max 1024)`);
  const lines = text.split(/\r?\n/).length;
  if (lines > 500) errors.push(`${file}: ${lines} lines (keep under 500)`);

  // Every `references/...` path and every relative Markdown link must resolve inside the skill.
  const refs = [...text.matchAll(/`(references\/[^`]+\.md)`/g)].map((m) => m[1]);
  const links = [...text.matchAll(/\]\(([^)#\s]+)\)/g)].map((m) => m[1]).filter((l) => !/^[a-z]+:/i.test(l));
  for (const ref of [...refs, ...links]) {
    const target = resolve(dir, ref);
    if (relative(dir, target).startsWith("..")) errors.push(`${file}: "${ref}" points outside the skill folder`);
    else if (!existsSync(target)) errors.push(`${file}: "${ref}" not found`);
  }
}

function readJson(rel) {
  const p = join(root, rel);
  if (!existsSync(p)) {
    errors.push(`${rel}: missing`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch (e) {
    errors.push(`${rel}: invalid JSON (${e.message})`);
    return null;
  }
}

const plugin = readJson(".claude-plugin/plugin.json");
const market = readJson(".claude-plugin/marketplace.json");
const pkg = readJson("package.json");
if (plugin) {
  for (const k of ["name", "version", "description", "author", "license"]) if (!plugin[k]) errors.push(`plugin.json: "${k}" is required here`);
  if (plugin.name && !NAME.test(plugin.name)) errors.push(`plugin.json: name must be kebab-case`);
}
if (market) {
  if (!market.name || !market.owner?.name || !Array.isArray(market.plugins)) errors.push(`marketplace.json: needs name, owner.name and plugins[]`);
  const entry = market.plugins?.find((p) => p.name === plugin?.name);
  if (!entry) errors.push(`marketplace.json: no entry named "${plugin?.name}"`);
  else if (entry.source !== ".") errors.push(`marketplace.json: entry source must be "." (the repo is the plugin)`);
}
if (plugin && pkg && plugin.version !== pkg.version) errors.push(`version mismatch: plugin.json ${plugin.version} vs package.json ${pkg.version}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("ok: skills and manifests are valid");
