import { faClock, faDollar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalletContainer from "../../WalletContainer";
import { numberToLocalNumber } from "../../utils";

import "./index.css";

export default ({ user, amount, id, timestamp }) => {
    return <div className="record">
        <div>
            <h3>{user}</h3>
            <h4><FontAwesomeIcon icon={faDollar} /> {numberToLocalNumber(amount)}</h4>
            <h4><FontAwesomeIcon icon={faClock} /> {new Date(timestamp).toLocaleString()}</h4>

            <div style={{
                marginTop: 10
            }}>
                <FontAwesomeIcon className="icon" onClick={() => {
                    if (confirm("確定刪除此筆紀錄？")) WalletContainer.removeWalletMoney(id);
                }} icon={faTrash} />
            </div>
        </div>
    </div>
}