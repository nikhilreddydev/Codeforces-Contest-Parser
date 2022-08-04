const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("node:fs/promises");

const contestNo = process.argv[2];
var url = "https://codeforces.com/contest/" + contestNo + "/problem/";

parseProblems();

function parseProblems() {
    const problems = ['A', 'B', 'C', 'D'];
    problems.forEach(problem => getHtml(problem));
}

async function getHtml(problem) {
    let problemURL = url + problem;
    try {
        let html = await axios.get(problemURL);
        console.log("Fetched: " + problem);
        parseIO(problem, html.data);
    } catch(err) {
        console.log(err);
    }
}

function parseIO(problem, html) {
    let $ = cheerio.load(html);

    let input = $('div.input pre').text();
    let output = $('div.output pre').text();

    saveIO(problem, [input, output]);
}

async function saveIO(problem, [inp, out]) {
    let inpHandle, outHandle, solHandle;

    // Eg: ./A/
    let dir = "./" + problem + "/";

    try {
        await fs.mkdir(dir)
                .catch(err => {
                    // catch any error other than directory not existing
                    if(err && err.code != 'EEXIST') {
                        console.log(err);
                    }
                });
        
        // open file handles
        solHandle = await fs.open(dir + "sol.cpp", 'w'); // this file is just created
        inpHandle = await fs.open(dir + "in.txt", 'w');
        outHandle = await fs.open(dir + "out.txt", 'w');

        await inpHandle.writeFile(inp);
        console.log(problem + "'s input has been saved.");

        await outHandle.writeFile(out);
        console.log(problem + "'s output has been saved.");
    } catch(err) {
        console.log(err);
    } finally {
        // close file handles
        inpHandle.close();
        outHandle.close();
		solHandle.close();
    }
}
