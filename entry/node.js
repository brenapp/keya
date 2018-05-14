var keya = require("../core");
var fs = require("fs");
var os = require("os");
var path = require("path");

module.exports = (function () {

    var file = path.join(os.tmpdir(), "keya.json");

    function all() {
        return new Promise((resolve, reject) => {
            fs.access(file, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, err => {
                if (err) {
                    if (err.code != "ENOENT") {
                        reject(err)
                    } else {
                        fs.writeFile("file", "{}", err => err ? reject(err) : resolve({}))
                    }
                } else {
                    fs.readFile(file, (err, contents) => err ? reject(err) : resolve(JSON.parse(contents.toString())))
                }
            });
        });
    }

    function putStore(store) {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(store), err => err ? reject(err) : resolve(true))
        });
    }

    function resolve(doc) {
        return all()
            .then(store => store[doc])
    }

    function store(doc, value) {
        return all()
            .then(store => putStore({ [doc]: value, ...store }))
    }


    return keya({ resolve, store, all });
})();