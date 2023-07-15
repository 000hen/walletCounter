import { useEffect, useState } from "react";
import WalletContainer from "../WalletContainer";
import NoWallet from "../NoWallet";
import Panel from "../Panel";
import Setting from "../Setting";
import ApiInitalizer from "../API/Initalizer";

export default () => {
    const [walletLength, setWalletLength] = useState(WalletContainer.walletLength);

    useEffect(() => {
        window.wallet = WalletContainer;

        function handler() {
            setWalletLength(WalletContainer.walletLength);
        }

        WalletContainer.event.addListener("lengthChange", handler);

        return () => {
            WalletContainer.event.removeListener("lengthChange", handler);
        }
    }, []);

    return <>
        <ApiInitalizer />

        <Setting />
        {
            walletLength < 1
                ? <NoWallet />
                : <Panel />
        }
    </>;
}