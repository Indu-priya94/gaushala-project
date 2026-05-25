import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";

function Header() {

  const token = localStorage.getItem("token");

  const { language, setLanguage, t } =
    useContext(LanguageContext);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header
      style={{
        backgroundColor: "#2e7d32",
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 250px",
          alignItems: "center",
        }}
      >
        {/* Left Logo */}
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfF_SOdLLFyGK3CXiVS7BMFmxsPRutTnaTEw&s"
            alt="logo"
            style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Center Title */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              margin: "0",
              fontSize: "34px",
              fontWeight: "bold",
            }}
          >
            Sri Krishna Gaushala
          </h1>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            <option value="english">
              English
            </option>

            <option value="telugu">
              Telugu
            </option>

            <option value="hindi">
              Hindi
            </option>
          </select>

          {/* Login / Logout */}
          {token ? (
            <button
              onClick={logout}
              style={{
                background: "orange",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {t.logout}
            </button>
          ) : (
            <Link
              to="/admin-login"
              style={{
                background: "orange",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {t.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;