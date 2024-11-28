import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");  // Estado para el mensaje de éxito
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setuserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(userDetails);
      setSuccessMsg("¡Login exitoso! Redirigiendo a la página de inicio...");  // Mensaje de éxito
      setTimeout(() => {
        navigate("/");  // Redirigir después de unos segundos
      }, 2000);
    } catch (err) {
      seterrorMsg(err.response?.data?.message || "Error en la autenticación");
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} {/* Mostrar error */}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>} {/* Mostrar éxito */}
        <button type="submit">Login</button>
        <span>
          ¿No tienes una cuenta?{" "}
          <Link className="link" to="/register">
            Registrarse
          </Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;
