import EventEmitter from "events";
import { getRandomString } from "../../utils";

const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_DISCOVERY_DOC = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://people.googleapis.com/$discovery/rest?version=v1'
];
const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file'
].join(" ");


class GoogleAPI {
    #isInited = false;
    #isLogined = false;
    #initedAPI = [];

    #oauthClient = null;

    constructor() {
        this.event = new EventEmitter();
    }

    get isLogined() {
        return this.#isLogined;
    }

    get isInited() {
        return this.#isInited;
    }

    get initedLib() {
        return this.#initedAPI;
    }

    #errorThrow(error) {
        throw new Error(error)
    }

    #initCheck() {
        if (!this.#oauthClient || !this.#isInited) return this.#errorThrow("Cannot use this API before Google API initialized!");
    }

    #loginCheck() {
        if (!this.#isLogined) return this.#errorThrow("User is not login.");
    }

    #loadLibrary(lib) {
        return new Promise((res) => gapi.load(lib, () => {
            this.#initedAPI.push(lib);
            res();
        }));
    }

    #initOAuth() {
        return new Promise((res) => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_OAUTH_CLIENT_ID,
                scope: SCOPES,
                ux_mode: "popup",
                callback: (response) => {
                    gapi.client.setToken({
                        access_token: response.access_token,
                    });
                    this.#isLogined = true;
                    this.event.emit("userLogin");
                }
            });

            this.#oauthClient = client;
            res();
        });
    }

    #initAPIClient() {
        return new Promise(async (res) => {
            // Load Google API Client
            await this.#loadLibrary("client");
            await gapi.client.init({
                apiKey: GOOGLE_API_KEY,
                discoveryDocs: GOOGLE_API_DISCOVERY_DOC
            });

            res();
        });
    }

    init() {
        return new Promise(async (res) => {
            await Promise.all([this.#initAPIClient(), this.#initOAuth()]);

            this.#isInited = true;
            this.event.emit("inited");

            res();
        });
    }

    showLogin() {
        this.#initCheck();
        this.#oauthClient.requestAccessToken();
    }

    getAppdataList() {
        this.#initCheck();
        this.#loginCheck();
        
        return new Promise((res) => {
            gapi.client.drive.files.list({
                spaces: 'appDataFolder',
                fields: 'nextPageToken, files(id, name, size, md5Checksum)',
                pageSize: 100
            }).execute(res);
        });
    }

    getAppdataFile(fileId) {
        this.#initCheck();
        this.#loginCheck();

        return new Promise((res) => {
            gapi.client.drive.files.get({
                fileId,
                alt: "media"
            }).execute(res);
        })
    }

    getUserProfile() {
        this.#initCheck();
        this.#loginCheck();

        return new Promise((res) => {
            gapi.client.people.people.get({
                resourceName: "people/me",
                personFields: "names,emailAddresses"
            }).execute(res);
        })
    }
    
    writeAppdata(filename, data, contentType) {
        this.#initCheck();
        this.#loginCheck();

        return new Promise((res) => {
            // https://stackoverflow.com/a/35182924/15666878

            let metadata = {
                name: filename,
                mimeType: contentType,
                parents: ["appDataFolder"]
            };

            const form = new FormData();
            form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
            form.append("file", new Blob([data], { type: contentType }));

            fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + gapi.client.getToken().access_token
                },
                body: form
            }).then(e => e.json()).then(res);
        });
    }

    removeAppdata(fileId) {
        this.#initCheck();
        this.#loginCheck();

        return new Promise((res) => {
            gapi.client.drive.files.delete({
                fileId
            }).execute(res);
        });
    }

    removeAllAppdata() {
        this.#initCheck();
        this.#loginCheck();

        return new Promise(async (res) => {
            let files = await this.getAppdataList();

            for (let f of files.files) {
                await this.removeAppdata(f.id);
            }

            res();
        });
    }
}

export default new GoogleAPI();