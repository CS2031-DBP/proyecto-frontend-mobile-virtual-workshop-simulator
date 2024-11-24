
import { useState } from 'react';
import { useEffect } from "react";
import useToken from '../hooks/useToken';

import useUsuarioId from '../hooks/useUsuarioId';
import {getActividadedByIdOrName} from "../hooks/useApi";
// import { getUsuario } from "../hooks/useApi";
import { getCursos } from "../hooks/useApi";

import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


//Bara de busqueda material Ui
import {  alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import Button, { ButtonProps } from '@mui/material/Button';
import { blue } from '@mui/material/colors';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    alignItems: "left",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ColorButton_i = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  display: "flex",
  '&:hover': {
  backgroundColor: blue[700],

    
  },
  
}));
//fin



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

function PerfilUsuario() {
  const { usuarioId } = useUsuarioId();
  const { token } = useToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [actividades,setActividades]=useState<any[]>([]);
  const [isCursoSelected,setIsCursoSelected]=useState(false);
  const [message, setMessage] = useState("");
  document.title = 'Buscar actividades';


  //test
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cursos,setCursos]=useState<any[]>([]);
  //
  useEffect(() => {
    async function fetchMessage(){
      

  //get cursos
  try {
        
    const fes = await getCursos(usuarioId,token);
    //console.log("Usuario obtenido con exito",response);
    setCursos(fes);
    
    
    console.log([fes]);

  } catch (error) {
    console.error("Error en obtener cursos:", error);
    setMessage("Error en obtener cursos:");
  
}
}
   fetchMessage();
   
  }, [token,usuarioId]);
  //


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const seardh = (formData.get("seardh") as string || "");
    console.log(seardh);
    //hacer combrobacion de nombre o id = no es necesaria , el endpoint se encarga de eso
    
    //realizar get de actividades
    try {
      const res1 = await getActividadedByIdOrName(token,seardh);
      setActividades(res1);
      //confirmar y renderizar los datos
      setIsCursoSelected(true);
      
    } catch (error) {
      console.log(error);
      setMessage("error en busqueda, ingresar un nombre o id correcto y que el curso tenga actividades")
    
    
  }

    
  }

  return (
  <>
  <div className='  justify-center'> 
   <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid size={11} >
      <Item>
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl ">Buscar Actividades</h1> 
      <p className='text-left'>Ingrese el nombre o id del curso:</p>
           <form onSubmit={handleSubmit}>
           
           <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search.."
              type="name"
              name="seardh"
              inputProps={{ 'aria-label': 'search' }}

            />
            
          </Search>
          <ColorButton_i 
            
            type="submit"
            variant="contained"
          >
            Realizar Busqueda
          </ColorButton_i >
          <div className="flex flex-col text-white font-bold bg-amber-900">
               {message} 
          </div>
          
          </form>    
        {/* {users.map((user) =>(
          <div
          key={user.id}
          className="border p-4 rounded cursor-pointer"
          >
          
          <p className='text-left'>Id de Usuario: {user.id}</p>
          <p className='text-left'>Email del Usuario: {user.email}</p>
          <p className='text-left'>Fecha de Registro Usuario: {user.fechaRegistro}</p>
          </div>
        ))

        } */}

      </Item>
    </Grid>
    <Grid size={7}>
      {isCursoSelected ? <Item>
      
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Actividades Inscritas</h1>  
      {
        actividades &&  actividades.map((item,re)=><div key={re}>
          <p className='text-left'>------</p>
        <p className='text-left'>Nombre del Evento: {item.nombre}</p>
        <p className='text-left'>Tipo:{item.tipo}</p>
        <p className='text-left'>Enlace:{item.enlace}</p>
        <p className='text-left'>Fecha de Creacion evento:{item.fecha}</p>
        <p className='text-left'>Hora de la Actividad:{item.fecha}</p>  
        <p className='text-left'>------</p>  </div>)
      }
      </Item>: <Item>
      
      <h1 className="text-center p-3 text-red-50 font-semibold text-1xl">esperando seleccion</h1>  
      </Item> }
      
    </Grid>
    <Grid size={4}>
      
      <h1 className="text-center p-3 text-red-50 font-semibold text-2xl">Cursos Inscritos</h1>  
      {
        cursos &&  cursos.map((item,re)=><div key={re}> <p className='text-left' >Id del curso: {item.id}</p> <p className='text-left'> Nombre del curso: {item.nombre}</p> </div>)
      }
    </Grid>
    
   </Grid>
  </div>
  </>
  
  );
}


  
export default PerfilUsuario;
  