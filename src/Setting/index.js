import { faClose, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactModal from "react-modal";
import ConfigPage from "./ConfigPage";

export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false/* should be false in production */);

    return <>
        <ReactModal isOpen={isModalOpen}>
            <div>
                <div style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px"
                }}>
                    <h1>設定</h1>
                    <FontAwesomeIcon icon={faClose} style={{
                        width: 15,
                        height: 15,
                        padding: 15,
                        borderRadius: 100,
                        boxShadow: "0 0 8px 0 #00000066",
                        cursor: "pointer"
                    }} onClick={() => setIsModalOpen(false)} />
                </div>

                <ConfigPage />
            </div>
        </ReactModal>
        <FontAwesomeIcon icon={faGear} style={{
            position: "fixed",
            top: 10,
            right: 10,
            padding: 10,
            borderRadius: 100,
            cursor: "pointer",
            boxShadow: "0 0 8px 0 #00000066",
            backgroundColor: "#fff"
        }} onClick={() => setIsModalOpen(true)} />
    </>;
}