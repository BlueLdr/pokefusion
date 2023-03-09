const customImageCache = new Set<string>();

//Error detection
export const doesImageExist = async (imageUrl: string) =>
  customImageCache.has(imageUrl) ||
  fetch(imageUrl, { method: "HEAD" })
    .then(response => {
      if (response.status !== 404) {
        customImageCache.add(imageUrl);
        return true;
      }
      return false;
    })
    .catch(() => false);
