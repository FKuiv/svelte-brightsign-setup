#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const fileStructure = {
  src: {
    components: [],
    helpers: ["calculateNextIndex.ts", "getEnumItemCount.ts"],
    pages: [],
    static: [],
    locales: ["en.json", "et.json", "index.ts"],
    ".": ["App.svelte", "enums.ts", "main.ts", "store.ts", "global.css"],
  },
  public: ["autorun.brs", "index.html"],
  ".": [
    "package.json",
    "copyDir.ts",
    "postcss.config.js",
    "tailwind.config.js",
    "webpack.config.js",
    "tsconfig.json",
    ".gitignore",
  ],
};

function createStructure(basePath, structure) {
  Object.entries(structure).forEach(([key, value]) => {
    let newBasePath = path.join(basePath, key);
    if (key !== ".") {
      fs.mkdirSync(newBasePath, { recursive: true });
    }

    if (Array.isArray(value)) {
      // It's a list of files
      value.forEach((file) => {
        const filePath = path.join(basePath, key, file);
        const boilerplateFilePath = path.join(
          __dirname,
          "boilerplateFiles",
          file
        );
        // Copy boilerplate file
        if (fs.existsSync(boilerplateFilePath)) {
          fs.copyFileSync(boilerplateFilePath, filePath);
        }
      });
    } else {
      // It's a nested directory
      createStructure(newBasePath, value); // Recurse into the directory
    }
  });
}

createStructure(process.cwd(), fileStructure);
console.log("Project structure created successfully!");

// Run npm install
const npmInstall = spawn("npm", ["install"], {
  stdio: "inherit",
  cwd: process.cwd(),
});

npmInstall.on("close", (code) => {
  console.log("\n\n");
  if (code === 0) {
    console.log("npm install completed successfully.");

    // Run git init
    const gitInit = spawn("git", ["init"], {
      stdio: "inherit",
      cwd: process.cwd(),
    });

    gitInit.on("close", (gitCode) => {
      if (gitCode === 0) {
        const gitAdd = spawn("git", ["add", "."], {
          stdio: "inherit",
          cwd: process.cwd(),
        });

        gitAdd.on("close", (addCode) => {
          if (addCode === 0) {
            const gitCommit = spawn("git", ["commit", "-m", "Initial commit"], {
              stdio: "inherit",
              cwd: process.cwd(),
            });
            gitCommit.on("close", (commitCode) => {
              if (commitCode === 0) {
                console.log("Initial commit created successfully.");
              } else {
                console.error(`git commit exited with code ${commitCode}`);
              }
            });
          } else {
            console.error(`git add exited with code ${addCode}`);
          }
        });
      } else {
        console.error(`git init exited with code ${gitCode}`);
      }
    });
  } else {
    console.error(`npm install exited with code ${code}`);
  }
});
