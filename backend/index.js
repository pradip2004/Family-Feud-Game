require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");
const setupSocket = require("./socket/socket");
const adminRoutes = require("./routes/adminRoutes");
const questionRoutes = require("./routes/questionRoutes");
const QuestionSet = require("./models/Question");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

connectDB();
setupSocket(io);

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/questions", questionRoutes);

const questions = [
  {
    question: "What’s something you wouldn’t want to find in your food?",
    options: [
      "Hair (of uncertain origin)",
      "Someone’s teeth (extra calcium)",
      "Bug (Protein, yum!)",
      "A receipt",
      "Mould",
      "Meat (I’m vegetarian!)",
    ],
  },
  {
    question: "If a dog could talk, what would it say most often?",
    options: [
      "Where’s my food?",
      "Walk me now!",
      "More pets!",
      "Move over, this bed is mine.",
      "Who’s a good boy? Me!",
      "Doctor, where are my balls?",
    ],
  },
  {
    question: "What’s the worst thing to hear on a first date?",
    options: [
      "My ex used to love this place! (Check Please!)",
      "I brought my mom with me! (Wait What?)",
      "Have you heard about bitcoin? (Not Again..)",
      "So technically, I’m not on house arrest anymore. (Technically?)",
      "I’ve been watching you for a while… (Excuse me??)",
      "I have no red flags. (No lie more obvious)",
    ],
  },
  {
    question: "What would be the worst thing to hear from your surgeon?",
    options: [
      "Hi, it's my first day.",
      "Oops, I dropped my scalpel.",
      "Let me google this.",
      "Mukesh ko hum nahi bacha sakey.",
      "I could do this with my eyes closed.",
      "Oh…well you didn’t need that anyways.",
    ],
  },
  {
    question: "Name something you’d hate to find in your mouth when you wake up in the morning.",
    options: [
      "Roommate",
      "Bad Odour",
      "Hair (not yours)",
      "Bug/Insect",
      "Expired Poison",
      "Extra Teeth",
    ],
  },
];

const insertQuestions = async () => {
  try {
    await QuestionSet.insertMany(questions);
    console.log("Questions inserted successfully!");
  } catch (error) {
    console.error("Error inserting questions:", error);
  }
};

// insertQuestions();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
