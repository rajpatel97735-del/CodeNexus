import Project from "../models/Project.js";

// ======================================
// Create Project
// ======================================
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      language,
      html,
      css,
      javascript,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required.",
      });
    }

    const existingProject = await Project.findOne({
      title: title.trim(),
      user: req.user.id,
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project with this name already exists.",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description,
      language,
      html,
      css,
      javascript,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Projects
// ======================================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id,
    }).sort({
      lastOpened: -1,
    });

    return res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Project
// ======================================
export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    project.lastOpened = new Date();
    await project.save();

    return res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Project
// ======================================
export const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      language,
      html,
      css,
      javascript,
      chatHistory,
      isStarred,
      thumbnail,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required.",
      });
    }

    const existingProject = await Project.findOne({
      title: title.trim(),
      user: req.user.id,
      _id: { $ne: req.params.id },
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project with this name already exists.",
      });
    }

    const updateData = {
      title: title.trim(),
      description,
      language,
      html,
      css,
      javascript,
      isStarred,
      thumbnail,
    };

    if (chatHistory !== undefined) {
      updateData.chatHistory = chatHistory;
    }

    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Project
// ======================================
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};