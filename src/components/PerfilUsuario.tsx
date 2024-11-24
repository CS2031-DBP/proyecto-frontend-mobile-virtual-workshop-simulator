
import { useState } from 'react';
import { useEffect } from "react";
import useToken from '../hooks/useToken';
import useUsuarioId from '../hooks/useUsuarioId';
import { getUsuario } from "../hooks/useApi";
import { getCursos } from "../hooks/useApi";

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

// interface Curso {
//   id: string;
//   nombre: string;
// }
// interface Carrera {
//   id: string;
//   nombre: string;
//   cursos: Curso;
// }


// }
// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(green[500]),
//   backgroundColor: green[500],
//   '&:hover': {
//     backgroundColor: green[700],
//   },
// }));
// eslint-disable-@typescript-eslint/no-explicit-any
// const Colors=({data})=>{
//   console.log(data);
//   for (let i = 0; i < 2;  i++) {
//     return(
//       <>
       
//       </>
//   )
//   }
  
// }


function PerfilUsuario() {
  const { usuarioId } = useUsuarioId();
  const { token } = useToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carrera_e, setCarrera_e] = useState<any[]>([]);
  // const [cursos, setCursos] = useState<Curso[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cursos,setCursos]=useState<any[]>([]);

  document.title = 'Perfil de Usuario';

  
  

  useEffect(() => {
    async function fetchMessage(){
      //get careras
      try {
        
        const response = await getUsuario(usuarioId,token);
        //console.log("Usuario obtenido con exito",response);
        setUsers([response]);
        
        // const obj = new Object();
        
        // for (let i = 0; i < 2;  i++) {
        //   Array.prototype.push.call(obj,response.carreras[i].cursos );
        // }
        // console.log([obj]);

        console.log([response]);
        setCarrera_e(response.carreras);
        // setColorsData(response);
      //  setCursos([response.carreras.cursos]);
        // console.log([response.carreras]);
        // for (const [key, value] of Object.entries([response.carreras[1].cursos])) {
        //   console.log(`${key}: ${value.nombre}`);
        // }
        
      } catch (error) {
        console.error("Error en obtener usuario:", error);
      
      
  }

  //get cursos
  try {
        
    const fes = await getCursos(usuarioId,token);
    //console.log("Usuario obtenido con exito",response);
    setCursos(fes);
    
    
    console.log([fes]);
    // setColorsData(response);
  //  setCursos([response.carreras.cursos]);
    // console.log([response.carreras]);
    // for (const [key, value] of Object.entries([response.carreras[1].cursos])) {
    //   console.log(`${key}: ${value.nombre}`);
    // }
    
  } catch (error) {
    console.error("Error en obtener cursos:", error);
  
  
}

}
   fetchMessage();
   
  }, [token,usuarioId]);
  //console.log(users);
  
  //console.log(carrera_e);
  return (
  <>
  <div className='  justify-center'> 
   <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid size={7} >
      <Item>
        {users.map((user) =>(
          <div
          key={user.id}
          className="border p-4 rounded cursor-pointer"
          >
          <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Datos del Usuario Actual</h1> 
          <p className='text-left'>Id de Usuario: {user.id}</p>
          <p className='text-left'>Email del Usuario: {user.email}</p>
          <p className='text-left'>Fecha de Registro Usuario: {user.fechaRegistro}</p>
          </div>
        ))

        }

      </Item>
    </Grid>
    <Grid size={4}>
      <Item>
        {/* {({users.perfilUrl} != null ) ? <img src={users.perfilUrl} alt="Foto de Perfil" width="100%" height="100%" /> : <p className='text-left'>No existe foto de perifl </p>} */}
        {users.map((user) =>(
          <div key={user.id}className='flex justify-center'>
          <img src={user.perfilUrl} alt="Foto de Perfil"  width="200px" height="auto"  aspect-ratio="1/1" />
          
          </div>
        ))

        }
        
        <div className='flex justify-center'> <h1 className="text-center p-3 text-red-50 font-semibold text-1xl">Foto de Perfill</h1>   </div>
        
      </Item>
    </Grid>
    <Grid size={5}>
      <Item>
      
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Carreras Inscritas</h1>  
      {
        carrera_e &&  carrera_e.map((item,re)=><div key={re}><p>{item.nombre}</p> </div>)
      }
      </Item>
    </Grid>
    <Grid size={6}>
      <Item>
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Cursos Inscritos</h1>  
      {
        cursos &&  cursos.map((item,re)=><div key={re}> <p className='text-left' >Id del curso: {item.id}</p> <p className='text-left'> Nombre del curso: {item.nombre}</p> </div>)
      }
      </Item>
    </Grid>
    
   </Grid>
  </div>
  </>
  
  );
}


  
export default PerfilUsuario;
  