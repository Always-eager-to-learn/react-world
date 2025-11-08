import type { IconName } from "lucide-react/dynamic"

export const ItemTypes = {
  Project: "Project",
  Experiment: "Experiment",
  Design: "Design",
}

export type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes]

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

export const items = [
  {
    name: "Testimonials",
    description: "A design for a testimonials from people.",
    icon: icons[0],
    locationToGo: "/designs/testimonials",
    type: ItemTypes.Design,
  },
  {
    name: "Search Layout",
    description: "A design for a search application introduction page.",
    icon: icons[1],
    locationToGo: "/designs/searchapp",
    type: ItemTypes.Design,
  },
  {
    name: "Click Button",
    description:
      "A design introducing the functionality of a state management and re-rendering.",
    icon: icons[2],
    locationToGo: "/experiments/stateintro",
    type: ItemTypes.Experiment,
  },
  {
    name: "Conditional Render",
    description:
      "A design introducing the conditional rendering of items in react.",
    icon: icons[3],
    locationToGo: "/experiments/conditionalRendering",
    type: ItemTypes.Experiment,
  },
  {
    name: "Counter",
    description:
      "A design to show the working of state to create a basic counter.",
    icon: icons[4],
    locationToGo: "/experiments/counter",
    type: ItemTypes.Experiment,
  },
  {
    name: "Light Carousel",
    description:
      "A design to show the changing to background color on state change. Like turning a light on and off.",
    icon: icons[5],
    locationToGo: "/experiments/lightswitch",
    type: ItemTypes.Experiment,
  },
  {
    name: "Image Gallery",
    description:
      "A design for a image gallery comprising of images of dogs, cats, birds and horses.",
    icon: icons[6],
    locationToGo: "/projects/gallery?name=dogs",
    type: ItemTypes.Project,
  },
  {
    name: "Profile Display",
    description:
      "A design showcasing two designs where there is a carousel view and a list view.",
    icon: icons[7],
    locationToGo: "/projects/profileview?view=carousel",
    type: ItemTypes.Project,
  },
  {
    name: "To-Do-List",
    description:
      "A project combining frontend and backend to create a todo application.",
    icon: icons[8],
    locationToGo: "/projects/todoapp",
    type: ItemTypes.Project,
  },
]
