const { writeFile, readFile, mkdir } = require("fs").promises;
const path = require('path');

const resultPath = path.resolve(__dirname, 'content', 'temp.txt');
const contentDir = path.dirname(resultPath);

// Ensure the content directory exists
mkdir(contentDir, { recursive: true })
    .then(() => {
        console.log("Directory created or already exists");
        return writeFile(resultPath, "This is the first line.\n");
    })
    .then(() => {
        console.log("Wrote the first line");
        return writeFile(resultPath, "This is the second line.\n", { flag: 'a' });
    })
    .then(() => {
        console.log("Wrote the second line");
        return writeFile(resultPath, "This is the third line.\n", { flag: 'a' });
    })
    .then(() => {
        console.log("Wrote the third line");
        return readFile(resultPath, "utf-8");
    })
    .then((data) => {
        console.log("Read from temp.txt:");
        console.log(data);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });