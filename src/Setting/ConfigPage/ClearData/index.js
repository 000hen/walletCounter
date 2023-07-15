import { useState } from "react";
import Button from "../../../Button";
import WalletContainer from "../../../WalletContainer";
import ConfigField from "../../ConfigField";

export default () => {
    const [isDisable, setIsDisable] = useState(false);

    return <ConfigField title={"清除資料"}>
        <Button style={{
            backgroundColor: "#ff4343",
            color: "#fff",
            border: 0
        }} onClick={() => {
            if (!confirm("資料清除後將不可復原！確定要清除？")) return;

            for (let wallet of WalletContainer.walletList) {
                WalletContainer.removeWallet(wallet);
            }

            setIsDisable(true);
        }} isDisable={isDisable}>清除所有錢包資料</Button>
    </ConfigField>
}