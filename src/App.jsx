import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice.js";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Login from "./components/Login.jsx";
import MyChannel from "./pages/MyChannel/MyChannel.jsx";
import MyChannelVideos from "./pages/MyChannel/ChannelVideos.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<HomePage />} />
      <Route path='/my-content' element={<MyChannel />}>
        <Route path='videos' element={<MyChannelVideos />} />
        <Route path='playlists' element='' />
        <Route path='tweets' element='' />
        <Route path='subscribed' element='' />
      </Route>
      <Route path='/login' element={<Login />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Toaster
        position='top-right'
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
