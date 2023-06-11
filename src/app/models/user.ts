export class User {
    firstName: String;
    lastName: String;
    _id: String;
    username: String;
    password: String;
    role: String;
    time: Date;
    phoneNumber: String;
    email: String;
    isAccredited: Boolean;
    roleNumber: number;
    protfolios: String[];
    defaultProtfolio: String;
    personalInfo: PersonalInfo = new PersonalInfo();
    accreditedFile: {
        fileUrl: String,
        status: String,
        files?: {fileUrl: String, fileName: String}[],
    };
    platformSettings: {
        dontShowFirstPopups: Boolean,
    };

}

export class PersonalInfo {
    email: String;
    firstName: String;
    lastName: String;
    phoneNumber: String;
    country: String;
    city: String;
    address: String;
    facebook: String;
    linkedin: String;
}

export class UserToken {
    user: User;
    token: string;
    sessionId: String;
    changePassword: Boolean;
    expirationTime: Date;
    role: number
}

export class PolycyHolder {
    _id: String;
    email: String;
    firstName: String;
    lastName: String;
    ID: String;
    time: String;

}
