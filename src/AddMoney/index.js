import { useState } from "react";
import { faCheck, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../Input";
import Button from "../Button";
import WalletContainer from "../WalletContainer";

export default ({ wallet, close = () => { } }) => {
    const [human, setHuman] = useState(null);
    const [coin, setCoin] = useState(null);

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
            <h1><FontAwesomeIcon icon={faCoins} /> 新增紀錄</h1>
            <h3><Input callback={(event) => setHuman(event.target)}>名稱</Input></h3>
            <h3><Input type="number" callback={(event) => setCoin(event.target)}>金額</Input></h3>
        </div>
        <div>
            <Button onClick={() => {
                if (!human || !coin) return;

                WalletContainer.addWalletMoney(wallet, {
                    name: human.value,
                    value: Number(coin.value)
                });
                human.value = "";
                coin.value = "";
                close();
            }}><FontAwesomeIcon icon={faCheck} /> 新增完成！</Button>
        </div>
    </div>
}