import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import image from "../img/cat-menu.jfif";
import { register } from "../hooks/useApi";

import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import FindInPageIcon from '@mui/icons-material/FindInPage';

type RegisterRequest = {
  nombre:string;
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


function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  
  document.title = 'Iniciar Sesion - Asesorias++';

  async function handleLogin() {
    navigate("/");
    }



  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const nombre = (formData.get("nombre") as string) || "";
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    const request: RegisterRequest = {
      nombre,
      email,
      password,
    };

    try {
      await register(request);
      setMessage("Se registró con exito");
      console.log("Se registró con exito");
      navigate("/");
    } catch (error) {
      setMessage("Error en el registro:");
      console.error("Error en el registro:", error);
    }
  
  }

  return (
    <>
    
      <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"
    }} className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="p-3 text-red-50 selection:text-red-50 font-semibold text-6xl"> Asesorias++ </h1>
      <h2 className="p-3 text-red-50 selection:text-red-50 font-semibold text-3xl"> Registrar un usuario </h2>
      
        <form
          onSubmit={handleSubmit}
          
          className="space-y-5 flex flex-col mx-auto"
        >
          <input
            className="outline rounded p-1"
            type="nombre"
            placeholder="nombre"
            name="nombre"
          />
        
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
          <ColorButton_r 
            
            type="submit"
            variant="contained"
          >
            Hacer Registro
          </ColorButton_r >
          <ColorButton_i
          
            onClick={handleLogin}
            variant="contained"
          >
            Iniciar sesión
          </ColorButton_i >
          </div>
          <div className="text-white font-bold">
               {message} 
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

