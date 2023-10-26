import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Profile from "./Pages/Profile"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Header from "./components/Header"
import RoutePrivate from "./components/RoutePrivate"
import CreateListing from "./Pages/CreateListing"
function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route element={<RoutePrivate/>}>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/create-listing" element={<CreateListing/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
