export declare const backupUsers: (cognito: any, UserPoolId: string, directory: string, delayDurationInMillis?: number) => Promise<void>;
export declare const restoreUsers: (cognito: any, UserPoolId: string, file: string, password?: string | undefined, passwordModulePath?: String | undefined, delayDurationInMillis?: number) => Promise<void>;
