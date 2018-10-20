export default (text: string) => {
  return text.split(/\r|\r\n|\n/).length;
};
