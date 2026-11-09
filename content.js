// Edit this file to update the site. No build step is required.
// Use plain text, not HTML. Missing links are never rendered as dead anchors.
window.SITE_CONTENT = {
  name: "Moonsoo Park",
  // Add a photo file to assets/ and set src, e.g. "./assets/profile.jpg".
  // Keep src empty to show the reserved photo space.
  photo: { src: "./assets/profile.png", alt: "Moonsoo Park" },
  // Edit the bio paragraphs and their links directly in index.html (#bio).
  interests: [
    "Personalized and Efficient Recommender Systems",
    "Human-Centered AI",
    "Agentic AI",
  ],
  // Fill in verified addresses. Empty values display a muted, non-clickable label.
  contacts: {
    email: "moonsoo@usc.edu", // Your email address, without mailto:
    github: "https://github.com/m0onsoo", // Full https:// URL
    linkedin: "https://www.linkedin.com/in/moonsoo-park/", // Full https:// URL
  },
  // Dates use YYYY-MM; displayed as month + year (e.g. Nov 2026).
  // Newest first automatically. Only the latest four appear initially.
  // Copy an entry below to add news. url is optional; leave blank to hide it.
  news: [
    {
      date: "2026-11",
      text: "Our paper BalanceFlow was accepted to WSDM 2027. See you in Hong Kong!",
      url: "",
    },
    {
      date: "2026-09",
      text: "Supported RecSys 2026 as a student volunteer.",
      url: "",
    },
    {
      date: "2026-05",
      text: "Started a new position as a summer intern at Sendbird, working on the AI/ML team.",
      url: "",
    },
    {
      date: "2025-09",
      text: "Our paper PARAN was accepted to ICDMW 2025. See you in Washington, D.C.!",
      url: "",
    },
    {
      date: "2025-08",
      text: "Started M.S. in Computer Science at the University of Southern California (USC).",
      url: "",
    },
  ],
  // Keep publications in your preferred display order. All metadata is optional
  // except title. Set paper/code to "" or omit them to hide those links.
  // {
  //   title: "Exact publication title",
  //   authors: ["Moonsoo Park", "Coauthor Name"], // Preserve actual author order.
  //   venue: "Verified venue and year",
  //   paper: "",
  //   code: "",
  // },
  // Author names stay in the verified initial format provided by Moonsoo.
  authorNames: ["Moonsoo Park", "M. Park"],
  publications: [
    {
      title: "BalanceFlow: Debiased Flow Matching for Collaborative Filtering",
      authors: ["M. Park", "A. Alshabanah", "M. Annavaram"],
      venue: "ACM International Conference on Web Search and Data Mining (WSDM), 2027 (accepted)",
      paper: "",
      code: "",
    },
    {
      title: "PARAN: Persona-Augmented Review ANswering system on Food Delivery Review Dataset",
      authors: ["M. Park", "J. Yun", "B. Kim"],
      venue: "IEEE International Conference on Data Mining Workshops (ICDMW), 2025",
      paper: "https://ieeexplore.ieee.org/document/11415453",
      code: "",
    },
    {
      title: "ReFORM: Review-aggregated Profile Generation via LLM with Multi-Factor Attention for Restaurant Recommendation",
      authors: ["M. Park", "S. Je", "D. Park"],
      venue: "arXiv preprint, 2026",
      paper: "https://arxiv.org/abs/2603.16236",
      code: "https://github.com/m0onsoo/ReFORM",
    },
  ],
};
