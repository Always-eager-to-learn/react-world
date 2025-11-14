export const getIntFromString = (value: string | number) => {
  const width =
    typeof value === "string" ? (value === "" ? 5 : parseInt(value)) : value
  return width
}
