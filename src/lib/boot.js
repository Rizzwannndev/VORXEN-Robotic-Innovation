import { createContext, useContext } from "react";

export const BootContext = createContext(true);
export const useBooted = () => useContext(BootContext);

export const POST_LINES = [
  ["OK", "Power rail", "Stable"],
  ["OK", "Servo array A1–A6", "Calibrated"],
  ["OK", "Neural core", "1,000+ neurons"],
  ["OK", "Vision", "Stereo lock"],
  ["OK", "Cyber interface", "Handshake"],
  ["..", "Learning", "In progress"],
];
