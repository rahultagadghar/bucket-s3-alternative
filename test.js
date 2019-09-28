const fs = require("fs"); // Or `import fs from "fs";` with ESM
const path = __dirname + "/uploads";

if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}
