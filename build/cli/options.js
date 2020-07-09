"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var fuzzy = require("fuzzy");
var inquirer = require("inquirer");
var chalk_1 = require("chalk");
var args_1 = require("./args");
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
inquirer.registerPrompt('filePath', require('inquirer-file-path'));
var greenify = chalk_1.default.green;
var searchCognitoRegion = function (_, input) { return __awaiter(void 0, void 0, void 0, function () {
    var region, fuzzyResult;
    return __generator(this, function (_a) {
        input = input || '';
        region = [
            { get name() { return greenify(this.value) + ' :: US East (N. Virginia)'; }, value: 'us-east-1' },
            { get name() { return greenify(this.value) + ' :: US East (Ohio)'; }, value: 'us-east-2' },
            { get name() { return greenify(this.value) + ' :: US West (Oregon)'; }, value: 'us-west-2' },
            { get name() { return greenify(this.value) + ' :: Asia Pacific (Mumbai)'; }, value: 'ap-south-1' },
            { get name() { return greenify(this.value) + ' :: Asia Pacific (Tokyo)'; }, value: 'ap-northeast-1' },
            { get name() { return greenify(this.value) + ' :: Asia Pacific (Seoul)'; }, value: 'ap-northeast-2' },
            { get name() { return greenify(this.value) + ' :: Asia Pacific (Singapore)'; }, value: 'ap-southeast-1' },
            { get name() { return greenify(this.value) + ' :: Asia Pacific (Sydney)'; }, value: 'ap-southeast-2' },
            { get name() { return greenify(this.value) + ' :: EU (Frankfurt)'; }, value: 'eu-central-1' },
            { get name() { return greenify(this.value) + ' :: EU (Ireland)'; }, value: 'eu-west-1' },
            { get name() { return greenify(this.value) + ' :: EU (London)'; }, value: 'eu-west-2' }
        ];
        fuzzyResult = fuzzy.filter(input, region, { extract: function (el) { return el.value; } });
        return [2 /*return*/, fuzzyResult.map(function (el) {
                return el.original;
            })];
    });
}); };
var verifyOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mode, profile, region, key, secret, userpool, directory, file, password, passwordModulePath, delay, metadata, env, iam, modeChoice, credentials, savedAWSProfiles_1, searchAWSProfile, awsProfileChoice, awsRegionChoice, cognitoISP, UserPools, userPoolList_1, searchCognitoPool, cognitoPoolChoice, directoryLocation, fileLocation, pwdModule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mode = args_1.argv.mode, profile = args_1.argv.profile, region = args_1.argv.region, key = args_1.argv.key, secret = args_1.argv.secret, userpool = args_1.argv.userpool, directory = args_1.argv.directory, file = args_1.argv.file, password = args_1.argv.password, passwordModulePath = args_1.argv.passwordModulePath, delay = args_1.argv.delay, metadata = args_1.argv.metadata, env = args_1.argv.env, iam = args_1.argv.iam;
                console.log(args_1.argv);
                if (!(!mode || !['restore', 'backup'].includes(mode))) return [3 /*break*/, 2];
                return [4 /*yield*/, inquirer.prompt({
                        type: 'list',
                        name: 'selected',
                        message: 'Choose the mode',
                        choices: ['Backup', 'Restore'],
                    })];
            case 1:
                modeChoice = _a.sent();
                mode = modeChoice.selected.toLowerCase();
                _a.label = 2;
            case 2:
                if (!(!metadata && !env && !iam)) return [3 /*break*/, 5];
                credentials = new AWS.IniLoader().loadFrom({});
                savedAWSProfiles_1 = Object.keys(credentials);
                searchAWSProfile = function (_, input) { return __awaiter(void 0, void 0, void 0, function () {
                    var fuzzyResult;
                    return __generator(this, function (_a) {
                        input = input || '';
                        fuzzyResult = fuzzy.filter(input, savedAWSProfiles_1);
                        return [2 /*return*/, fuzzyResult.map(function (el) {
                                return el.original;
                            })];
                    });
                }); };
                if (!(!savedAWSProfiles_1.includes(profile) && (!key || !secret || !iam))) return [3 /*break*/, 4];
                return [4 /*yield*/, inquirer.prompt({
                        type: 'autocomplete',
                        name: 'selected',
                        message: 'Choose your AWS Profile',
                        source: searchAWSProfile,
                    })];
            case 3:
                awsProfileChoice = _a.sent();
                profile = awsProfileChoice.selected;
                _a.label = 4;
            case 4:
                ;
                _a.label = 5;
            case 5:
                if (!!region) return [3 /*break*/, 7];
                return [4 /*yield*/, inquirer.prompt({
                        type: 'autocomplete',
                        name: 'selected',
                        message: 'Choose your Cognito Region',
                        source: searchCognitoRegion,
                    })];
            case 6:
                awsRegionChoice = _a.sent();
                region = awsRegionChoice.selected;
                _a.label = 7;
            case 7:
                ;
                if (!!userpool) return [3 /*break*/, 10];
                // update the config of aws-sdk based on profile/credentials passed
                AWS.config.update({ region: region });
                if (profile) {
                    AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: profile });
                }
                else if (key && secret) {
                    AWS.config.credentials = new AWS.Credentials({
                        accessKeyId: key, secretAccessKey: secret
                    });
                }
                else if (env) {
                    AWS.config.credentials = new AWS.EnvironmentCredentials('AWS');
                }
                else if (metadata) {
                    AWS.config.credentials = new AWS.EC2MetadataCredentials({});
                }
                cognitoISP = new AWS.CognitoIdentityServiceProvider();
                return [4 /*yield*/, cognitoISP.listUserPools({ MaxResults: 60 }).promise()];
            case 8:
                UserPools = (_a.sent()).UserPools;
                userPoolList_1 = UserPools
                    && UserPools.map(function (el) { return ({ name: el.Name || '', value: el.Id || '' }); }) || [];
                if (!userPoolList_1.length)
                    throw Error("No userpool found in this region. Are you sure the pool is in \"" + region + "\".");
                if (mode === 'backup')
                    userPoolList_1.unshift({ name: chalk_1.default.magentaBright.bold('ALL'), value: 'all' });
                searchCognitoPool = function (_, input) { return __awaiter(void 0, void 0, void 0, function () {
                    var fuzzyResult;
                    return __generator(this, function (_a) {
                        input = input || '';
                        fuzzyResult = fuzzy.filter(input, userPoolList_1, { extract: function (el) { return el.value; } });
                        return [2 /*return*/, fuzzyResult.map(function (el) {
                                return el.original;
                            })];
                    });
                }); };
                return [4 /*yield*/, inquirer.prompt({
                        type: 'autocomplete',
                        name: 'selected',
                        message: 'Choose your Cognito Pool',
                        source: searchCognitoPool,
                        pageSize: 60
                    })];
            case 9:
                cognitoPoolChoice = _a.sent();
                userpool = cognitoPoolChoice.selected;
                _a.label = 10;
            case 10:
                ;
                if (!(mode === 'backup' && !directory)) return [3 /*break*/, 12];
                return [4 /*yield*/, inquirer.prompt({
                        type: 'directory',
                        name: 'selected',
                        message: 'Choose your file destination',
                        basePath: '.'
                    })];
            case 11:
                directoryLocation = _a.sent();
                directory = directoryLocation.selected;
                _a.label = 12;
            case 12:
                ;
                if (!(mode === 'restore' && !file)) return [3 /*break*/, 14];
                return [4 /*yield*/, inquirer.prompt({
                        type: 'filePath',
                        name: 'selected',
                        message: 'Choose the JSON file',
                        basePath: '.'
                    })];
            case 13:
                fileLocation = _a.sent();
                file = fileLocation.selected;
                _a.label = 14;
            case 14:
                if (mode === 'restore' && passwordModulePath) {
                    try {
                        pwdModule = require(passwordModulePath);
                        if (typeof pwdModule.getPwdForUsername !== 'function') {
                            throw Error("Cannot find getPwdForUsername(username: String) in password module \"" + passwordModulePath + "\".");
                        }
                        ;
                    }
                    catch (e) {
                        throw Error("Cannot load password module path \"" + passwordModulePath + "\".");
                    }
                }
                return [2 /*return*/, { mode: mode, profile: profile, region: region, key: key, secret: secret, userpool: userpool, directory: directory, file: file, password: password, passwordModulePath: passwordModulePath, delay: delay, metadata: metadata, env: env, iam: iam }];
        }
    });
}); };
exports.options = verifyOptions();
