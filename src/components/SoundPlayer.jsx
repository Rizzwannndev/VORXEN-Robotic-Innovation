import { toggleAudio, useAudio } from "../lib/audio";

const SoundPlayer = ({ className = "" }) => {
  const on = useAudio();
  return (
    <button
      type="button"
      onClick={toggleAudio}
      aria-pressed={on}
      data-lock={on ? "Mute audio" : "Play audio"}
      className={`t-label inline-flex items-center gap-3 py-2 text-phos transition-colors hover:text-diag ${className}`}
    >
      <span className={`level flex h-3 items-end gap-[3px] ${on ? "is-on text-diag" : "text-dim"}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      Audio <span className={on ? "text-diag" : "text-dim"}>{on ? "On" : "Off"}</span>
    </button>
  );
};

export default SoundPlayer;
