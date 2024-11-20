import axios from "axios";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { green } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';

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

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

type historyRequest = {
  nombre: string;
};

function EditarCurso() {
  // const { token } = useToken();
  
  document.title = 'Editar';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const nombre = (formData.get("nombre") as string) || "";

    const request: historyRequest = {
      nombre
    };

    try{
      console.log(request);
       const res = await axios.put("http://3.90.3.179:8000/api/user/history",request
        
    );
    console.log("curso editado",res.data);
    }catch(error){
        console.log("error en PUT",error)
      }

  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid size={6}
  >
  <Item>
  
  <h1 className="p-3 text-red-50 selection:text-red-50 font-semibold text-3xl"> Editar Cursol</h1>
  <form
        onSubmit={handleSubmit}
        
        className="space-y-5 flex flex-col mx-auto"
      >
        <input
          className="outline rounded p-1"
          type="name"
          placeholder="nombre"
          name="nombre"
        />
        
  
        <ColorButton 
          className="rounded bg-red-400 hover:bg-blue-300 p-1"
          type="submit"
          variant="contained"
        >
          borrar 
        </ColorButton >
      </form>
  </Item>
  </Grid>
  <Grid size={6}>
  <Item>2</Item>
  </Grid>
  
  </Grid>
  </>
  );
}


  
export default EditarCurso;
  