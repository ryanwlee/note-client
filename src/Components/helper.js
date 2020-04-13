export const titleHelper = (content) => {
  const maxNum = 60;
  if (content.length < maxNum) {
    return content;
  } else {
    return content.slice(0, maxNum) + " ...";
  }
};
