import path from "path";

export const resolvePath = (
  pathType: string,
  userPath: string,
  projectName: string
) => {
  if (pathType === "Current directory") {
    return process.cwd();
  } else if (pathType === "Relative path") {
    return path.resolve(process.cwd(), userPath);
  } else if (pathType === "Full path") {
    return userPath;
  }
  throw new Error("Invalid path type.");
};