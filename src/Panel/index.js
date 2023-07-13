import { useEffect, useState } from "react";
import Add from "../Add";
import WalletName from "./WalletName";
import WalletContainer from "../WalletContainer";
import WalletAmount from "./WalletAmount";
import AddMoney from "../AddMoney";
import { getRandomString } from "../utils";
import Record from "./Record";
import WalletSelect from "./WalletSelect";

import "./index.css";

export default () => {
    const [wallet, setWallet] = useState(WalletContainer.walletList[WalletContainer.walletLength - 1]);
    const [amount, setAmount] = useState(WalletContainer.getWalletTotal(wallet));
    const [moneys, setMoneys] = useState(WalletContainer.getWallet(wallet));

    function regetValues(wallet) {
        setWallet(wallet);
        setAmount(WalletContainer.getWalletTotal(wallet));
        setMoneys(WalletContainer.getWallet(wallet));
    }

    useEffect(() => {
        function handler() {
            regetValues(WalletContainer.checkWalletExist(wallet) ? wallet : WalletContainer.walletList[WalletContainer.walletLength - 1]);
        }

        WalletContainer.event.addListener("lengthChange", handler);

        return () => {
            WalletContainer.event.removeListener("lengthChange", handler);
        }
    }, [wallet]);

    return <div className="panel" style={{
        display: "flex",
        flexWrap: "wrap",
        width: "80%"
    }}>
        <div className="desc">
            <div>
                <WalletSelect select={wallet} onChange={regetValues} />
            </div>
            <div>
                <WalletName title={wallet} />
            </div>
            <div>
                <WalletAmount amount={amount} />
            </div>
            <div>
                <Add close={() => regetValues(WalletContainer.walletList[WalletContainer.walletLength - 1])} />
            </div>
            <div>
                <AddMoney wallet={wallet} />
            </div>
        </div>
        <div className="content" style={{
            flex: "1 1 auto"
        }}>
            <h1>金額紀錄</h1>
            <div>
                {moneys.map(e => <Record key={getRandomString(5)} user={e.data.name} amount={e.data.value} id={e.id} />)}
            </div>
        </div>
    </div>;
}