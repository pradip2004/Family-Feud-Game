const QuestionSet = require("../models/Question");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionSet.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
};

module.exports = { getAllQuestions };
