"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var chalk_1 = require("chalk");
var dimmed = chalk_1.default.dim;
var greyed = chalk_1.default.gray;
var bold = chalk_1.default.bold;
var version = require('../../package').version;
exports.argv = yargs
    // header
    .usage("\nYou can run commands with \"cognito-backup-restore\" or the shortcut \"cbr\"\n\n    Usage: $0 <command> [options]")
    // backup command
    .command('backup', dimmed(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Backup/export all users in specified user pool"], ["Backup/export all users in specified user pool"]))), function (yargs) {
    return yargs.options({
        mode: {
            default: 'backup',
            hidden: true
        },
        directory: {
            alias: ['dir'],
            describe: dimmed(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Directory to export json file to"], ["Directory to export json file to"]))),
            string: true
        }
    });
})
    // restore command
    .command('restore', dimmed(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Restore/import users to a single user pool"], ["Restore/import users to a single user pool"]))), function (yargs) {
    return yargs.options({
        mode: {
            default: 'restore',
            hidden: true
        },
        file: {
            alias: ['f'],
            describe: dimmed(templateObject_4 || (templateObject_4 = __makeTemplateObject(["JSON file to import data from"], ["JSON file to import data from"]))),
            string: true
        },
        password: {
            alias: ['pwd'],
            describe: dimmed(templateObject_5 || (templateObject_5 = __makeTemplateObject(["TemporaryPassword of the users imported"], ["TemporaryPassword of the users imported"]))),
            string: true
        },
        passwordModulePath: {
            alias: ["pwdModule"],
            describe: dimmed(templateObject_6 || (templateObject_6 = __makeTemplateObject(["A module that exports an interface getPwdForUsername(username: String) method, fall back to password parameter if throw"], ["A module that exports an interface getPwdForUsername(username: String) method, fall back to password parameter if throw"]))),
            string: true
        }
    });
})
    // examples
    .example('$0 backup', greyed(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Follow the interactive guide to backup userpool(s)"], ["Follow the interactive guide to backup userpool(s)"]))))
    .example('$0 restore', greyed(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Follow the interactive guide to restore userpool"], ["Follow the interactive guide to restore userpool"]))))
    .example('$0 backup -p <PROFILE> [OPTIONS]', greyed(templateObject_9 || (templateObject_9 = __makeTemplateObject(["Backup using the options provided"], ["Backup using the options provided"]))))
    .example('$0 restore -p <PROFILE> [OPTIONS]', greyed(templateObject_10 || (templateObject_10 = __makeTemplateObject(["Restore using the options provided"], ["Restore using the options provided"]))))
    // options
    .option('profile', {
    alias: ['p'],
    describe: dimmed(templateObject_11 || (templateObject_11 = __makeTemplateObject(["Use a specific profile from your credential file"], ["Use a specific profile from your credential file"]))),
    conflicts: ['aws-access-key', 'aws-secret-key'],
    string: true,
})
    .option('region', {
    alias: ['r'],
    describe: dimmed(templateObject_12 || (templateObject_12 = __makeTemplateObject(["The region to use. Overrides config/env settings"], ["The region to use. Overrides config/env settings"]))),
    string: true,
})
    .option('aws-access-key', {
    alias: ['key', 'k'],
    describe: dimmed(templateObject_13 || (templateObject_13 = __makeTemplateObject(["The AWS Access Key to use. Overrides config/env settings"], ["The AWS Access Key to use. Overrides config/env settings"]))),
    conflicts: ['profile'],
    string: true,
})
    .option('aws-secret-key', {
    alias: ['secret', 's'],
    describe: dimmed(templateObject_14 || (templateObject_14 = __makeTemplateObject(["The AWS Secret Key to use. Overrides config/env settings"], ["The AWS Secret Key to use. Overrides config/env settings"]))),
    conflicts: ['profile'],
    string: true
})
    .option('userpool', {
    alias: ['pool'],
    describe: dimmed(templateObject_15 || (templateObject_15 = __makeTemplateObject(["The Cognito pool to use. 'all' to backup all userpools."], ["The Cognito pool to use. 'all' to backup all userpools."]))),
    string: true
})
    .option('delay', {
    describe: dimmed(templateObject_16 || (templateObject_16 = __makeTemplateObject(["delay in millis between alternate users batch(60) backup, to avoid rate limit error"], ["delay in millis between alternate users batch(60) backup, to avoid rate limit error"]))),
    number: true
})
    .option('use-ec2-metadata', {
    alias: ['metadata'],
    describe: dimmed(templateObject_17 || (templateObject_17 = __makeTemplateObject(["Use iam role in ec2 instance."], ["Use iam role in ec2 instance."]))),
    type: 'boolean'
})
    .option('use-env-vars', {
    alias: ['env'],
    describe: dimmed(templateObject_18 || (templateObject_18 = __makeTemplateObject(["Use credentials from environment variables."], ["Use credentials from environment variables."]))),
    type: 'boolean'
}).option('use-iam-role', {
    alias: ['iam'],
    describe: dimmed(templateObject_19 || (templateObject_19 = __makeTemplateObject(["Use credentials from iam"], ["Use credentials from iam"]))),
    // conflicts: ['metadata', 'profile'],
    type: 'boolean'
})
    // help
    .help('help', dimmed(templateObject_20 || (templateObject_20 = __makeTemplateObject(["Show help"], ["Show help"]))))
    .alias('help', 'h')
    .showHelpOnFail(false, bold(templateObject_21 || (templateObject_21 = __makeTemplateObject(["Specify --help for available options"], ["Specify --help for available options"]))))
    // version
    .version('version', dimmed(templateObject_22 || (templateObject_22 = __makeTemplateObject(["Show version number"], ["Show version number"]))), (function () { return version; })())
    .alias('version', 'v')
    // footer
    .epilog(dimmed(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\nPlease report any issues/suggestions here:\nhttps://github.com/rahulpsd18/cognito-backup-restore/issues\n"], ["\\nPlease report any issues/suggestions here:\\nhttps://github.com/rahulpsd18/cognito-backup-restore/issues\\n"]))))
    .strict()
    .wrap(Math.min(120, yargs.terminalWidth()))
    .argv;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23;
