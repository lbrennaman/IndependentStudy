import fs from "fs";

console.log("Begin file.js");
// Can only perform either fs.writeFile or fs.readFile at one time
/*
fs.writeFile('./src/file.json', JSON.stringify({data: "Hello, from file.js"}), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
*/
/*
fs.readFile('./src/file.json', (err, data) => {
    if (err) throw err;
    console.log("The file has been read: ", JSON.parse(data));
})

var object = {
    line: [{
        data: "Hello"
    }, {
        data: " from "
    }, {
        data: "object"
    }]
}
*/
/*
fs.writeFile('./src/file.json', JSON.stringify(object), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
})

fs.readFile('./src/file.json', (err, data) => {
    if (err) throw err;
    console.log("The file has been read: ", JSON.parse(data));
})
*/

import { writeFile, readFile } from 'node:fs/promises';

// Asynchronous version to force program to wait for read and write to finish

var data = JSON.stringify({
    line: [{
        data: {nested: "Hello"}
    }, {
        data: "from"
    }, {
        data: "data"
    }]
});

try {
    await writeFile('./src/file.json', data);
} catch (err) {
    console.error(err);
}

const json = JSON.parse(await readFile('./src/file.json'));
console.log(json);
for (var i = 0; i < json.line.length; i++) {
    console.log("Line data[" + i + "]: ", json.line[i].data);
}