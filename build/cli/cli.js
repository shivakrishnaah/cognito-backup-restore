#!/usr/bin/env node
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var ora = require("ora");
var chalk_1 = require("chalk");
var index_1 = require("../index");
var options_1 = require("./options");
var red = chalk_1.default.red;
var green = chalk_1.default.green;
var orange = chalk_1.default.keyword('orange');
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var spinner, _a, mode, profile, region, key, secret, userpool, directory, file, password, passwordModulePath, delay, metadata, env, iam, cognitoISP, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                spinner = ora({ spinner: 'dots4', hideCursor: true });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, options_1.options];
            case 2:
                _a = _b.sent(), mode = _a.mode, profile = _a.profile, region = _a.region, key = _a.key, secret = _a.secret, userpool = _a.userpool, directory = _a.directory, file = _a.file, password = _a.password, passwordModulePath = _a.passwordModulePath, delay = _a.delay, metadata = _a.metadata, env = _a.env, iam = _a.iam;
                // update the config of aws-sdk based on profile/credentials passed
                AWS.config.update({ region: region });
                if (iam) {
                    console.log("Got IAM role option...!!!");
                }
                else if (profile) {
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
                if (!(mode === 'backup')) return [3 /*break*/, 4];
                spinner = spinner.start(orange(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Backing up userpool"], ["Backing up userpool"]))));
                return [4 /*yield*/, index_1.backupUsers(cognitoISP, userpool, directory, delay)];
            case 3:
                _b.sent();
                spinner.succeed(green("JSON Exported successfully to " + directory + "/\n"));
                return [3 /*break*/, 7];
            case 4:
                if (!(mode === 'restore')) return [3 /*break*/, 6];
                spinner = spinner.start(orange(templateObject_2 || (templateObject_2 = __makeTemplateObject(["Restoring userpool"], ["Restoring userpool"]))));
                return [4 /*yield*/, index_1.restoreUsers(cognitoISP, userpool, file, password, passwordModulePath)];
            case 5:
                _b.sent();
                spinner.succeed(green("Users imported successfully to " + userpool + "\n"));
                return [3 /*break*/, 7];
            case 6:
                spinner.fail(red(templateObject_3 || (templateObject_3 = __makeTemplateObject(["Mode passed is invalid, please make sure a valid command is passed here.\n"], ["Mode passed is invalid, please make sure a valid command is passed here.\\n"]))));
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _b.sent();
                console.error(error_1);
                spinner.fail(red(error_1.message));
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); })();
var templateObject_1, templateObject_2, templateObject_3;
