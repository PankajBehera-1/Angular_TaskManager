export class SignUpViewModel {

    firstName: any;
    lastName:any;
    email: string;
    mobile: number;
    dateOfBirth: string | any;
    password: string | any;
    gender: string | any;
    countryID: number;
    skills: any;

    constructor(
        firstName: any = null,
        lastName: any = null,
        email: string = '',
        mobile: number = 0,
        dateOfBirth: string | any = null,
        password: string | any = null,
        gender: string | any = null,
        countryID: number = 0,
        skills: any = null
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender  = gender;
        this.countryID = countryID;
        this.skills= skills;
    }
}
