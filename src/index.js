import { createRoot } from "react-dom/client";
import Main from "./Main";
import ReactModal from "react-modal";
import md5 from "./md5";

import "./index.css";
import WalletContainer from "./WalletContainer";

window.md5 = md5;
window.wallet = WalletContainer;

console.log("walletCounter By Muisnow");

ReactModal.setAppElement(document.getElementById("modal"));
createRoot(document.getElementById("app")).render(<Main />);