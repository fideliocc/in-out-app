export class User {
    public name: string;
    public uid: string;
    public email: string;

    constructor(name: string, uid: string, email: string) {
        this.name = name;
        this.uid = uid;
        this.email = email;
    }
}
