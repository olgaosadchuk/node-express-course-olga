const { writeFile, readFile } = require("fs").promises; 
const path = require('path');

const resultPath = path.resolve(__dirname, 'content', 'temp.txt');

async function writer() {
    try {
        await writeFile(resultPath, "This is the first line.\n");
        await writeFile(resultPath, "This is the second line.\n", { flag: 'a' });
        await writeFile(resultPath, "This is the third line.\n", { flag: 'a' });
    } catch (err) {
        console.error("Error writing to file:", err);
    }
}

async function reader() {
    try {
        const data = await readFile(resultPath, "utf-8");
        console.log(data);
    } catch (err) {
        console.error("Error reading from file:", err);
    }
}

async function readWrite() {
    await writer();
    await reader();
}

readWrite();

