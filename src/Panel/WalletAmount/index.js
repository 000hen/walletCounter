import { numberToLocalNumber } from "../../utils";

export default ({ amount = 0 }) => {
    return <div>
        <h1>總金額</h1>
        <h2 style={{
            fontWeight: 900,
            fontSize: "2rem"
        }}>{numberToLocalNumber(amount)}</h2>
    </div>
}