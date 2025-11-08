import type { IconName } from "lucide-react/dynamic"

export type ItemType = "Project" | "Experiment"

export const icons: IconName[] = [
  "chart-no-axes-combined",
  "search",
  "mouse-pointer-click",
  "badge-question-mark",
  "tally-5",
  "lightbulb",
  "image",
  "circle-user-round",
  "notebook",
]

const itemsTypeArray: ItemType[] = ["Project", "Experiment"]

export const items = [
  {
    name: "Testimonials",
    description: "A design for a testimonials from people.",
    icon: icons[0],
    locationToGo: "/projects/testimonials",
    type: itemsTypeArray[0],
  },
  {
    name: "Search Layout",
    description: "A design for a search application introduction page.",
    icon: icons[1],
    locationToGo: "/projects/searchapp",
    type: itemsTypeArray[0],
  },
  {
    name: "Click Button",
    description:
      "A design introducing the functionality of a state management and re-rendering.",
    icon: icons[2],
    locationToGo: "/experiments/stateintro",
    type: itemsTypeArray[1],
  },
  {
    name: "Conditional Render",
    description:
      "A design introducing the conditional rendering of items in react.",
    icon: icons[3],
    locationToGo: "/experiments/conditionalRendering",
    type: itemsTypeArray[1],
  },
  {
    name: "Counter",
    description:
      "A design to show the working of state to create a basic counter.",
    icon: icons[4],
    locationToGo: "/experiments/counter",
    type: itemsTypeArray[1],
  },
  {
    name: "Light Carousel",
    description:
      "A design to show the changing to background color on state change. Like turning a light on and off.",
    icon: icons[5],
    locationToGo: "/experiments/lightswitch",
    type: itemsTypeArray[1],
  },
  {
    name: "Image Gallery",
    description:
      "A design for a image gallery comprising of images of dogs, cats, birds and horses.",
    icon: icons[6],
    locationToGo: "/projects/gallery?name=dogs",
    type: itemsTypeArray[0],
  },
  {
    name: "Profile Display",
    description:
      "A design showcasing two designs where there is a carousel view and a list view.",
    icon: icons[7],
    locationToGo: "/projects/profileview?view=carousel",
    type: itemsTypeArray[0],
  },
  {
    name: "To-Do-List",
    description:
      "A project combining frontend and backend to create a todo application.",
    icon: icons[8],
    locationToGo: "/projects/todoapp",
    type: itemsTypeArray[0],
  },
]
