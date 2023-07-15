import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import SyncButton from "../SyncButton";
import GoogleAPI from "../../../../API/Google";
import { useEffect, useState } from "react";

export default () => {
    const [isLogined, setIsLogined] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        if (GoogleAPI.isInited) setIsAvailable(true);
        if (GoogleAPI.isLogined) setIsLogined(true);

        function initHandleEvent() {
            if (GoogleAPI.isInited) setIsAvailable(true);
        }

        function loginHandleEvent() {
            if (GoogleAPI.isLogined) setIsLogined(true);
        }
        
        GoogleAPI.event.addListener("inited", initHandleEvent);
        GoogleAPI.event.addListener("userLogin", loginHandleEvent);

        return () => {
            GoogleAPI.event.removeListener("inited", initHandleEvent);
            GoogleAPI.event.removeListener("userLogin", loginHandleEvent);
        }
    }, []);

    return !isAvailable
        ? null
        : <SyncButton icon={faGoogle} onClick={() => {
            GoogleAPI.showLogin();
        }} isDisable={isLogined}>Google</SyncButton>;
}