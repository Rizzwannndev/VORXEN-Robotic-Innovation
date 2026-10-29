import { useSyncExternalStore } from "react";
import { Howl } from "howler";

// One shared track for the whole app; the 3MB file loads on first play only.
let howl = null;
let playing = false;
const listeners = new Set();

export function toggleAudio() {
  if (!howl) howl = new Howl({ src: ["/audio.mp3"], loop: true, volume: 0.6, html5: true });
  if (playing) howl.pause();
  else howl.play();
  playing = !playing;
  listeners.forEach((fn) => fn());
}

const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function useAudio() {
  return useSyncExternalStore(subscribe, () => playing);
}
