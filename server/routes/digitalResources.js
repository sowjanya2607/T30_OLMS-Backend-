const express = require("express");
const router = express.Router();
const DigitalResource = require("../models/DigitalResource");

// Get all digital resources
router.get("/", async (req, res) => {
  try {
    const resources = await DigitalResource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new digital resource
router.post("/", async (req, res) => {
  const resource = new DigitalResource({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a digital resource
router.put("/:id", async (req, res) => {
  try {
    const resource = await DigitalResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    resource.title = req.body.title;
    resource.description = req.body.description;
    resource.url = req.body.url;

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a digital resource
router.delete("/:id", async (req, res) => {
  try {
    const resource = await DigitalResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await resource.remove();
    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
