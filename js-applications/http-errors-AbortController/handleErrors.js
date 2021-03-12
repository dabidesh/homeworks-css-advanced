function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
const callFetch = async () => {
  await fetch("http://httpstat.us/500")
    .then(handleErrors)
    .then(response => console.log("ok"))
    .catch(error => console.log(error));
};

callFetch();