// Removes extension from file
export const removeExtensionFromFile = (file: string): string => {
  return file.split(".").slice(0, -1).join(".");
};
