import { RouterProvider } from "react-router-dom";

import router from "./routes/router.tsx";
import UserProvider from "./contexts/userContext.tsx";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
