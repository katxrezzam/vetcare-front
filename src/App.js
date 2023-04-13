import {Route, Routes} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile/Profile";
import Store from "./components/Store/Store";
import CheckOut from "./components/CheckOut/CheckOut";


function App() {
  return (
      <Routes>
        <Route path={'/'} element={<Layout />}>

          <Route path={'login'} element={<Login />}/>
          <Route path={'register'} element={<Register />}/>

          <Route element={<RequireAuth />}>
            <Route path={''} element={<Home />}/>
            <Route path={'/profile'} element={<Profile />}/>
              <Route path={'/store'} element={<Store />}/>
              <Route path={'/checkout'} element={<CheckOut/>}/>
          </Route>

        </Route>
      </Routes>
  );
}

export default App;
