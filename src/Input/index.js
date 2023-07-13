import { getRandomString } from "../utils";
import "./index.css";

export default ({ children, type = "text", required = false, callback = () => { } }) => {
    let id = getRandomString(15);

    return <div className="input_fed">
        <label htmlFor={id}>{children}</label>
        <input type="input" type={type} required={required} onChange={callback} id={id} />
    </div>
}