#! /usr/bin/env node

var ncp = require("ncp").ncp,
    path = require("path"),
    expandHomeDir = require("expand-home-dir");

var copyTo = process.argv[2],
    source = path.join(__dirname, "html5bp"),
    dest;

    if (copyTo) {
        if (path.isAbsolute(copyTo)) {
            dest = copyTo;
        }
        else {
            dest = path.join(process.cwd(), dest);
        }
    }
    else {
        dest = process.cwd();
    }

// TODO - make platform agnostic
ncp(expandHomeDir("~/.html5bp/default"), dest, function(err, data) {
    if (err) {
        console.log(err);
        ncp(source, dest, function(err, data) {
            if (err) console.log("Error: ", err);
            else printDone(dest);
        });
    } else {
        printDone(dest);
    }
});

function printDone(dest) {
    console.log("HTML5 Boilerplate copied to "+dest);
}

