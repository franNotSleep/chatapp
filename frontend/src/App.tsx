import { RouterProvider } from "react-router-dom";

import router from "./routes/router.tsx";
import UserProvider from "./contexts/userContext.tsx";
import ChatProvider from "./contexts/chatContext.tsx";

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
