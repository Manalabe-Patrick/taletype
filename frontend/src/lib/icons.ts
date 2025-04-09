export const iconsURL: string =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/public/icons"
    : "https://taletype.onrender.com/public/icons";
