import ConfigField from "../../ConfigField";
import packageJson from "../../../../package.json";
import Button from "../../../Button";

export default () => {
    return <ConfigField title="關於">
        <h1>walletCounter@{packageJson.version}</h1>
        <h3>By @{packageJson.author}</h3>

        <div style={{
            marginBottom: 15
        }}></div>

        <Button onClick={() => window.open("https://github.com/000hen/walletCounter")}>Github Repository</Button>
        <Button onClick={() => window.open("https://github.com/000hen/walletCounter/issues/new")}>But Report</Button>
        <Button onClick={() => window.open("https://muisnowdevs.one")}>Muisnow's Homepage</Button>
    </ConfigField>
}