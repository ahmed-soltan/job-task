import {
  Course,
  Module,
  Comment,
  QuizWithAnswers,
  Leaderboard,
} from "../models/types";

// This file stands in for a real database / CMS.
// Swap the functions below for real fetch calls once a backend exists.

export const mockCourse: Course = {
  id: "seo-home-101",
  title: "Starting SEO as your Home",
  videoUrl:
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
  posterUrl:
    "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1600&auto=format&fit=crop",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  materials: {
    durationWeeks: 3,
    lessons: 8,
    enrolled: 65,
    language: "English",
  },
  progressPercent: 63,
  learnerInitial: "Y",
};

export const mockModules: Module[] = [
  {
    id: "week-1-4",
    weekLabel: "Week 1-4",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      { id: "l1", title: "Introduction", locked: true, type: "video" },
      { id: "l2", title: "Course Overview", locked: true, type: "video" },
      {
        id: "l3",
        title: "Course Overview",
        locked: false,
        type: "quiz",
        questionCount: 0,
        durationMinutes: 10,
      },
      {
        id: "l4",
        title: "Course Exercise / Reference Files",
        locked: false,
        type: "pdf",
        fileUrl: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        id: "l5",
        title: "Code Editor Installation (Optional if you have one)",
        locked: true,
        type: "video",
      },
      { id: "l6", title: "Embedding PHP in HTML", locked: true, type: "video" },
    ],
  },
  {
    id: "week-5-8-a",
    weekLabel: "Week 5-8",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      { id: "l7", title: "Defining Functions", locked: true, type: "video" },
      { id: "l8", title: "Function Parameters", locked: true, type: "video" },
      {
        id: "l9",
        title: "Return Values From Functions",
        locked: false,
        type: "quiz",
        questionCount: 2,
        durationMinutes: 15,
      },
      {
        id: "l10",
        title: "Global Variable and Scope",
        locked: true,
        type: "video",
      },
      {
        id: "l11",
        title: "Newer Way of creating a Constant",
        locked: true,
        type: "video",
      },
      { id: "l12", title: "Constants", locked: true, type: "video" },
    ],
  },
  {
    id: "week-5-8-b",
    weekLabel: "Week 5-8",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      { id: "l13", title: "Defining Functions", locked: true, type: "video" },
      { id: "l14", title: "Function Parameters", locked: true, type: "video" },
      {
        id: "l15",
        title: "Return Values From Functions",
        locked: false,
        type: "quiz",
        questionCount: 2,
        durationMinutes: 15,
      },
      {
        id: "l16",
        title: "Global Variable and Scope",
        locked: true,
        type: "video",
      },
    ],
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    authorName: "Student Name Goes Here",
    avatarUrl: "https://i.pravatar.cc/64?img=12",
    date: "Oct 10, 2021",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "c2",
    authorName: "Student Name Goes Here",
    avatarUrl: "https://i.pravatar.cc/64?img=32",
    date: "Oct 15, 2021",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "c3",
    authorName: "Student Name Goes Here",
    avatarUrl: "https://i.pravatar.cc/64?img=51",
    date: "Oct 19, 2021",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

// Internal store — never returned directly to the client (see the GET route,
// which strips correctOptionId before responding).
export const mockQuizzesByLessonId: Record<string, QuizWithAnswers> = {
  l3: {
    lessonId: "l3",
    durationSeconds: 10 * 60,
    questions: [
      {
        id: "q1",
        question:
          "Among the following statements, which one has the oldest rock formations in the country?",
        options: [
          { id: "a", label: "Asam" },
          { id: "b", label: "Bohar" },
          { id: "c", label: "Kamaltake" },
          { id: "d", label: "Utter Pardesh" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q2",
        question:
          "What keyword is used to return a value from a function in JavaScript?",
        options: [
          { id: "a", label: "return" },
          { id: "b", label: "yield" },
          { id: "c", label: "break" },
          { id: "d", label: "continue" },
        ],
        correctOptionId: "a",
      },
    ],
  },
  l15: {
    lessonId: "l15",
    durationSeconds: 10 * 60,
    questions: [
      {
        id: "q1",
        question: "Which of these correctly declares a constant in JavaScript?",
        options: [
          { id: "a", label: "var x = 5;" },
          { id: "b", label: "let x = 5;" },
          { id: "c", label: "const x = 5;" },
          { id: "d", label: "constant x = 5;" },
        ],
        correctOptionId: "c",
      },
      {
        id: "q2",
        question: "A function parameter with no argument passed in is:",
        options: [
          { id: "a", label: "null" },
          { id: "b", label: "undefined" },
          { id: "c", label: "NaN" },
          { id: "d", label: "0" },
        ],
        correctOptionId: "b",
      },
    ],
  },
};

export const mockLeaderboard: Leaderboard = {
  courseTitle: mockCourse.title,
  message:
    "Great job, friend! Your performance in this course is impressive — you're ahead of 60% of enrolled students. Keep pushing to see your name at the top of the leaderboard here 👏",
  entries: [
    {
      id: "s1",
      rank: 1,
      studentName: "Youssef Ahmed",
      avatarUrl: "https://i.pravatar.cc/64?img=11",
      score: 980,
    },
    {
      id: "s2",
      rank: 2,
      studentName: "Mona Khaled",
      avatarUrl: "https://i.pravatar.cc/64?img=45",
      score: 940,
    },
    {
      id: "s3",
      rank: 3,
      studentName: "Omar Tarek",
      avatarUrl: "https://i.pravatar.cc/64?img=22",
      score: 905,
    },
    {
      id: "s4",
      rank: 4,
      studentName: "You",
      avatarUrl: "https://i.pravatar.cc/64?img=68",
      score: 860,
      isCurrentUser: true,
    },
    {
      id: "s5",
      rank: 5,
      studentName: "Sara Adel",
      avatarUrl: "https://i.pravatar.cc/64?img=32",
      score: 830,
    },
    {
      id: "s6",
      rank: 6,
      studentName: "Hassan Fathy",
      avatarUrl: "https://i.pravatar.cc/64?img=15",
      score: 795,
    },
  ],
};
