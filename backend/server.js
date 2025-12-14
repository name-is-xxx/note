const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;

// 允许所有跨域请求
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// POST
app.post("/backend/note/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, lastUpdate } = req.body;
  const noteId = Number(id);
  const noteData = { id: noteId, title, content, lastUpdate };

  try {
    const filePath = path.join(__dirname, "note", `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(noteData, null, 4), "utf8");
    res
      .status(201)
      .json({ message: "Note created successfully", data: noteData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET
app.get("/backend/note/:id.json", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "note", `${id}.json`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// UPDATE
app.put("/backend/note/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, lastUpdate } = req.body;
  const filePath = path.join(__dirname, "note", `${id}.json`);

  try {
    let noteData = fs.readFileSync(filePath);
    noteData = JSON.parse(noteData);
    noteData.title = title;
    noteData.content = content;
    noteData.lastUpdate = lastUpdate;
    fs.writeFileSync(filePath, JSON.stringify(noteData, null, 4), "utf8");
    res
      .status(200)
      .json({ message: "Note updated successfully", data: noteData });
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

// DELETER
app.delete("/backend/note/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "note", `${id}.json`);

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

// find available port
function findPort(port) {
  app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is in use, trying next one.`);
        findPort(port + 1);
      } else {
        throw err;
      }
    });
}

// 启动服务器
findPort(port);
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
