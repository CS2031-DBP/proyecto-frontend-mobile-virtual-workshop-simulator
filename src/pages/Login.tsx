import { useNavigate } from "react-router-dom";
import image from "../img/cat-menu.jfif";
import { login } from "../hooks/useApi";
import { useState } from 'react';
import useToken from '../hooks/useToken';

import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { green } from '@mui/material/colors';

type LoginRequest = {
  email: string;
  password: string;
};


const ColorButton_i = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: blue[500],
  display: "flex",
  '&:hover': {
    backgroundColor: blue[700],
    
  },
  
}));

const ColorButton_r = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  display: "flex",
  '&:hover': {
    backgroundColor: green[700],
  },
  
}));


function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setToken } = useToken();
  
  
  document.title = 'Iniciar Sesion - Asesorias++';

  async function handleRegister() {
    navigate("/register");
    }



  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    const request: LoginRequest = {
      email,
      password,
    };

    try {
      const response = await login(request);
      console.log("login con exito");
      setMessage("login con exito");
      const { token } = response;
      setToken(token);
      navigate("/menu");
    } catch (error) {
      console.error("Error en el login:", error);
      setMessage("Error en el login:");
    }
  
  }

  return (
    <>
    
      <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"
    }} className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="p-3 text-red-50 selection:text-red-50 font-semibold text-6xl"> Asesorias++ </h1>
      <h2 className="p-3 text-red-50 selection:text-red-50 font-semibold text-3xl"> Inicio Sesion </h2>
      
        <form
          onSubmit={handleSubmit}
          
          className="space-y-5 flex flex-col mx-auto"
        >
          <input
            className="outline rounded p-1"
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            className="outline rounded p-1"
            type="password"
            placeholder="password"
            name="password"
          />
          <div className="flex gap-4"> 
          <ColorButton_i 
            
            type="submit"
            variant="contained"
          >
            Iniciar sesión
          </ColorButton_i >
          <ColorButton_r
          
            onClick={handleRegister}
            variant="contained"
          >
            Registro
          </ColorButton_r >
          </div>
          <div className="text-white font-bold">
               {message} 
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;



