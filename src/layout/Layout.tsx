import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Layout.module.css";
import { useLogoutMutation } from "@store/api.ts";
import { logout } from "@store/authSlice.ts";
import { showToast } from "@store/toastSlice.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";

export const Layout = () => {
  const dispatch = useDispatch();
  const [logoutFetch] = useLogoutMutation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const logoutFn = async () => {
    try {
      await logoutFetch().unwrap();
      dispatch(logout());
      dispatch(showToast({ message: "Logout successfully", type: "success" }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(showToast({ message: error, type: "error" }));
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);


  return (
    <>
      <header>
        <nav className={styles.navigate}>
          <div className={styles["menu-container"]}>
            <button
              className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul
              className={`${styles["menu-list"]} ${menuOpen ? styles["menu-open"] : styles["menu-close"]}`}
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles["menu-list__item__link"]} ${isActive ? styles.active : ""}`
                  }
                  to="/"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles["menu-list__item__link"]} ${isActive ? styles.active : ""}`
                  }
                  to="/transaction"
                >
                  Transaction
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles["menu-list__item__link"]} ${isActive ? styles.active : ""}`
                  }
                  to="/stats"
                >
                  Stats
                </NavLink>
              </li>
              <li>
                <button className={styles["logout-btn"]} onClick={logoutFn}>
                  Logout
                </button>
              </li>
            </ul>
            <button className={styles.btn} onClick={logoutFn}>
              LOGOUT
            </button>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
