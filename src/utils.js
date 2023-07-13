
// Constants
export const DATABASE_NAME = "MoneyDatabase";

// Functions
export const readData = (data) => JSON.parse(localStorage.getItem(data));
export const writeData = (data, value) => localStorage.setItem(data, JSON.stringify(value));
export const numberToLocalNumber = (number) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: process.env.REACT_APP_CURRENCY ?? "TWD"
}).format(number);

if (!readData(DATABASE_NAME)) writeData(DATABASE_NAME, {
    wallets: [],
    moneys: []
});

export const getRandomString = (length) => {
    // https://stackoverflow.com/a/1349426

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};