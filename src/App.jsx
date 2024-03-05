import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice.js";
// import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import { AuthLayout, Login, SignUp } from "./components/index";
import Channel from "./pages/Channel/Channel.jsx";
import ChannelVideos from "./pages/Channel/ChannelVideos.jsx";
import History from "./pages/History.jsx";
import VideoDetail from "./pages/VideoDetail.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='' element={<Layout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<HomePage />} />

        <Route path='' element={<AuthLayout />}>
          <Route path='/channel/:userName' element={<Channel />}>
            <Route path='videos' element={<ChannelVideos />} />
            <Route path='playlists' element='' />
            <Route path='tweets' element='' />
            <Route path='subscribed' element='' />
          </Route>
          <Route path='/history' element={<History />} />
        </Route>
      </Route>
      <Route path='/watch/:videoId' element={<VideoDetail />}></Route>
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
      {/* <Toaster
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
      /> */}
    </>
  );
}

export default App;
