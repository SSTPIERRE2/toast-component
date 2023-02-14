import React, { useState } from "react";

import Button from "../Button";
import { useToast } from "../ToastProvider";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const defaultFormState = {
  message: "",
  variant: "notice",
};

function ToastPlayground() {
  const [formState, setFormState] = useState(defaultFormState);
  const { addToast } = useToast();

  const handleInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handlePopToast = (e) => {
    e.preventDefault();

    addToast({ variant: formState.variant, message: formState.message });
    setFormState(defaultFormState);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={handlePopToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              name="message"
              className={styles.messageInput}
              value={formState.message}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((opt) => (
              <label htmlFor={opt} key={opt}>
                <input
                  id={opt}
                  type="radio"
                  name="variant"
                  value={opt}
                  onChange={handleInput}
                  checked={formState.variant === opt}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
