import { useState } from "react";
import { getRandomString } from "../utils";
import "./index.css";

export default ({ children, type = "text", required = false, callback = () => { } }) => {
    const [isFocus, setIsFocus] = useState(false);

    let id = getRandomString(15);

    return <div className={"input_fed" + (isFocus ? " active" : "")}>
        <label htmlFor={id}>{children}</label>
        <input
            type={type}
            required={required}
            onChange={callback}
            id={id}
            onFocus={() => setIsFocus(true)}
            onBlur={(event) => event.target.value.length === 0 && setIsFocus(false)} />
    </div>
}