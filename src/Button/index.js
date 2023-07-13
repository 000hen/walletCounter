import "./index.css";

export default ({ children, onClick = () => { } }) => {
    return <button onClick={onClick}>{children}</button>;
}