import EventEmitter from "events";
import packageJson from "../../package.json";
import { DATABASE_NAME, readData, writeData } from "../utils";

const WALLET_VERSION = "v1";

class WalletContainer {
    #wallet = readData(DATABASE_NAME);
    #walletLen = this.#wallet.wallets.length;
    #moneysLen = this.#wallet.moneys.length;

    event = new EventEmitter();

    constructor() { }

    get walletLength() {
        return this.#walletLen;
    }

    get moneyLength() {
        return this.#moneysLen;
    }

    get walletList() {
        return this.#wallet.wallets;
    }

    get moneyList() {
        return this.#wallet.moneys;
    }

    get exportData() {
        return JSON.stringify({
            walletVer: WALLET_VERSION,
            applicationVer: packageJson.version,
            fulVer: [packageJson.version, WALLET_VERSION].join('.'),
            database: this.#wallet
        })
    }

    #saveWallet(value) {
        writeData(DATABASE_NAME, value);
    }

    #changeLens() {
        this.#walletLen = this.#wallet.wallets.length;
        this.#moneysLen = this.#wallet.moneys.length;

        this.event.emit("lengthChange");
    }

    checkWalletExist(wallet) {
        return !!this.#wallet.wallets && this.#wallet.wallets.findIndex(e => e === wallet) !== -1;
    }

    getWalletTotal(wallet) {
        if (!this.checkWalletExist(wallet)) return null;

        return this.#wallet.moneys.filter(e => e.wallet === wallet).reduce((a, b) => a + b.data.value, 0);
    }

    getWallet(wallet) {
        if (!this.checkWalletExist(wallet)) return null;

        return this.#wallet.moneys.filter(e => e.wallet === wallet);
    }

    readWallet(wallet) {
        if (!this.checkWalletExist(wallet)) return null;

        let moneys = this.#wallet.moneys.filter(e => e.wallet === wallet);

        return {
            total: moneys.map(e => e.data.value).reduce((a, b) => a + b, 0),
            latestAdd: moneys[moneys.length - 1],
            moneys
        };
    }

    addWallet(wallet) {
        if (this.checkWalletExist(wallet) || wallet.trim().length === 0) return;
        this.#wallet.wallets.push(wallet);
        
        this.#changeLens();
        this.#saveWallet(this.#wallet);
    }

    removeWallet(wallet) {
        if (!this.checkWalletExist(wallet)) return null;

        this.#wallet.wallets = this.#wallet.wallets.filter(e => e !== wallet);
        this.#wallet.moneys = this.#wallet.moneys.filter(e => e.wallet !== wallet);

        this.#changeLens();
        this.#saveWallet(this.#wallet);
    }

    addWalletMoney(wallet, value = {
        name: "",
        value: 0,
    }) {
        if (!this.checkWalletExist(wallet)) this.#wallet.wallets.push(wallet);

        const ID = crypto.randomUUID();

        this.#wallet.moneys.push({
            wallet,
            id: ID,
            data: {
                timestamp: Date.now(),
                ...value
            }
        });

        this.#changeLens();
        this.#saveWallet(this.#wallet);

        return ID;
    }

    removeWalletMoney(id) {
        this.#wallet.moneys = this.#wallet.moneys.filter(e => e.id !== id);

        this.#changeLens();
        this.#saveWallet(this.#wallet);
    }
}

export default new WalletContainer();