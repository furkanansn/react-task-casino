import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";
import NavBar from "./NavBar";

export const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <>
      {ctx.isLoggedIn && <NavBar />}
      <nav className={classes.nav + " nav-area"}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Games</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/slot">Slot</a>
            </li>
          )}
          {!ctx.isLoggedIn && (
            <li>
              <a href="/register">Register</a>
            </li>
          )}
           {!ctx.isLoggedIn && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
