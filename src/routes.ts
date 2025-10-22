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

function createRoutes(){
    const routes = createBrowserRouter([
        {
            path: '/',
            children: [
                { index: true, Component: Home },
                { path: 'testimonials', Component: TestimonialPage },
                { path: 'searchapp', Component: SearchApp},
                { path: 'stateintro', Component: StateIntro},
                { path: 'conditionalrendering', Component: ConditionalRendering},
                { path: 'counter', Component: Counter},
                { path: 'lightswitch', Component: LightSwitch},
                { path: 'gallery', Component: Gallery},
                { path: 'profileview', Component: ProfileCarousel}
            ]
        }
    ])

    return routes

}

export { createRoutes }