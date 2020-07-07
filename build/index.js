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
exports.restoreUsers = exports.backupUsers = void 0;
var fs = require("fs");
var path = require("path");
var bottleneck_1 = require("bottleneck");
var delay = require("delay");
var JSONStream = require('JSONStream');
exports.backupUsers = function (cognito, UserPoolId, directory, delayDurationInMillis) {
    if (delayDurationInMillis === void 0) { delayDurationInMillis = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var userPoolList, UserPools, _loop_1, _i, userPoolList_1, poolId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userPoolList = [];
                    if (!(UserPoolId == 'all')) return [3 /*break*/, 2];
                    return [4 /*yield*/, cognito.listUserPools({ MaxResults: 60 }).promise()];
                case 1:
                    UserPools = (_a.sent()).UserPools;
                    userPoolList = userPoolList.concat(UserPools && UserPools.map(function (el) { return el.Id; }));
                    return [3 /*break*/, 3];
                case 2:
                    userPoolList.push(UserPoolId);
                    _a.label = 3;
                case 3:
                    _loop_1 = function (poolId) {
                        var file, writeStream, stringify, params, paginationCalls_1, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // create directory if not exists
                                    !fs.existsSync(directory) && fs.mkdirSync(directory);
                                    file = path.join(directory, poolId + ".json");
                                    writeStream = fs.createWriteStream(file);
                                    stringify = JSONStream.stringify();
                                    stringify.pipe(writeStream);
                                    params = {
                                        UserPoolId: poolId
                                    };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    paginationCalls_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var _a, _b, Users, PaginationToken;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, cognito.listUsers(params).promise()];
                                                case 1:
                                                    _a = _c.sent(), _b = _a.Users, Users = _b === void 0 ? [] : _b, PaginationToken = _a.PaginationToken;
                                                    Users.forEach(function (user) { return stringify.write(user); });
                                                    if (!PaginationToken) return [3 /*break*/, 5];
                                                    params.PaginationToken = PaginationToken;
                                                    if (!(delayDurationInMillis > 0)) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, delay(delayDurationInMillis)];
                                                case 2:
                                                    _c.sent();
                                                    _c.label = 3;
                                                case 3: return [4 /*yield*/, paginationCalls_1()];
                                                case 4:
                                                    _c.sent();
                                                    _c.label = 5;
                                                case 5:
                                                    ;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    return [4 /*yield*/, paginationCalls_1()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    error_1 = _a.sent();
                                    throw error_1; // to be catched by calling function
                                case 4:
                                    stringify.end();
                                    stringify.on('end', function () {
                                        writeStream.end();
                                    });
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, userPoolList_1 = userPoolList;
                    _a.label = 4;
                case 4:
                    if (!(_i < userPoolList_1.length)) return [3 /*break*/, 7];
                    poolId = userPoolList_1[_i];
                    return [5 /*yield**/, _loop_1(poolId)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.restoreUsers = function (cognito, UserPoolId, file, password, passwordModulePath, delayDurationInMillis) {
    if (delayDurationInMillis === void 0) { delayDurationInMillis = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pwdModule, UserPool, UsernameAttributes, limiter, readStream, parser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (UserPoolId == 'all')
                        throw Error("'all' is not a acceptable value for UserPoolId");
                    pwdModule = null;
                    if (typeof passwordModulePath === 'string') {
                        pwdModule = require(passwordModulePath);
                    }
                    return [4 /*yield*/, cognito.describeUserPool({ UserPoolId: UserPoolId }).promise()];
                case 1:
                    UserPool = (_a.sent()).UserPool;
                    UsernameAttributes = UserPool && UserPool.UsernameAttributes || [];
                    limiter = new bottleneck_1.default({ minTime: 2000 });
                    readStream = fs.createReadStream(file);
                    parser = JSONStream.parse();
                    parser.on('data', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        var _loop_2, _i, data_1, user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _loop_2 = function (user) {
                                        var attributes, params, specificPwdExistsForUser, wrapped, e_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    attributes = user.Attributes.filter(function (attr) { return attr.Name !== 'sub'; });
                                                    params = {
                                                        UserPoolId: UserPoolId,
                                                        Username: user.Username,
                                                        UserAttributes: attributes
                                                    };
                                                    // Set Username as email if UsernameAttributes of UserPool contains email
                                                    if (UsernameAttributes.includes('email')) {
                                                        params.Username = pluckValue(user.Attributes, 'email');
                                                        params.DesiredDeliveryMediums = ['EMAIL'];
                                                    }
                                                    else if (UsernameAttributes.includes('phone_number')) {
                                                        params.Username = pluckValue(user.Attributes, 'phone_number');
                                                        params.DesiredDeliveryMediums = ['EMAIL', 'SMS'];
                                                    }
                                                    specificPwdExistsForUser = false;
                                                    if (pwdModule !== null) {
                                                        try {
                                                            params.MessageAction = 'SUPPRESS';
                                                            params.TemporaryPassword = pwdModule.getPwdForUsername(user.Username);
                                                            specificPwdExistsForUser = true;
                                                        }
                                                        catch (e) {
                                                            console.error("\"" + e.message + "\" error occurred for user \"" + params.Username + "\" while getting password from " + passwordModulePath + ". Falling back to default.");
                                                        }
                                                    }
                                                    if (!specificPwdExistsForUser && password) {
                                                        params.MessageAction = 'SUPPRESS';
                                                        params.TemporaryPassword = password;
                                                    }
                                                    wrapped = limiter.wrap(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                                        return [2 /*return*/, cognito.adminCreateUser(params).promise()];
                                                    }); }); });
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, wrapped()];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_1 = _a.sent();
                                                    if (e_1.code === 'UsernameExistsException') {
                                                        console.log("Looks like user " + user.Username + " already exists, ignoring.");
                                                    }
                                                    else {
                                                        throw e_1;
                                                    }
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, data_1 = data;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < data_1.length)) return [3 /*break*/, 4];
                                    user = data_1[_i];
                                    return [5 /*yield**/, _loop_2(user)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    ;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    readStream.pipe(parser);
                    return [2 /*return*/];
            }
        });
    });
};
var pluckValue = function (arr, key) {
    var object = arr.find(function (attr) { return attr.Name == key; });
    if (!object)
        throw Error(key + " not found in the user attribute");
    return object.Value;
};
