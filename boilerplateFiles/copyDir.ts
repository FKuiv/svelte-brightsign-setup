import fs from "fs";
import path from "path";
import { exec } from "child_process";

const base_directory = path.resolve(__dirname, "public/dist");
const target_directory = path.resolve(base_directory, "static");
const source_directory = path.resolve(__dirname, `src/static`);

if (fs.existsSync(target_directory)) {
  fs.rmdirSync(target_directory, { recursive: true });
}

// Copy the directory
exec(`cp -r ${source_directory} ${target_directory}`, (error, stdout) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}\n\n`);
  fs.rmdirSync(`${target_directory}/fonts`, { recursive: true });
});
