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

type borrarRequest = {
  id: string;
};

function AñadirHistorial() {
  
  
  document.title = 'borrar';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const id = (formData.get("id") as string) || "";

    const request: borrarRequest = {
      id
    };

    try{
      console.log(request);
       const res = await axios.delete("http://3.90.3.179:8000/api/utec/curso",request 

       
    );
    console.log("curso borrado",res.data);
    }catch(error){
        console.log("error en borrar",error)
      }

  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid size={6}
  >
  <Item>
  
  <h1 className="p-3 text-red-50 selection:text-red-50 font-semibold text-3xl"> borrar curso</h1>
  <form
        onSubmit={handleSubmit}
        
        className="space-y-5 flex flex-col mx-auto"
      >
        <input
          className="outline rounded p-1"
          type="id"
          placeholder="id"
          name="id"
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


  
export default AñadirHistorial;
  