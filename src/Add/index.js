import { useState } from "react";
import { faCheck, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../Input";
import Button from "../Button";
import WalletContainer from "../WalletContainer";

export default ({ close = () => { } }) => {
    const [walletTarget, setWalletTarget] = useState(null);

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "space-between",
        flexDirection: "column",
        flexWrap: "wrap",
        height: "100%",
        width: "80%",
        margin: "auto"
    }}>
        <div>
            <h1><FontAwesomeIcon icon={faWallet} /> 錢包新增</h1>
            <h3><Input callback={(event) => setWalletTarget(event.target)}>名稱</Input></h3>
        </div>
        <div>
            <Button onClick={() => {
                if (!walletTarget) return;
                
                WalletContainer.addWallet(walletTarget.value);
                walletTarget.value = "";
                close();
            }}><FontAwesomeIcon icon={faCheck} /> 新增完成！</Button>
        </div>
    </div>
}