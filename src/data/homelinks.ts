import type { IconName } from "lucide-react/dynamic"

export const icons: IconName[] = [
  "chart-no-axes-combined",
  "search",
  "mouse-pointer-click",
  "badge-question-mark",
  "tally-5",
  "lightbulb",
  "image",
  "circle-user-round",
]

export const items = [
  {
    name: "Testimonials",
    description: "A design for a testimonials from people.",
    icon: icons[0],
    locationToGo: "/projects/testimonials",
  },
  {
    name: "Search Layout",
    description: "A design for a search application introduction page.",
    icon: icons[1],
    locationToGo: "/projects/searchapp",
  },
  {
    name: "Click Button",
    description:
      "A design introducing the functionality of a state management and re-rendering.",
    icon: icons[2],
    locationToGo: "/projects/stateintro",
  },
  {
    name: "Conditional Render",
    description:
      "A design introducing the conditional rendering of items in react.",
    icon: icons[3],
    locationToGo: "/projects/conditionalRendering",
  },
  {
    name: "Counter",
    description:
      "A design to show the working of state to create a basic counter.",
    icon: icons[4],
    locationToGo: "/projects/counter",
  },
  {
    name: "Light Carousel",
    description:
      "A design to show the changing to background color on state change. Like turning a light on and off.",
    icon: icons[5],
    locationToGo: "/projects/lightswitch",
  },
  {
    name: "Image Gallery",
    description:
      "A design for a image gallery comprising of images of dogs, cats, birds and horses.",
    icon: icons[6],
    locationToGo: "/projects/gallery?name=dogs",
  },
  {
    name: "Profile Display",
    description:
      "A design showcasing two designs where there is a carousel view and a list view.",
    icon: icons[7],
    locationToGo: "/projects/profileview?view=carousel",
  },
]
