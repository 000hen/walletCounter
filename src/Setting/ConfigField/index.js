export default ({ title, children }) => {
    return <div style={{
        padding: 20
    }}>
        <h2>{title}</h2>
        <div style={{
            margin: "auto",
            padding: "0 15px"
        }}>
            {children}
        </div>
    </div>;
}