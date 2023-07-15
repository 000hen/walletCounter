import ConfigField from "../../ConfigField";
import GoogleSync from "./GoogleSync";

export default () => {
    return <ConfigField title={"雲端儲存(Still in Devlopment)"}>
        <GoogleSync />
    </ConfigField>
}