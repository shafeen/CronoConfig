const fs = require('fs');
const jsdiff = require('diff');
const bson = require('bson');
const FOLDERPATH = './cronoconfig.data';
if (!fs.existsSync(FOLDERPATH)) {
    console.log(`path ${FOLDERPATH} doesn't exist, creating..`);
    fs.mkdirSync(FOLDERPATH);
}
const simplegit = require('simple-git/promise')('./cronoconfig.data');

function testDiff(before, after) {
    require('colors');

    let diff = jsdiff.diffLines(before, after);

    diff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        let color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
}

function testBson() {
    const fs = require('fs');

    const documentStr = fs.readFileSync("./test.bson");

    let document = {
        actor: 'vincent chase',
        cat: 'garfield',
        dog: 'scooby doo',
        hedgehog: 'sonic',
        bunny: 'bugs bunny',
        bird: 'woody woodpecker',
        number: 1000000,
        dependencies: {
            "bson": "^4.0.2",
            "colors": "^1.3.3",
            "diff": "^4.0.1",
            "simple-git": "^1.107.0"
        },
        date: new Date()
    };
    document = bson.deserialize(documentStr);
    const before = JSON.stringify(document, null, 2);
    document.bird = 'deandra reynolds';
    document.actor= 'johnny drama';
    document.number+= 100;
    const after = JSON.stringify(document, null, 2);
    testDiff(before, after);

    fs.writeFile("test.bson", bson.serialize(document));
    fs.writeFile("test.json", JSON.stringify(document, null, 2));
}

function testSimpleGit() {
    const isRootGitRepo = fs.existsSync(`${FOLDERPATH}/.git`);
    simplegit.checkIsRepo()
    .then(isRepo => {
        const needToInitRepo = !(isRepo && isRootGitRepo);
        console.log(
            `folder ${FOLDERPATH} is ` +
            (needToInitRepo ? 'not ' : '') +
            "a git repo"
        );
        if (needToInitRepo) {
            return simplegit.init()
            .then(() => {
                console.log(`initialized ${FOLDERPATH} as a git repo`);
            });
        }
    }).then(() => {
        // at this point the repo should have been initialized
        fs.appendFile(`${FOLDERPATH}/message.txt`, "\nblah blah blah", {encoding: 'utf8'}, (err) => {
            if (err) throw err;
            simplegit.add(`./message.txt`)
            .then(() => {
                return simplegit.commit('message.txt added/updated');
            }).then(() => {
                console.log('commit completed');
            });
        });
    });
}

// testDiff(
//  "a: orange\nb: beep boop\nc: blah blah",
//  "a: one\nb: beep boop\npeep boob blah\nc: blah blah"
//  );
// testBson();
// testSimpleGit();