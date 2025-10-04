import { Link, Outlet } from "react-router-dom";
// import {useDispatch} from "react-redux";
// import {useLogoutMutation} from "@store/api.ts";
// import {logout} from "@store/authSlice.ts";

export const Layout = () => {
  // const dispatch = useDispatch();
  // const [logoutFetch] = useLogoutMutation();
  // const logoutFn = async() => {
  //   try {
  //     console.log('test')
  //     await logoutFetch().unwrap();
  //     dispatch(logout());
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <>
      <header>
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "1rem",
              fontSize: "20px",
            }}
          >
            <li>
              <Link
                style={{ color: "white", textDecorationLine: "none" }}
                to="/"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                style={{ color: "white", textDecorationLine: "none" }}
                to="/transaction"
              >
                Transaction
              </Link>
            </li>
            <li>
              <Link
                style={{ color: "white", textDecorationLine: "none" }}
                to="/stats"
              >
                Stats
              </Link>
            </li>
            {/*<button onClick={logoutFn}>LOGOUT</button>*/}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
