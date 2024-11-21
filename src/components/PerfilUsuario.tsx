import { useState } from 'react';
import { useEffect } from "react";
import useToken from '../hooks/useToken';
import useUsuarioId from '../hooks/useUsuarioId';
import { getUsuario } from "../hooks/useApi";

import Grid from '@mui/material/Grid2';
import { styled, useColorScheme } from '@mui/material/styles';
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
  const [users, setUsers] =useState<User[]>([]);
  document.title = 'Perfil de Usuario';
  

  useEffect(() => {
    async function fetchMessage(){
      try {
      
        const response = await getUsuario(usuarioId,token);
        console.log("Usuario obtenido con exito",response);
        setUsers(response as User[]);
      } catch (error) {
        console.error("Error en obtener usuario:", error);
      
      }}
      fetchMessage();

      

})

  

  return (
  <>
  <div className='  justify-center'> 
   <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid size={7} >
      <Item>
        {users.map((Item) => (
          <div>
            <h3 className="text-lg font-bold">Nombre de Usuario: {Item.nombre}</h3>
            <p>Id de Usuario: {Item.id}</p>
            <p className="text-green-500 font-bold">Email del Usuario: {Item.email}</p>
            <p>Url de Perfil del Usuario: {Item.perfilUrl}</p>
            <p>Fecha de Registro Usuario: {Item.fechaRegistro}</p>
          </div>
        ))}
      </Item>
    </Grid>
    <Grid size={4}>
      <Item>
        size=4
      </Item>
    </Grid>
    <Grid size={11}>
      <Item>
        size=8
      </Item>
    </Grid>
   </Grid>
  </div>
  </>
  
  );
}


  
export default PerfilUsuario;
  