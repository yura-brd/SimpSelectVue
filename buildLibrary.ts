import path from "path";
import vue from "@vitejs/plugin-vue";
import * as fs from "fs";

import { build } from "vite";
import { exec } from "child_process";
import { compile } from "sass";

const envDir = "./env";
const envPrefix = "APP";

const getPath = (localPath: string): string => {
  return path.normalize(path.resolve(__dirname, localPath));
};

async function clearDistFolder() {
  const path = getPath("./dist");
  await fs.promises.rm(path, { recursive: true });
  // await fs.promises.mkdir(path, { recursive: true });
}

async function buildLibrary() {
  await build({
    root: getPath("./src"),
    base: "/foo/",
    build: {
      // outDir: "../dist",
      outDir: getPath("./dist"),
      lib: {
        entry: getPath("./src/library/index.ts"),
        name: "MyComponentLib",
        fileName: format => `simpSelect-library.${format}.js`,
      },
      reportCompressedSize: true,
      rollupOptions: {
        external: ["vue", "./public/*"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    plugins: [vue({ reactivityTransform: true })],
    resolve: {
      // alias: {
      //   "@": fileURLToPath(new URL("./src", "file://" + __dirname)),
      //   "~": fileURLToPath(new URL(".", "file://" + __dirname)),
      // },
      alias: {
        "@": path.resolve(__dirname, "src"),
        "~": path.resolve(__dirname, ""),
      },
    },
    envDir,
    envPrefix,
  });
}

function buildTypesDeclaration() {
  exec("vue-tsc -p tsconfig.build-lib.json --declaration --emitDeclarationOnly");
}

async function processStyles() {
  await fs.promises.copyFile(
    getPath("./src/library/simpSelect/simpSelect-styles.scss"),
    getPath("./dist/simpSelect-library-styles.scss"),
  );
  const compileResult = compile(getPath("./dist/simpSelect-library-styles.scss"), { sourceMap: false });
  // fs.writeFileSync(getPath("./dist/simpSelect-library-styles.css"), compileResult.css);
  await fs.promises.writeFile(getPath("./dist/simpSelect-library-styles.css"), compileResult.css);
}

async function main() {
  await clearDistFolder();
  buildTypesDeclaration();
  await buildLibrary();
  await processStyles();
}

main();
