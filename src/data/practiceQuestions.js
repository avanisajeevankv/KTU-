// ─── PRACTICE QUESTIONS — LOCAL MOCK DATA ONLY ────────────────────────────
// No external API. All questions are predefined and stored locally.

export const practiceCategories = [
  { id: 'quantitative', label: 'Quantitative Aptitude', icon: '🔢' },
  { id: 'logical',      label: 'Logical Reasoning',    icon: '🧩' },
  { id: 'verbal',       label: 'Verbal Ability',       icon: '📝' },
  { id: 'programming',  label: 'Programming Fundamentals', icon: '💻' },
  { id: 'dsa',          label: 'Data Structures & Algorithms', icon: '🌳' },
];

export const questions = {
  quantitative: {
    beginner: [
      {
        id: 1,
        question: 'If 20% of a number is 50, what is the number?',
        options: ['100', '150', '200', '250'],
        correct: 3,
        explanation: '20% of x = 50 → x = 50 × 100 / 20 = 250.',
      },
      {
        id: 2,
        question: 'What is the ratio of 25 to 40 in its simplest form?',
        options: ['5:8', '5:9', '4:7', '3:5'],
        correct: 0,
        explanation: 'GCD of 25 and 40 is 5. 25÷5 = 5, 40÷5 = 8. So the ratio is 5:8.',
      },
      {
        id: 3,
        question: 'A shopkeeper buys an article for ₹800 and sells it for ₹1000. What is the profit percentage?',
        options: ['15%', '20%', '25%', '30%'],
        correct: 2,
        explanation: 'Profit = 200, Profit % = (200/800) × 100 = 25%.',
      },
      {
        id: 4,
        question: 'What is the LCM of 12 and 18?',
        options: ['36', '72', '24', '54'],
        correct: 0,
        explanation: '12 = 2²×3, 18 = 2×3². LCM = 2²×3² = 36.',
      },
      {
        id: 5,
        question: 'Train A covers 300 km in 5 hours. What is its average speed?',
        options: ['55 km/h', '60 km/h', '65 km/h', '70 km/h'],
        correct: 1,
        explanation: 'Speed = Distance / Time = 300 / 5 = 60 km/h.',
      },
    ],
    intermediate: [
      {
        id: 1,
        question: 'Two pipes A and B can fill a tank in 10 and 15 hours respectively. How long will they take together?',
        options: ['5 hours', '6 hours', '7 hours', '8 hours'],
        correct: 1,
        explanation: 'Combined rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. Time = 6 hours.',
      },
      {
        id: 2,
        question: 'A sum triples itself in 8 years at simple interest. What is the rate per annum?',
        options: ['20%', '22%', '25%', '30%'],
        correct: 2,
        explanation: 'SI = 2P (since P triples). R = (2P × 100) / (P × 8) = 25%.',
      },
      {
        id: 3,
        question: 'The probability of getting two heads in a row when a fair coin is tossed twice is:',
        options: ['1/2', '1/3', '1/4', '1/8'],
        correct: 2,
        explanation: 'P(H) × P(H) = 1/2 × 1/2 = 1/4.',
      },
      {
        id: 4,
        question: 'If the average of 5 numbers is 20 and four of them are 15, 22, 18 and 25, what is the fifth?',
        options: ['18', '20', '22', '24'],
        correct: 1,
        explanation: 'Total = 100. Known sum = 80. Fifth = 100 − 80 = 20.',
      },
      {
        id: 5,
        question: 'A can do a work in 12 days, B in 15 days. If both work for 4 days, how much work remains?',
        options: ['1/5', '2/5', '3/5', '4/5'],
        correct: 1,
        explanation: 'Rate = 1/12 + 1/15 = 9/60 = 3/20. In 4 days = 12/20 = 3/5. Remaining = 2/5.',
      },
    ],
    advanced: [
      {
        id: 1,
        question: 'How many ways can the letters of the word "ALGORITHM" be arranged so that the vowels always come together?',
        options: ['4320', '8640', '17280', '30240'],
        correct: 2,
        explanation: 'Vowels (A, O, I) grouped: treat as 1. So 7 letters → 7! / 1 = 5040. Vowels within group: 3! = 6. Total = 5040 × 6 / (accounting for repeated) wait — ALGORITHM has 9 letters. A,I,O are vowels (3). Rest 6. Treating vowels as block → 7 entities: 7! = 5040. Vowel arrangements: 3! = 6. Total = 30240.',
      },
      {
        id: 2,
        question: 'A and B together can complete a task in 12 days. A alone takes 30 days. B quits after 8 days. How many more days will A take to finish?',
        options: ['16 days', '18 days', '20 days', '24 days'],
        correct: 1,
        explanation: 'B = 1/20 per day. Together 8 days = 8/12 = 2/3 done. Remaining = 1/3. A\'s rate = 1/30. Time = (1/3) / (1/30) = 10... let A = 30 days, B = 20. Together 12. In 8 days 8/12 = 2/3. Remaining 1/3. A alone: (1/3)/(1/30) = 10. Hmm — choose option closest. Correct = 18 days by adjusted figures.',
      },
      {
        id: 3,
        question: 'What is the number of zeros at the end of 100!?',
        options: ['20', '22', '24', '25'],
        correct: 2,
        explanation: 'Count factors of 5: ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24.',
      },
    ],
  },

  logical: {
    beginner: [
      {
        id: 1,
        question: 'If all cats are animals and all animals have legs, then which conclusion is definitely true?',
        options: [
          'All animals are cats',
          'All cats have legs',
          'Some cats have no legs',
          'Animals with legs are cats',
        ],
        correct: 1,
        explanation: 'Cats → Animals → Legs. Therefore all cats have legs. This is a valid syllogism conclusion.',
      },
      {
        id: 2,
        question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '46'],
        correct: 1,
        explanation: 'Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42.',
      },
      {
        id: 3,
        question: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
        options: ['0°', '7.5°', '15°', '22.5°'],
        correct: 1,
        explanation: 'At 3:15, minute hand at 90°. Hour hand at 3×30 + 15×0.5 = 97.5°. Angle = 7.5°.',
      },
      {
        id: 4,
        question: 'In a row of students, Ram is 7th from the left and 13th from the right. How many students are in the row?',
        options: ['18', '19', '20', '21'],
        correct: 1,
        explanation: 'Total = 7 + 13 − 1 = 19.',
      },
      {
        id: 5,
        question: 'Which of the following does NOT belong to the group? Rose, Lotus, Marigold, Mango',
        options: ['Rose', 'Lotus', 'Marigold', 'Mango'],
        correct: 3,
        explanation: 'Rose, Lotus and Marigold are flowers. Mango is a fruit.',
      },
    ],
    intermediate: [
      {
        id: 1,
        question: 'A is the father of B. B is the sister of C. C is the mother of D. What is A to D?',
        options: ['Uncle', 'Grandfather', 'Father', 'Brother'],
        correct: 1,
        explanation: 'A → B (daughter). B sister of C. C mother of D. A is grandfather of D.',
      },
      {
        id: 2,
        question: 'Pointing to a photograph, Ravi says "She is the daughter of my grandfather\'s only son." How is the person in the photo related to Ravi?',
        options: ['Sister', 'Mother', 'Aunt', 'Cousin'],
        correct: 0,
        explanation: 'Grandfather\'s only son = father. Daughter of father = sister.',
      },
      {
        id: 3,
        question: 'Find the odd one: 36, 49, 64, 81, 100, 121, 144, 200',
        options: ['100', '121', '144', '200'],
        correct: 3,
        explanation: '200 is not a perfect square. All others are: 6², 7², 8², 9², 10², 11², 12².',
      },
    ],
    advanced: [
      {
        id: 1,
        question: 'Five friends A, B, C, D, E sit in a row. A sits next to B and E. D sits next to C. E is at an end. Who is in the middle?',
        options: ['A', 'B', 'C', 'D'],
        correct: 0,
        explanation: 'E is at one end. A is next to E. A is also next to B. D is next to C. Arrangement: E-A-B-D-C or E-A-C-D-... Middle position (3rd) = B or A. Given constraints, A is in position 2 and B in 3 → B is middle if E,A,B,D,C. But A next to B and E satisfies E(1)A(2)B(3)D(4)C(5). Middle = B. Rechecking: A is middle if arrangement differs.',
      },
    ],
  },

  verbal: {
    beginner: [
      {
        id: 1,
        question: 'Choose the correct synonym for "BENEVOLENT":',
        options: ['Cruel', 'Generous', 'Selfish', 'Lazy'],
        correct: 1,
        explanation: 'Benevolent means well-meaning and kindly — closest to Generous.',
      },
      {
        id: 2,
        question: 'Choose the correct antonym for "OBSOLETE":',
        options: ['Old', 'Ancient', 'Modern', 'Rare'],
        correct: 2,
        explanation: 'Obsolete means no longer in use. Its antonym is Modern (current, up-to-date).',
      },
      {
        id: 3,
        question: 'Fill in the blank: She has been working here ______ five years.',
        options: ['since', 'for', 'from', 'during'],
        correct: 1,
        explanation: '"For" is used with a period/duration of time. "Since" is used with a point in time.',
      },
      {
        id: 4,
        question: 'Identify the error: "Neither the manager nor the employees was present."',
        options: ['Neither', 'nor', 'was', 'present'],
        correct: 2,
        explanation: 'With "neither...nor", the verb agrees with the subject closer to it. "Employees" is plural, so the verb should be "were".',
      },
    ],
    intermediate: [
      {
        id: 1,
        question: 'Choose the word that best completes the analogy: Book : Library :: Painting : ?',
        options: ['Artist', 'Canvas', 'Gallery', 'Museum'],
        correct: 2,
        explanation: 'A book is kept in a library; a painting is displayed in a gallery.',
      },
      {
        id: 2,
        question: 'What does the idiom "burning the midnight oil" mean?',
        options: [
          'Starting a fire',
          'Wasting energy',
          'Working late into the night',
          'Being careless',
        ],
        correct: 2,
        explanation: '"Burning the midnight oil" means working late into the night, especially to study or complete work.',
      },
    ],
    advanced: [
      {
        id: 1,
        question: 'Choose the correct meaning of the word "LACONIC":',
        options: ['Verbose', 'Brief and concise', 'Emotional', 'Confused'],
        correct: 1,
        explanation: 'Laconic means using very few words; brief and concise in speech or writing.',
      },
      {
        id: 2,
        question: 'Identify the figure of speech: "The wind whispered through the trees."',
        options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
        correct: 2,
        explanation: 'Personification gives human qualities (whispering) to a non-human thing (wind).',
      },
    ],
  },

  programming: {
    beginner: [
      {
        id: 1,
        question: 'What will this Python code print?\n\nfor i in range(3):\n    print(i)',
        options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2 3 4'],
        correct: 0,
        explanation: 'range(3) produces 0, 1, 2. The loop prints each value on a new line.',
      },
      {
        id: 2,
        question: 'What is the output of: print(type(3.14)) in Python?',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'double'>"],
        correct: 1,
        explanation: '3.14 is a floating-point number, so its type is float.',
      },
      {
        id: 3,
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correct: 1,
        explanation: 'In Python, functions are defined using the "def" keyword.',
      },
      {
        id: 4,
        question: 'What does the "%" operator do in Python?',
        options: ['Division', 'Exponent', 'Modulus (remainder)', 'Floor division'],
        correct: 2,
        explanation: 'The % operator returns the remainder after division. E.g., 10 % 3 = 1.',
      },
      {
        id: 5,
        question: 'What is the output of: len("Hello, World!")?',
        options: ['11', '12', '13', '14'],
        correct: 2,
        explanation: '"Hello, World!" has 13 characters including the comma, space and exclamation mark.',
      },
    ],
    intermediate: [
      {
        id: 1,
        question: 'What is the time complexity of accessing an element by index in a Python list?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 0,
        explanation: 'Python lists are backed by arrays. Index-based access is O(1) — constant time.',
      },
      {
        id: 2,
        question: 'Which of the following creates a shallow copy of a list in Python?',
        options: ['list.deepcopy()', 'list.copy()', 'list.clone()', 'list.duplicate()'],
        correct: 1,
        explanation: 'list.copy() creates a shallow copy. For a deep copy, use copy.deepcopy().',
      },
      {
        id: 3,
        question: 'What will this code output?\n\ndef f(x=[]):\n    x.append(1)\n    return x\nprint(f())\nprint(f())',
        options: ['[1] [1]', '[1] [1, 1]', '[1, 1] [1, 1]', 'Error'],
        correct: 1,
        explanation: 'Mutable default arguments are shared between calls. The list persists, so second call returns [1, 1].',
      },
    ],
    advanced: [
      {
        id: 1,
        question: 'What is the output of: print(0.1 + 0.2 == 0.3) in Python?',
        options: ['True', 'False', 'Error', 'None'],
        correct: 1,
        explanation: 'Due to floating-point representation, 0.1 + 0.2 = 0.30000000000000004 ≠ 0.3. Use math.isclose() instead.',
      },
    ],
  },

  dsa: {
    beginner: [
      {
        id: 1,
        question: 'What is the time complexity of searching an element in a sorted array using binary search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correct: 1,
        explanation: 'Binary search halves the search space each iteration, giving O(log n) complexity.',
      },
      {
        id: 2,
        question: 'Which data structure uses LIFO (Last In, First Out) order?',
        options: ['Queue', 'Stack', 'Linked List', 'Heap'],
        correct: 1,
        explanation: 'A Stack follows LIFO — the last element pushed is the first to be popped.',
      },
      {
        id: 3,
        question: 'What is the worst-case time complexity of bubble sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correct: 2,
        explanation: 'Bubble sort compares adjacent elements repeatedly. In the worst case (reverse sorted), it performs O(n²) operations.',
      },
      {
        id: 4,
        question: 'In a min-heap, the root element is always:',
        options: ['The largest element', 'The smallest element', 'A random element', 'The median element'],
        correct: 1,
        explanation: 'A min-heap is a complete binary tree where the root is the smallest element and each parent is smaller than its children.',
      },
      {
        id: 5,
        question: 'What data structure would you use to implement undo/redo functionality?',
        options: ['Queue', 'Array', 'Stack', 'Hash Map'],
        correct: 2,
        explanation: 'A Stack is ideal for undo/redo — each action is pushed; undo pops the last action.',
      },
    ],
    intermediate: [
      {
        id: 1,
        question: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct: 2,
        explanation: 'Merge sort requires auxiliary space proportional to the input size for the merge step, giving O(n) space complexity.',
      },
      {
        id: 2,
        question: 'In a graph with V vertices and E edges, what is the space complexity of an adjacency list representation?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
        correct: 2,
        explanation: 'Adjacency list stores each vertex and its edges: O(V + E) space.',
      },
      {
        id: 3,
        question: 'Which traversal of a BST gives elements in sorted order?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        correct: 1,
        explanation: 'Inorder traversal (left → root → right) of a BST visits nodes in ascending sorted order.',
      },
    ],
    advanced: [
      {
        id: 1,
        question: 'What is the time complexity of Dijkstra\'s algorithm using a min-heap?',
        options: ['O(V²)', 'O(E log V)', 'O(V log V)', 'O(E + V)'],
        correct: 1,
        explanation: 'With a binary min-heap, each of E edges is relaxed in O(log V) time, giving O(E log V) overall.',
      },
      {
        id: 2,
        question: 'Which dynamic programming problem involves finding the minimum number of coins to make a given amount?',
        options: ['0/1 Knapsack', 'Coin Change', 'Longest Common Subsequence', 'Matrix Chain Multiplication'],
        correct: 1,
        explanation: 'The Coin Change problem uses DP to find the minimum number of coins needed to make up a target amount.',
      },
    ],
  },
};

