import { createRoot } from "react-dom/client";
import Main from "./Main";

import "./index.css";
import ReactModal from "react-modal";

ReactModal.setAppElement(document.getElementById("modal"));
createRoot(document.getElementById("app")).render(<Main />);

function inputStyle() {
    var inputs = document.getElementsByTagName("input");
    Array.from(inputs).forEach(e => {
        if (e.value !== "") e.parentElement.classList.add("active");
        e.addEventListener("focusin", ev => {
            e.parentElement.classList.add("active");
        });

        e.addEventListener("focusout", ev => {
            if (e.value === "") {
                e.parentElement.classList.remove("active");
            }
        });
    });
}

document.addEventListener("DOMNodeInserted", (ev) => {
    inputStyle();
}, false);