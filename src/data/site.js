// Single source for site-wide content. VORXEN is a fictional brand; the
// numbers below are stylized fiction for a portfolio piece.

// Set this to a real address to enable the contact form's mail handoff.
export const contactEmail = "";

export const channels = [
  { to: "/", label: "Core" },
  { to: "/systems", label: "Systems" },
  { to: "/about", label: "Origin" },
  { to: "/contact", label: "Link" },
];

// Add real profile URLs here. A channel with no href renders as "pending"
// rather than linking to a platform's homepage.
export const socials = [
  { href: "", label: "Instagram" },
  { href: "", label: "Twitter / X" },
  { href: "", label: "LinkedIn" },
  { href: "", label: "Facebook" },
];

export const scenes = {
  hero: "https://prod.spline.design/2nVp2Oks6bWTqZLP/scene.splinecode",
  companion: "https://prod.spline.design/Y4RqcMmjEct4KzBX/scene.splinecode",
  footer: "https://prod.spline.design/p5Z-jq1vxUDynMTH/scene.splinecode",
};

export const modules = [
  {
    id: "neural-core",
    code: "VX-NC",
    name: "Neural Core",
    role: "Cognition engine",
    image: "/img1.png",
    alt: "Wireframe humanoid head lit from inside, surrounded by drifting particles",
    body:
      "The reasoning layer. Neural Core turns raw sensor input into intent, weighing more than a thousand simulated neurons before every move.",
    specs: [
      ["Class", "Cognition"],
      ["Neurons", "1,000+"],
      ["Response", "Adaptive"],
      ["State", "Online"],
    ],
  },
  {
    id: "cyber-interface",
    code: "VX-CI",
    name: "Cyber Interface",
    role: "Interaction layer",
    image: "/img2.png",
    alt: "Floating holographic panels showing neural graphs and waveforms",
    body:
      "The surface between people and the machine: spatial panels that rearrange themselves around whatever you are trying to do.",
    specs: [
      ["Class", "Interface"],
      ["Input", "Gesture · Voice · Gaze"],
      ["Output", "Spatial panels"],
      ["State", "Online"],
    ],
  },
  {
    id: "synth-systems",
    code: "VX-SS",
    name: "Synth Systems",
    role: "Energy and actuation",
    image: "/img4.png",
    alt: "Glowing atomic core with orbiting rings over a signal waveform",
    body:
      "The power and synthesis core. It keeps every unit running and orchestrates movement down to a single servo.",
    specs: [
      ["Class", "Actuation"],
      ["Units", "15"],
      ["Accuracy", "99%"],
      ["State", "Online"],
    ],
  },
  {
    id: "ai-nexus",
    code: "VX-AN",
    name: "AI Nexus",
    role: "Collective network",
    image: null,
    alt: "A live star-field simulation representing the networked fleet",
    body:
      "Where every unit meets. AI Nexus links the fleet into one system that learns from each of its parts, all the time.",
    specs: [
      ["Class", "Network"],
      ["Nodes", "15"],
      ["Sync", "Continuous"],
      ["State", "Learning"],
    ],
  },
];
