function changeString(pageNum, oldString) {
  const index = oldString.search('&page=') + 6;
  if (index - 6 < 0) {
    return oldString;
  }
  let counter = index;
  while (counter < oldString.length) {
    const curChar = parseInt(oldString.charAt(counter), 10);
    if (!Number.isNaN(curChar)) {
      counter += 1;
    } else {
      break;
    }
  }
  const newString = oldString.replace(oldString.slice(index - 6, counter), `&page=${pageNum}`);
  return newString;
}

console.log(changeString(11242, 's&page=00002230asdsdsadasda00'));