import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeView from './views/HomeView';
import NotFound from './views/NotFound';
import {AuthProvider} from "./providers/AuthProvider.tsx";
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeView />}/>
        <Route path="*" element={<NotFound/>} />
      </>
    )
  );

  return (
    <>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </>
  )
}

export default App