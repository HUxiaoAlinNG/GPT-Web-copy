/*
 * @Author: hilin hilin
 * @Date: 2023-07-15 15:57:58
 * @LastEditors: hilin hilin
 * @LastEditTime: 2023-07-15 16:43:26
 * @FilePath: /GPT-Web-copy/app/components/InputOnetimePassword.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Locale from "../locales";
import { Modal } from "./ui-lib";
import { IconButton } from "./button";
import { useState } from "react";
import styles from "./message-selector.module.scss";

export function PasswordMessageModal(props: { onClose: () => void }) {
  const [password, setPassword] = useState("");
  const doSubmit = () => {
    if (password.trim() === "") return;
    // TODO
  };
  return (
    <div className="modal-mask">
      <Modal title={Locale.Password.Title} onClose={props.onClose}>
        <div className={styles["message-selector"]}>
          <div className={styles["message-filter"]}>
            <input
              type="text"
              placeholder={Locale.Password.Title}
              className={styles["filter-item"] + " " + styles["search-bar"]}
              value={password}
              onInput={(e) => {
                setPassword(e.currentTarget.value);
              }}
            ></input>
            <div className={styles["actions"]}>
              <IconButton
                text={Locale.Password.Login}
                bordered
                className={styles["filter-item"]}
                onClick={doSubmit}
              />
            </div>
          </div>
        </div>
        
      </Modal>
    </div>
  );
}
