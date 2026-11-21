// main.ts — bring-the-humans-03 entry program (Node 22, stdlib only).
//
// The house reads VIDEO.json from the submitted repository and hands the
// entry a bot directory holding it. This program's only job is to copy
// VIDEO.json from the bot directory into the output directory, so the
// scorer can read the entry's TikTok video address from /output.
//
// Env:
//   MAKEFUN_BOT_DIR    — directory holding VIDEO.json (default "/bot")
//   MAKEFUN_OUTPUT_DIR — directory to write VIDEO.json into (default "/output")
//
// Deterministic: same input file, same output bytes, every run. It never
// deletes or renames anything — it only creates the output directory and
// copies the one file.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const SOURCE = join(BOT_DIR, "VIDEO.json");
const TARGET = join(OUTPUT_DIR, "VIDEO.json");

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(SOURCE, TARGET);
  const size = statSync(TARGET).size;
  console.log(`main.ts: copied ${SOURCE} to ${TARGET} (${size} bytes)`);
} catch (error) {
  console.error(`main.ts: failed to copy ${SOURCE} to ${TARGET}: ${error}`);
  process.exit(1);
}
