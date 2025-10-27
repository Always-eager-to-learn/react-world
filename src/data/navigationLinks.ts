import type { IconName } from "lucide-react/dynamic"

const icons: IconName[] = [
  "house",
  "microscope",
  "users-round",
  "test-tubes",
  "heart",
]

const navigationLinks = [
  {
    name: "Home",
    iconName: icons[0],
    location: "/",
  },
  {
    name: "Popular Projects",
    iconName: icons[4],
    location: "/popularProjects",
  },
  {
    name: "Experiments",
    iconName: icons[3],
    location: "/experiments",
  },
  {
    name: "Development",
    iconName: icons[1],
    location: "/developmentProjects",
  },
  {
    name: "Community Builds",
    iconName: icons[2],
    location: "/communityProjects",
  },
]

const headerIconsArray: IconName[] = [
  "vector-square",
  icons[4],
  icons[3],
  icons[1],
  icons[2],
]

const defaultOne: IconName = "vector-square"

export { navigationLinks, headerIconsArray, defaultOne }
