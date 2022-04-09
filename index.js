const express = require("express");
const app = express();

app.use(express.json);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running! on Port: ${PORT}`);
});