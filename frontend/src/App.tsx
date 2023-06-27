import { RouterProvider } from "react-router-dom";

import router from "./routes/router.tsx";
import UserProvider from "./contexts/userContext.tsx";
import ChatProvider from "./contexts/chatContext.tsx";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#884A39",
    },
    secondary: {
      main: "#C38154",
    },
    info: {
      main: "#F9E0BB",
    },
    error: {
      main: "#FFC26F",
    }
    
  },
});

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
