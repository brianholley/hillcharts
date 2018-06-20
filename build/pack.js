"use strict"

var exec = require("child_process").exec

var args = process.argv.slice(2)
var buildDev = (args[0] == "--dev")

var command = ""
var options = {}
if (buildDev) {
    // Load existing publisher from VSTS extension manifest
    var manifest = require("../vss-extension.json")
    var extensionId = manifest.id

    command = `tfx extension create --overrides-file build/dev.json --manifest-globs vss-extension.json --extension-id ${extensionId}-dev --no-prompt --rev-version --json`
} else {
    command = `tfx extension create --manifest-globs vss-extension.json --no-prompt --json`
    options = {
        "cwd": "./dist"
    }
}

exec(command, options, (error, stdout) => {
    if (error) {
        console.error(`Could not create package: '${error}'`)
        return
    }

    let output = JSON.parse(stdout)
    console.log(`Package created ${output.path}`)
})