import { useEffect } from "react";
import GoogleAPI from ".";

export default () => {
    useEffect(() => {
        (async () => {
            console.log("[Google API] Initalizing Google API asynchronously");

            await GoogleAPI.init();
            window.api = GoogleAPI;

            console.log("[Google API] Google API Initalized!");
        })();
    }, []);

    return null;
}