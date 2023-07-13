import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalletContainer from "../../WalletContainer";
import { getRandomString } from "../../utils";

export default ({ select, onChange = () => { } }) => {
    return <div>
        <h1><FontAwesomeIcon icon={faList} /> 錢包選擇</h1>
        <select onChange={(ele) => onChange(ele.target.value)} value={select}>
            {WalletContainer.walletList.map(e => <option key={getRandomString(5)} value={e}>{e}</option>)}
        </select>
    </div>;
}