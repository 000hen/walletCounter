import { useEffect, useState } from "react";
import WalletContainer from "../WalletContainer";
import NoWallet from "../NoWallet";
import Panel from "../Panel";

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

    return walletLength < 1
        ? <NoWallet />
        : <Panel />;
}