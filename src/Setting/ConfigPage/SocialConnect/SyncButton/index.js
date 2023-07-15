import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../Button";

export default ({ children, color = "#1371ff", icon, isDisable, onClick = () => { } }) => {
    return <Button style={{
        width: "calc(100% - 10px)",
        fontFamily: "Roboto",
        border: 0,
        backgroundColor: color,
        color: "#fff",
        borderRadius: 8,
        position: "relative"
    }} onClick={onClick} isDisable={isDisable}><FontAwesomeIcon icon={icon} style={{
        width: 25,
        height: 25,
        position: "absolute",
        left: 15,
        height: "100%",
        top: 0
    }} /> 使用 {children} 同步你的錢包</Button>
}