import "./index.css";

export default ({ children, style = {}, onClick = () => { }, isDisable = false }) => {
    return <button onClick={() => !isDisable && onClick()} style={style} disabled={isDisable}>{children}</button>;
}