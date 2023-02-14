import React, { memo } from "react";

import Toast from "../Toast";
import { useToast } from "../ToastProvider";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts } = useToast();

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast toast={toast} />
        </li>
      ))}
    </ol>
  );
}

export default memo(ToastShelf);
