import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalletContainer from "../../WalletContainer";

export default ({ title }) => {
    return <div>
        <h1>目前位於</h1>
        <h2 style={{
            fontWeight: 900
        }}>{title}</h2>
        <div style={{
            marginTop: 10
        }}>
            <FontAwesomeIcon onClick={() => {
                if (confirm("確定刪除？")) {
                    WalletContainer.removeWallet(title);
                }
            }} icon={faTrash} size="2x" />
        </div>
    </div>
}