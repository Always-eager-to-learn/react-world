import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import TestimonialPage from "./pages/Testimonials"
import SearchApp from "./pages/SearchApp"
import StateIntro from "./pages/StateIntro"
import ConditionalRendering from "./pages/ConditionalRendering"
import Counter from "./pages/Counter"
import LightSwitch from "./pages/LightSwitch"
import Gallery from "./pages/Gallery"
import ProfileCarousel from "./pages/ProfileCarousel"
import HomePage from "./pages/Home/HomePage"
import { headerIconsArray } from "./data/navigationLinks"
import Tasks from "./pages/Tasks"
import DrawingCanvas from "./pages/DrawingCanvas"
import VirtualWorld from "./pages/VirtualWorld"

function createRoutes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      Component: Home,
      children: [
        {
          index: true,
          Component: HomePage,
          handle: { title: "React World", icon: headerIconsArray[0] },
        },
        {
          path: "popularProjects",
          handle: { title: "Popular Projects", icon: headerIconsArray[1] },
        },
        {
          path: "experiments",
          handle: { title: "Experiment Projects", icon: headerIconsArray[2] },
        },
        {
          path: "developmentProjects",
          handle: { title: "Development Projects", icon: headerIconsArray[3] },
        },
        {
          path: "communityProjects",
          handle: { title: "Community Projects", icon: headerIconsArray[4] },
        },
      ],
    },
    {
      path: "/projects",
      children: [
        { path: "gallery", Component: Gallery },
        { path: "profileview", Component: ProfileCarousel },
        { path: "todoapp", Component: Tasks },
        { path: "drawingcanvas", Component: DrawingCanvas },
        { path: "virtualworld", Component: VirtualWorld },
      ],
    },
    {
      path: "/experiments",
      children: [
        { path: "stateintro", Component: StateIntro },
        { path: "conditionalrendering", Component: ConditionalRendering },
        { path: "counter", Component: Counter },
        { path: "lightswitch", Component: LightSwitch },
      ],
    },
    {
      path: "/designs",
      children: [
        { path: "testimonials", Component: TestimonialPage },
        { path: "searchapp", Component: SearchApp },
      ],
    },
  ])

  return routes
}

export { createRoutes }
