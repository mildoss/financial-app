import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

interface Props {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const Toast = ({ message, type = "success", onClose }: Props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const appearTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(appearTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onClose, 500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${visible ? styles.show : styles.hide}`}
    >
      {message}
    </div>
  );
};
