import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalletContainer from "../../WalletContainer";
import { numberToLocalNumber } from "../../utils";

export default ({ user, amount, id }) => {
    return <div style={{
        borderBottom: "1px #707070 solid",
        marginBottom: 5,
        paddingBottom: 5
    }}>
        <h3>{user}</h3>
        <h4 style={{
            marginLeft: 15
        }}>{numberToLocalNumber(amount)}</h4>
        <div style={{
            marginTop: 10
        }}>
            <FontAwesomeIcon onClick={() => {
                if (confirm("確定刪除此筆紀錄？")) WalletContainer.removeWalletMoney(id);
            }} icon={faTrash} />
        </div>
    </div>
}