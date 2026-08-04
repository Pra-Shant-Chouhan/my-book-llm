import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/health", (req, res) => {
    res.send("Health check passed!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})