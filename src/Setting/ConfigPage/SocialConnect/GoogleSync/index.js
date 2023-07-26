import { useEffect, useState } from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import SyncButton from "../SyncButton";
import GoogleAPI from "../../../../API/Google";

export default () => {
    const [isLogined, setIsLogined] = useState(GoogleAPI.isLogined);
    const [isAvailable, setIsAvailable] = useState(GoogleAPI.isInited);

    useEffect(() => {
        function initHandleEvent() {
            if (GoogleAPI.isInited) setIsAvailable(true);
        }

        function loginHandleEvent() {
            if (GoogleAPI.isLogined) return;
            setIsLogined(true);
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
            // TODO: complete the upload function
        }} isDisable={isLogined}>Google</SyncButton>;
}