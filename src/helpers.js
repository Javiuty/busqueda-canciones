export function shortTitle(title) {
  if (title.length > 55) {
    return title.slice(0, 41) + "...";
  } else {
    return title;
  }
}
