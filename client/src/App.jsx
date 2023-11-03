import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Profile from "./Pages/Profile"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Header from "./components/Header"
import RoutePrivate from "./components/RoutePrivate"
import CreateListing from "./Pages/CreateListing"
import UpdateListing from "./Pages/UpdateListing"
import Listing from "./Pages/Listing"
import Search from "./Pages/Search"
function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path='/listing/:listingId' element={<Listing/>} />
          <Route path='/search' element={<Search/>} />
          <Route element={<RoutePrivate/>}>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/create-listing" element={<CreateListing/>}/>
            <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
