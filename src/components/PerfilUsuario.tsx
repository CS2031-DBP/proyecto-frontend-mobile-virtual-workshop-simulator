import { useState } from 'react';
import { useEffect } from "react";
import useToken from '../hooks/useToken';
import useUsuarioId from '../hooks/useUsuarioId';
import { getUsuario } from "../hooks/useApi";

import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// import { green } from '@mui/material/colors';
// import Button, { ButtonProps } from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


interface User {
  id: string;
  nombre: string;
  email: string;
  perfilUrl: string;
  fechaRegistro: string;

}
// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(green[500]),
//   backgroundColor: green[500],
//   '&:hover': {
//     backgroundColor: green[700],
//   },
// }));


function PerfilUsuario() {
  const { usuarioId } = useUsuarioId();
  const { token } = useToken();
  const [users, setUsers] =useState([]);
  document.title = 'Perfil de Usuario';
  

  useEffect(() => {
    async function fetchMessage(){
      try {
      
        const response = await getUsuario(usuarioId,token);
        console.log("Usuario obtenido con exito",response);
        setUsers(response);
      } catch (error) {
        console.error("Error en obtener usuario:", error);
      
  }}
   fetchMessage();
  }, []);
  
  
   


      



  

  return (
  <>
  <div className='  justify-center'> 
   <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid size={7} >
      <Item>
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Datos del Usuario Actual</h1>  
      <p className='text-left'>Id de Usuario: {users.id}</p>
      <p className='text-left'>Email del Usuario: {users.email}</p>
      {/* <p className='text-left'>Url de Perfil del Usuario: {users.perfilUrl}</p> */}
      <p className='text-left'>Fecha de Registro Usuario: {users.fechaRegistro}</p> 
        {/* {users && users.map((Item) => (
          <div > */}
            {/* <h3 className="text-lg font-bold">Nombre de Usuario: {Item.nombre}</h3> */}
      {/* <p className="text-green-500 font-bold">Email del Usuario: {users.email}</p>
      <p>Url de Perfil del Usuario: {users.perfilUrl}</p>
      <p>Fecha de Registro Usuario: {users.fechaRegistro}</p> */}
          {/* </div>
        // ))} */}
      </Item>
    </Grid>
    <Grid size={4}>
      <Item>
        {/* {({users.perfilUrl} != null ) ? <img src={users.perfilUrl} alt="Foto de Perfil" width="100%" height="100%" /> : <p className='text-left'>No existe foto de perifl </p>} */}
        <div className='flex justify-center' > 
        <img src={users.perfilUrl} alt="Foto de Perfil"  width="100px" height="auto"  aspect-ratio="1/1" />
        
        </div>
        <h1 className="text-center p-3 text-red-50 font-semibold text-1xl">Foto de Perfill</h1>  
        
      </Item>
    </Grid>
    <Grid size={11}>
      <Item>
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Carreras Inscritos</h1>  
        size=8
      </Item>
    </Grid>
   </Grid>
  </div>
  </>
  
  );
}


  
export default PerfilUsuario;
  