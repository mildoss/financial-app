import { useEffect, useState } from "react";
import { LoginForm, RegisterForm } from "@components/index";
import styles from "./AuthPage.module.css";
import "@styles/page.css";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"register" | "login">("login");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [activeTab, message]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className="page-title">Financial Tracker</h1>
            <p className="page-subtitle">
              Manage your finances easily and simply
            </p>
          </div>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "login" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Sign in
            </button>
            <button
              className={`${styles.tab} ${activeTab === "register" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Sign up
            </button>
          </div>
          <div className={styles.content}>
            {activeTab === "login" ? (
              <LoginForm message={message} />
            ) : (
              <RegisterForm
                setMessage={setMessage}
                onChangeActiveTab={() => setActiveTab("login")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
