import Project from "../models/Project.js";

// =======================
// Create Project
// =======================
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
const existingProject = await Project.findOne({
  title,
  user: req.user.id,
});

if (existingProject) {
  return res.status(400).json({
    success: false,
    message: "Project with this name already exists.",
  });
}
const project = await Project.create({
  title,
  description,
  language,
  html,
  css,
  javascript,
  user: req.user.id,
});

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get All Projects
// =======================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
  lastOpened: -1,
});
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Single Project
// =======================
export const getProject = async (req, res) => {
  try {
const project = await Project.findOne({
  _id: req.params.id,
  user: req.user.id,
});

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  project.lastOpened = new Date();
await project.save();
};


// =======================
// Update Project
// =======================
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
} = req.body;

if (!title?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Project title is required.",
  });
}

    const updateData = {
      title,
      description,
      language,
      html,
      css,
      javascript,
    };

    // Chat history only if provided
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
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =======================
// Delete Project
// =======================
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};