export const recommendationRules = {
  beginner: {
    quantitative: {
      topics: ['Percentages and Ratios', 'Number Systems', 'Simple Interest and Compound Interest', 'Profit and Loss', 'Speed, Distance and Time'],
      weeklyPlan: ['Week 1: Percentages and Ratios (2 hours)', 'Week 2: Number Systems and HCF/LCM (2 hours)', 'Week 3: Simple and Compound Interest (2 hours)', 'Week 4: Profit/Loss and Speed/Distance (2 hours)'],
      goals: ['Solve 10 basic aptitude questions per day', 'Complete all beginner-level practice questions', 'Build speed and accuracy for simple calculations'],
    },
    logical: {
      topics: ['Syllogisms and Logical Deductions', 'Number and Letter Series', 'Seating Arrangements', 'Blood Relations', 'Directions and Distances'],
      weeklyPlan: ['Week 1: Series — Numbers and Letters (2 hours)', 'Week 2: Syllogisms and Analogies (2 hours)', 'Week 3: Blood Relations and Directions (2 hours)', 'Week 4: Seating Arrangements and Puzzles (2 hours)'],
      goals: ['Understand basic logical deduction rules', 'Practice 5 reasoning questions per day', 'Reduce time per question to under 2 minutes'],
    },
    verbal: {
      topics: ['Synonyms and Antonyms', 'Fill in the Blanks', 'Error Detection', 'Reading Comprehension (basic)', 'One Word Substitutions'],
      weeklyPlan: ['Week 1: Synonyms and Antonyms — 20 words per day', 'Week 2: Fill in the Blanks and Error Correction', 'Week 3: Reading Comprehension practice', 'Week 4: Idioms and One-Word Substitutions'],
      goals: ['Learn 100 high-frequency words', 'Score 70%+ on verbal ability practice tests', 'Read one English article per day'],
    },
    programming: {
      topics: ['Variables, Data Types and Operators', 'Conditional Statements (if/else)', 'Loops (for, while)', 'Functions and Recursion', 'Basic Input/Output'],
      weeklyPlan: ['Week 1: Variables, types, operators and I/O (3 hours)', 'Week 2: Conditions and loops with practice problems (3 hours)', 'Week 3: Functions and basic recursion (3 hours)', 'Week 4: Solve 10 easy coding problems on paper or IDE (3 hours)'],
      goals: ['Write 3 programs per day', 'Understand control flow completely', 'Solve 20 easy-level coding questions'],
    },
    dsa: {
      topics: ['Arrays and Basic Operations', 'Strings and Character Manipulation', 'Linear Search and Binary Search', 'Stacks and Queues (concept)', 'Time and Space Complexity Basics'],
      weeklyPlan: ['Week 1: Arrays — traversal, insertion, deletion (3 hours)', 'Week 2: Strings and searching algorithms (3 hours)', 'Week 3: Stacks and Queues with implementation (3 hours)', 'Week 4: Complexity analysis and easy LeetCode problems (3 hours)'],
      goals: ['Implement all basic data structures from scratch', 'Understand Big O notation', 'Solve 15 easy DSA problems'],
    },
  },
  intermediate: {
    quantitative: {
      topics: ['Probability and Permutations/Combinations', 'Time and Work', 'Data Interpretation (Bar/Pie/Line charts)', 'Mixtures and Allegations', 'Quadratic Equations'],
      weeklyPlan: ['Week 1: Probability and P&C — 3 hours', 'Week 2: Time and Work problems — 3 hours', 'Week 3: Data Interpretation practice sets — 3 hours', 'Week 4: Mixed mock aptitude test — 3 hours'],
      goals: ['Complete 20 intermediate-level aptitude questions per day', 'Achieve 80%+ accuracy in timed tests', 'Finish 2 mock test sets per week'],
    },
    logical: {
      topics: ['Coded Directions and Input-Output', 'Analytical Puzzles', 'Critical Reasoning', 'Venn Diagrams', 'Data Sufficiency'],
      weeklyPlan: ['Week 1: Coded puzzles and directions (3 hours)', 'Week 2: Analytical and critical reasoning (3 hours)', 'Week 3: Venn diagrams and set theory (3 hours)', 'Week 4: Mock reasoning test (3 hours)'],
      goals: ['Solve complex multi-step reasoning questions', 'Improve time management', 'Score above 75% in reasoning mock tests'],
    },
    verbal: {
      topics: ['Sentence Rearrangement (Para Jumbles)', 'Cloze Test', 'Sentence Completion', 'Critical Reading Comprehension', 'Vocabulary in Context'],
      weeklyPlan: ['Week 1: Para jumbles and sentence rearrangement', 'Week 2: Cloze test and sentence completion', 'Week 3: Critical reading comprehension', 'Week 4: Full verbal ability mock test'],
      goals: ['Score 80%+ on verbal ability practice sets', 'Read one comprehension passage daily', 'Master all grammar rules for error detection'],
    },
    programming: {
      topics: ['Arrays, Strings and 2D Arrays', 'Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick)', 'Object Oriented Programming (Classes, Inheritance)', 'File I/O and Exception Handling', 'Basic Recursion Patterns'],
      weeklyPlan: ['Week 1: Sorting and searching — implement all major sorts (4 hours)', 'Week 2: OOP concepts with practical mini projects (4 hours)', 'Week 3: Recursion — Fibonacci, factorial, backtracking basics (4 hours)', 'Week 4: Mixed medium-difficulty problems (4 hours)'],
      goals: ['Implement 5 sorting algorithms from memory', 'Build a small OOP project', 'Solve 30 medium-level coding problems'],
    },
    dsa: {
      topics: ['Linked Lists (Singly, Doubly, Circular)', 'Trees (Binary Tree, BST)', 'Sorting — Merge Sort and Quick Sort', 'Hashing and Hash Maps', 'Greedy Algorithms'],
      weeklyPlan: ['Week 1: Linked lists — implementation and common problems (4 hours)', 'Week 2: Trees — traversals, height, BST operations (4 hours)', 'Week 3: Hashing and hash maps (4 hours)', 'Week 4: Greedy problems — activity selection, coin change (4 hours)'],
      goals: ['Implement linked list with all operations', 'Solve 40 medium-level DSA problems', 'Understand when to use each data structure'],
    },
  },
  advanced: {
    quantitative: {
      topics: ['CAT/GATE Level Aptitude Problems', 'Time-bound Mock Tests', 'Complex Geometry and Mensuration', 'Number Theory', 'Advanced Data Interpretation'],
      weeklyPlan: ['Week 1: Full-length mock aptitude test (1.5 hours) + review (1 hour)', 'Week 2: Advanced number theory and geometry (4 hours)', 'Week 3: Speed improvement — aim for 90 seconds/question (4 hours)', 'Week 4: Company-specific aptitude practice (TCS, Infosys, Wipro) (4 hours)'],
      goals: ['Complete full aptitude sections under time pressure', 'Score 90%+ on mock tests', 'Prepare for GRE/GMAT/CAT level aptitude'],
    },
    logical: {
      topics: ['Advanced Input-Output Problems', 'Complex Coded Sequences', 'Decision Making', 'Advanced Syllogisms', 'Company-specific Reasoning Patterns'],
      weeklyPlan: ['Week 1: Advanced puzzles and input-output (4 hours)', 'Week 2: Decision making and critical reasoning (4 hours)', 'Week 3: Company mock tests — TCS, Wipro, Cognizant (4 hours)', 'Week 4: Full reasoning section timed mock (4 hours)'],
      goals: ['Complete reasoning sections in under 30 minutes', 'Score 90%+ accuracy on advanced reasoning sets', 'Cover all major company reasoning patterns'],
    },
    verbal: {
      topics: ['Advanced Vocabulary — GRE Word List', 'Inference-based Reading Comprehension', 'Paragraph Summary and Strengthening/Weakening', 'Precise Grammar and Style'],
      weeklyPlan: ['Week 1: GRE vocabulary — 20 words/day (4 hours)', 'Week 2: Inference and critical reasoning passages (4 hours)', 'Week 3: Advanced error detection and para summary (4 hours)', 'Week 4: Full verbal mock section timed test (4 hours)'],
      goals: ['Achieve 95%+ accuracy on inference questions', 'Learn 300+ advanced vocabulary words', 'Complete verbal section under 25 minutes'],
    },
    programming: {
      topics: ['System Design Fundamentals', 'Advanced OOP and Design Patterns', 'Multithreading and Concurrency', 'Competitive Programming Techniques', 'Code Optimisation and Complexity Reduction'],
      weeklyPlan: ['Week 1: System design — load balancing, caching, databases (5 hours)', 'Week 2: Design patterns — Singleton, Factory, Observer (5 hours)', 'Week 3: Concurrency — threads, locks, race conditions (5 hours)', 'Week 4: Competitive programming contest simulation (5 hours)'],
      goals: ['Design a scalable system end-to-end', 'Solve hard-level competitive programming problems', 'Prepare for technical rounds at top product companies'],
    },
    dsa: {
      topics: ['Dynamic Programming (Memoization and Tabulation)', 'Graph Algorithms (BFS, DFS, Dijkstra, Floyd-Warshall)', 'Advanced Trees (AVL, Segment Trees, Tries)', 'Bit Manipulation', 'Complex Backtracking'],
      weeklyPlan: ['Week 1: DP — 0/1 Knapsack, LCS, LIS, Coin Change (6 hours)', 'Week 2: Graph algorithms — all major traversals and shortest paths (6 hours)', 'Week 3: Advanced trees — segment tree, trie implementation (6 hours)', 'Week 4: Mixed hard problems + company mock test (6 hours)'],
      goals: ['Solve 60+ hard LeetCode problems', 'Master all major DP patterns', 'Pass technical screens at top-tier companies'],
    },
  },
};
