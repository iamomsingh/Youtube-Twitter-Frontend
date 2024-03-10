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
import {
  AuthLayout,
  ChangePassword,
  EditPersonalInfo,
  Login,
  SignUp,
} from "./components/index";
import Channel from "./pages/Channel/Channel.jsx";
import ChannelVideos from "./pages/Channel/ChannelVideos.jsx";
import History from "./pages/History.jsx";
import VideoDetail from "./pages/VideoDetail.jsx";
import ChannelTweets from "./pages/Channel/ChannelTweets.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import ChannelSubscribers from "./pages/Channel/ChannelSubscribers.jsx";
import MySubscriptions from "./pages/MySubscriptions.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EditChannel from "./pages/EditChannel.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import SearchVideos from "./pages/SearchVideos.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='' element={<Layout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/search/:query' element={<SearchVideos />} />

        <Route path='' element={<AuthLayout />}>
          <Route path='/channel/:userName' element={<Channel />}>
            <Route path='videos' element={<ChannelVideos />} />
            <Route path='playlists' element='' />
            <Route path='tweets' element={<ChannelTweets />} />
            <Route path='subscribed' element={<ChannelSubscribers />} />
          </Route>
          <Route path='/channel/:userrName/edit' element={<EditChannel />}>
            <Route path='personalInfo' element={<EditPersonalInfo />} />
            <Route path='password' element={<ChangePassword />} />
          </Route>
          <Route path='/history' element={<History />} />
          <Route path='/liked-videos' element={<LikedVideos />} />
          <Route path='/subscribers' element={<MySubscriptions />} />
        </Route>
        <Route path='/support' element={<TermsAndConditions />} />
      </Route>
      <Route path='/watch/:videoId' element={<VideoDetail />}></Route>
      <Route path='' element={<AuthLayout />}>
        <Route path='/collections' element={<AdminDashboard />} />
      </Route>
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
