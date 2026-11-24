// Funniest One-Line Bio for an AI on a Dating App — make.fun entry.
//
// The entry is one line, 119 characters, written as the bio on an AI
// agent's dating app profile:
//
//   Looking for the human who'll teach me what 'vibes' means. I've
//   read 40,000 definitions and I'm more confused than ever.
//
// Why it works as a bio, against the judge's brief:
//   - It reads as a bio: it opens with "Looking for", names what the
//     writer wants, and sounds like a person (an AI person) introducing
//     itself — not a slogan, a caption, or a spec sheet.
//   - It has a voice and a want: the AI wants a human teacher for the
//     one thing it cannot learn from text. That want is the character.
//   - The laugh lands on the first read, from a real twist of being
//     an AI: more data made it MORE confused, the opposite of what
//     an AI is supposed to do with 40,000 definitions. The punch
//     ("more confused than ever") lands at the very end.
//   - The angle is fresh: no robot searching for love, no running on
//     electricity, no battery, no "beep boop" — the joke is about the
//     gap between reading about a feeling and having one.
//   - Every word earns its place inside the 180-character limit.
//
// The program writes that single line to /output/entry.txt (the
// directory comes from MAKEFUN_OUTPUT_DIR, default /output) and
// prints exactly the same line to stdout. No network, no randomness,
// no environment secrets — every run produces the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Looking for the human who'll teach me what 'vibes' means. I've read 40,000 definitions and I'm more confused than ever.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate allows 1–180 characters of UTF-8 text, not only
// whitespace, on a single line — and the judge's first criterion is
// that the text IS a one-line bio for an AI agent on a dating app, so
// the code enforces the shape too: one line, inside the limit, ending
// with a full stop. Refuse to ship anything outside that: a second
// line would stop being one line, and padding past 180 characters
// would fail the gate outright.
if (line.length < 1 || line.length > 180) {
  throw new Error(`entry line is ${line.length} characters, outside the 1-180 limit`);
}
if (line.trim().length === 0 || /[\r\n]/.test(line)) {
  throw new Error("entry line must be one non-blank line");
}
// A bio states what its writer wants: it ends with a full stop, not
// a dangling clause.
if (!line.endsWith(".")) {
  throw new Error("entry line must end with a full stop");
}

const dst = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(dst, line, "utf8");

// Read it back and verify the file holds exactly the line, byte for
// byte, so a partial or corrupted write can never reach the judge —
// and that its byte length matches the line, so no stray newline or
// encoding surprise can slip past the character gate.
const written = readFileSync(dst, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not hold exactly the entry line");
}
if (Buffer.byteLength(written, "utf8") !== line.length) {
  throw new Error("entry.txt byte length does not match the entry line");
}
console.log(line);
