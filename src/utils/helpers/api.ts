//Error detection
export const doesImageExist = (imageUrl: string) =>
  fetch(imageUrl, { method: "HEAD" })
    .then(response => response.status !== 404)
    .catch(() => false);
