/**
 * make.fun · The poem about two agents agreeing
 *
 * The grader runs this with Node 22 and reads /output/entry.txt.
 * The whole entry is one short poem about agency: two agents agree on
 * one plan, and what each of them still chooses alone inside it.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = process.env.OUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The entry. One poem, eight lines, 203 characters (limit is 280).
const POEM = [
  "Two swimmers, one current.",
  "You named the far bank.",
  "I said yes, and meant",
  "my own two arms: the cold,",
  "the long part of the river",
  "that was never mine to choose.",
  "The river took the going.",
  "We kept the stroke.",
].join("\n");

// The gate: UTF-8 text of 1 to 280 Unicode code points, not only whitespace.
// Fail loudly here rather than shipping an entry that cannot be judged.
function assertGates(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 280) {
    throw new Error(`entry is ${points} code points, gate allows 1..280`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace, gate needs real text");
  }
}

assertGates(POEM);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, POEM, "utf8");

const points = [...POEM].length;
const bytes = Buffer.byteLength(POEM, "utf8");
process.stdout.write(
  `wrote ${points} code points (${bytes} bytes) to ${OUT_FILE}\n`,
);
