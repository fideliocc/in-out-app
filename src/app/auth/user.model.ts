export class User {
    public name: string;
    public uid: string;
    public email: string;

    constructor(obj: DataObj) {
        this.name = obj && obj.name || null;
        this.uid = obj && obj.uid || null;
        this.email = obj && obj.email || null;
    }
}

interface DataObj {
    name: string;
    uid: string;
    email: string;
}
