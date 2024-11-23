// import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

import NoteAddIcon from '@mui/icons-material/NoteAdd';

import FindInPageIcon from '@mui/icons-material/FindInPage';

// import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';



import AgregarMaterial from "../components/AgregarMaterial";
import BuscarMaterial from "../components/BuscarMaterial";
import PerfilUsuario from "../components/PerfilUsuario";
import CerrarSesion from "../components/CerrarSesion";


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Opciones ',
  },
  {
    segment: 'dashboard1',
    title: 'Buscar Materiales',
    icon: <FindInPageIcon />,
  },
 
  {
    segment: 'dashboard2',
    title: 'Aportar Material',
    icon: <NoteAddIcon />,
  },
  {
    segment: 'dashboard3',
    title: 'Perfil de Usuario',
    icon: <NoteAddIcon />,
  },
  {
    segment: 'dashboard4',
    title: 'Cerrar Sesion',
    icon: <NoteAddIcon />,
  },
  
  
  
  {
    kind: 'divider',
  },
  
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//     children: [
//       {
//         segment: 'sales',
//         title: 'Sales',
//         icon: <DescriptionIcon />,
//       },
//       {
//         segment: 'traffic',
//         title: 'Traffic',
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
  
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-Asesor-color-scheme',
  },
  colorSchemes:  {
    light: {
      palette: {
        background: {
          default: '#256D3F',
          paper: '#14241C',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#121815',
          paper: '#040B07',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: "stretch",
        textAlign: 'center',
      }}
    >
        {(pathname == "/dashboard1") ? <BuscarMaterial /> : null}
        {(pathname == "/dashboard2") ? <AgregarMaterial /> : null}
        {(pathname == "/dashboard3") ? <PerfilUsuario /> : null}
        {(pathname == "/dashboard4") ? <CerrarSesion /> : null}
        

      {/* <Typography>Dashboard content for {pathname}</Typography> */}
    </Box>
    
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
    document.title = 'Menu';
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        // logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Asesorias++',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}