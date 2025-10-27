import { icons as homeIcons } from "../data/homelinks"
import { headerIconsArray } from "../data/navigationLinks"

type home = typeof homeIcons
type headerIcons = typeof headerIconsArray
export type IconsType = home | headerIcons
