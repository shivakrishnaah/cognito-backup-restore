import * as AWS from 'aws-sdk';
export declare const backupUsers: (cognito: AWS.CognitoIdentityServiceProvider, UserPoolId: string, directory: string, delayDurationInMillis?: number) => Promise<void>;
export declare const restoreUsers: (cognito: AWS.CognitoIdentityServiceProvider, UserPoolId: string, file: string, password?: string | undefined, passwordModulePath?: String | undefined, delayDurationInMillis?: number) => Promise<void>;
