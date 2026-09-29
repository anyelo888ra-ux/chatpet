window.ChatPetVision = (() => {
  let image = null;
  const MAX_BYTES = 4 * 1024 * 1024;

  function set(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      if (!file.type.startsWith("image/")) return reject(new Error("Only image files are supported"));
      if (file.size > MAX_BYTES) return reject(new Error("Image is too large (max 4 MB)"));
      const reader = new FileReader();
      reader.onload = () => {
        image = { data: String(reader.result), name: file.name, type: file.type };
        resolve(image);
      };
      reader.onerror = () => reject(new Error("Could not read image"));
      reader.readAsDataURL(file);
    });
  }

  function attach(request) {
    if (!image) return request;
    return { ...request, image: image.data, imageName: image.name, imageMime: image.type };
  }

  function clear() { image = null; }
  function current() { return image; }

  return { set, attach, clear, current, MAX_BYTES };
})();