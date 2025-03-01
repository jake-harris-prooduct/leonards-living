// Get the most recent location for a friend up to the selected year
export function getLocation(locations, year) {
  let location = null;
  for (const loc of locations) {
    if (loc.year <= year) {
      location = loc;
    } else {
      break;
    }
  }
  return location;
}
