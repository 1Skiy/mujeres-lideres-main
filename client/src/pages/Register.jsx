import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({
    uname: '',
    email: '',
    password: ''
  });

  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");  // Estado para el mensaje de éxito

  const handleChange = e => {
    setuserDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", userDetails);
      setSuccessMsg("¡Registro exitoso! Redirigiendo a login..."); // Mensaje de éxito
      setTimeout(() => {
        navigate("/login"); // Redirigir después de unos segundos
      }, 2000);  // Espera 2 segundos antes de redirigir
    } catch (err) {
      seterrorMsg(err.response.data);
    }
  };

  return (
    <>
      <div className="auth">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>  {/* Cambio de onClick a onSubmit */}
          <input type="text" placeholder="Username" name='uname' onChange={handleChange} />
          <input type="email" placeholder="Email" name='email' onChange={handleChange} />
          <input type="password" placeholder="Password" name='password' onChange={handleChange} /> {/* Cambio a tipo password */}
          
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>} {/* Mensaje de error */}
          {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>} {/* Mensaje de éxito */}
          
          <button type="submit">Registrarse</button>  {/* Cambio de onClick a tipo submit */}
          
          <span>
            ¿Ya tienes una cuenta? <Link className="link" to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Register;
