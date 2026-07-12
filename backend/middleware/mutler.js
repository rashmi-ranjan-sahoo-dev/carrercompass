import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({storage})
.fields([
    {name: "profilePhoto"},
    {name: "resume"},
    {name: "logo"}
])