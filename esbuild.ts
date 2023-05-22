import { readdirSync } from "fs";
import { build } from "esbuild";
import { join } from "path";

const functionsDir = `handlers`;
const outDir = `dist`;
const entryPoints = readdirSync(join(__dirname, functionsDir))
  .filter(entry => entry !== "common")
  .map(entry => `${functionsDir}/${entry}/src/index.ts`);


build({
  entryPoints,
  bundle: true,
  outdir: join(__dirname, outDir),
  outbase: functionsDir, 
  platform: 'node',
  sourcemap: 'inline',
});