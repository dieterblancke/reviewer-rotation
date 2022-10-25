class Configuration {

    private readonly _port: number;
    private readonly _bitbucketConfiguration: BitbucketConfiguration;

    constructor(port: number, bitbucketConfiguration: BitbucketConfiguration) {
        this._port = port;
        this._bitbucketConfiguration = bitbucketConfiguration;
    }

    public get bitbucket(): BitbucketConfiguration {
        return this._bitbucketConfiguration;
    }

    public get port(): number {
        return this._port;
    }

    public validate(): boolean {
        return this._bitbucketConfiguration.validate();
    }
}

class BitbucketConfiguration {

    private readonly _username: string;
    private readonly _password: string;
    private readonly _webhookUuid: string;

    constructor(username: string, password: string, webhookUuid: string) {
        this._username = username;
        this._password = password;
        this._webhookUuid = webhookUuid;
    }

    public get username(): string {
        return this._username;
    }

    public get password(): string {
        return this._password;
    }

    public get webhookUuid(): string {
        return this._webhookUuid;
    }

    public validate(): boolean {
        return this.username.trim().length > 0 && this.password.trim().length > 0 && this.webhookUuid.trim().length > 0;
    }
}

export {Configuration, BitbucketConfiguration};