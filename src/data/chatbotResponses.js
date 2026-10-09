// Rule-based keyword matching for KTU Quick Assist chatbot
// No AI API or external service — pure JavaScript pattern matching

export const quickSuggestions = [
  'Show exam timetable',
  'When is registration closing?',
  'Show my results',
  'Help me prepare for placements',
  'Give me university contact details',
  'What can you help me with?',
];

export const chatbotRules = [
  {
    id: 'timetable',
    keywords: ['timetable', 'time table', 'exam schedule', 'exam date', 'examination schedule', 'when is exam', 'exam timetable'],
    response: {
      text: "The examination timetable for the November 2026 session has been published. You can view, search and filter the full timetable on the **Exam** page.",
      action: { label: 'Open Exam Timetable', path: '/exam', section: 'timetable' },
    },
  },
  {
    id: 'registration',
    keywords: ['registration', 'register', 'last date', 'deadline', 'closing', 'fee', 'exam fee', 'reg close', 'registration closing'],
    response: {
      text: "Here are the upcoming registration deadlines:\n\n• **B.Tech S5 Regular** — 18 Oct 2026 (regular), 25 Oct (late)\n• **B.Tech S7 Regular** — 19 Oct 2026 (regular), 26 Oct (late)\n• **M.Tech S1 Regular** — 22 Oct 2026 (regular), 28 Oct (late)\n\nHead to the Exam page for full details and countdown timers.",
      action: { label: 'View Registration Deadlines', path: '/exam', section: 'registration' },
    },
  },
  {
    id: 'results',
    keywords: ['result', 'results', 'sgpa', 'cgpa', 'grade', 'marks', 'score', 'my result', 'semester result', 'show result'],
    response: {
      text: "Your academic results and performance charts are available on the **Results** page. You can view semester-wise grades, SGPA/CGPA trends and a subject-wise grade summary.",
      action: { label: 'Go to Results', path: '/results', section: null },
    },
  },
  {
    id: 'cgpa',
    keywords: ['improve cgpa', 'cgpa improvement', 'how to improve', 'increase cgpa', 'better cgpa', 'cgpa tips'],
    response: {
      text: "Improving your CGPA requires consistent effort across subjects. Here are some practical tips:\n\n📚 **Attend all classes** — attendance affects internal marks.\n📝 **Review previous exam papers** — familiarise yourself with question patterns.\n🎯 **Focus on higher-credit subjects** — they carry more weight in CGPA calculation.\n💡 **Appear in improvement exams** — KTU allows CGPA improvement attempts.\n\nVisit the Results page to analyse your performance by subject and semester.",
      action: { label: 'Analyse My Performance', path: '/results', section: 'performance' },
    },
  },
  {
    id: 'placements',
    keywords: ['placement', 'placements', 'campus', 'job', 'recruit', 'company', 'interview', 'prepare for placement', 'campus recruitment'],
    response: {
      text: "The **Placement Preparation Centre** on the Results page offers personalised study plans, topic recommendations and practice modules based on your skill level.\n\nSelect your skill level (Beginner / Intermediate / Advanced) and the area you want to prepare, and a customised plan will be generated.",
      action: { label: 'Open Placement Prep', path: '/results', section: 'placement' },
    },
  },
  {
    id: 'aptitude',
    keywords: ['aptitude', 'practice', 'quantitative', 'logical', 'verbal', 'reasoning', 'quiz', 'mcq', 'show aptitude', 'aptitude practice'],
    response: {
      text: "The **Aptitude & Coding Practice** module lets you practice multiple-choice questions across categories like quantitative aptitude, logical reasoning, verbal ability and programming.\n\nScore is calculated instantly and you can restart or move to the next question at any time.",
      action: { label: 'Start Aptitude Practice', path: '/results', section: 'practice' },
    },
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone', 'email', 'address', 'university', 'ktu office', 'university contact', 'contact details'],
    response: {
      text: "**APJ Abdul Kalam Technological University**\n\n📍 CET Campus, Thiruvananthapuram, Kerala — 695 016\n📞 +91 471 2598 122\n📧 info@ktu.edu.in\n🌐 www.ktu.edu.in\n\nOffice hours: Monday to Friday, 10:00 AM – 5:00 PM",
      action: { label: 'View University Info', path: '/', section: 'university-info' },
    },
  },
  {
    id: 'help',
    keywords: ['help', 'what can you do', 'what can you help', 'capabilities', 'options', 'menu', 'commands', 'features'],
    response: {
      text: "I'm **KTU Quick Assist** — here's what I can help you with:",
      quickReplies: [
        'Show exam timetable',
        'When is registration closing?',
        'Show my results',
        'How can I improve my CGPA?',
        'Help me prepare for placements',
        'Show aptitude practice',
        'Give me university contact details',
      ],
    },
  },
  {
    id: 'announcements',
    keywords: ['announcement', 'notice', 'news', 'update', 'latest', 'notification'],
    response: {
      text: "The latest announcements are displayed on the **Home** page. Categories include Examination, Registration, Results, Placements and Academic notices. You can search and filter by category.",
      action: { label: 'View Announcements', path: '/', section: 'announcements' },
    },
  },
  {
    id: 'events',
    keywords: ['event', 'events', 'calendar', 'upcoming', 'fest', 'ignite', 'schedule'],
    response: {
      text: "Upcoming events are listed on the **Home** page. Key dates include:\n\n• S5 Exam Registration closes — 18 Oct\n• S5 Exams begin — 5 Nov\n• IGNITE 2026 Tech Fest — 15 Nov\n\nCheck the full events section for details.",
      action: { label: 'View Events', path: '/', section: 'events' },
    },
  },
];

export const fallbackResponse = {
  text: "I'm sorry, I didn't quite understand that. I can help you with exam timetables, registration deadlines, results, placement preparation, aptitude practice and university information. Try one of the quick suggestions below, or rephrase your question.",
  quickReplies: [
    'Show exam timetable',
    'When is registration closing?',
    'Show my results',
    'Help me prepare for placements',
  ],
};

export const welcomeMessage = {
  text: "Hello! 👋 I'm **KTU Quick Assist**, your guide to the KTU student portal.\n\nI can help you find exam timetables, registration deadlines, results, placement prep resources and more. What would you like to know?",
  quickReplies: [
    'Show exam timetable',
    'When is registration closing?',
    'Show my results',
    'Help me prepare for placements',
    'Give me university contact details',
    'What can you help me with?',
  ],
};
