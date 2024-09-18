const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (replace with your connection string)
mongoose.connect("mongodb://localhost/student_incubator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schemas and models
const StudentSchema = new mongoose.Schema({
  name: String,
  year: String,
  specialization: String,
  project: String,
  mentor: String,
  progress: Number,
});

const MentorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
});

const FeedbackSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  message: String,
  date: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", StudentSchema);
const Mentor = mongoose.model("Mentor", MentorSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Feedback = mongoose.model("Feedback", FeedbackSchema);

// Admin routes
app.get("/api/admin/stats", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalMentors = await Mentor.countDocuments();
    const totalProjects = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({
      status: "Completed",
    });
    const completionRate = (completedProjects / totalProjects) * 100;

    res.json({
      totalStudents,
      totalMentors,
      totalProjects,
      completionRate: completionRate.toFixed(2),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching stats", error: error.message });
  }
});

app.get("/api/admin/students", async (req, res) => {
  try {
    const students = await Student.find().populate("mentor", "name");
    res.json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
});

app.get("/api/admin/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find().populate("assignedStudents", "name");
    res.json(mentors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mentors", error: error.message });
  }
});

app.get("/api/admin/projects", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("student", "name")
      .populate("mentor", "name");
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
});

app.put("/api/admin/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
});

app.put("/api/admin/mentors/:id", async (req, res) => {
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMentor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating mentor", error: error.message });
  }
});

app.put("/api/admin/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
});

// Student routes
app.get("/api/student/info/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "mentor",
      "name"
    );
    res.json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student info", error: error.message });
  }
});

app.get("/api/student/milestones/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ student: req.params.id });
    // Assuming milestones are stored in the project document
    res.json(project.milestones || []);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching milestones", error: error.message });
  }
});

app.get("/api/student/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.find({ to: req.params.id }).populate(
      "from",
      "name"
    );
    res.json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching feedback", error: error.message });
  }
});

// Mentor routes
app.get("/api/mentor/info/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    res.json(mentor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mentor info", error: error.message });
  }
});

app.get("/api/mentor/students/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate(
      "assignedStudents"
    );
    res.json(mentor.assignedStudents);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching assigned students",
        error: error.message,
      });
  }
});

app.get("/api/mentor/projects/:id", async (req, res) => {
  try {
    const projects = await Project.find({ mentor: req.params.id }).populate(
      "student",
      "name"
    );
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
});

app.post("/api/mentor/feedback/:studentId", async (req, res) => {
  try {
    const newFeedback = new Feedback({
      from: req.body.mentorId,
      to: req.params.studentId,
      message: req.body.feedback,
    });
    await newFeedback.save();
    res.json(newFeedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting feedback", error: error.message });
  }
});

app.put("/api/mentor/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
