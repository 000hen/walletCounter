import { useState } from "react";
import Button from "../Button";
import Add from "../Add";
import ReactModal from "react-modal";

export default () => {
    const [modalShow, setModalShow] = useState(false);

    return <div>
        <ReactModal isOpen={modalShow}>
            <Add close={() => setModalShow(false)} />
        </ReactModal>

        <h1>目前尚未有任何錢包物件。</h1>
        <h3>Tips: 立即新增紀錄錢包</h3>
        <h2 style={{
            textAlign: "center"
        }}><Button onClick={() => setModalShow(true)}>新增吧！</Button></h2>
    </div>;
}