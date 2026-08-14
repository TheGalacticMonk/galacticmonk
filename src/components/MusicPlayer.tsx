"use client";

import { useRef, useState } from "react";
import ExpandableImage from "./ExpandableImage";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({
  src,
  image,
  title,
  subtitle,
  accent,
}: {
  src: string;
  image?: string;
  title: string;
  subtitle?: string;
  accent: "gold" | "coral" | "sage";
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    const audio = audioRef.current;
    if (audio) audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <div className="music-player" data-accent={accent}>
      <div className="music-player-top">
        {image && (
          <ExpandableImage
            src={image}
            alt={title}
            className="music-player-art"
          />
        )}
        <div className="music-player-info">
          <p className="music-player-title">{title}</p>
          {subtitle && <p className="music-player-subtitle">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="music-player-play"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
              <path d="M7 4.5v15l13-7.5-13-7.5Z" />
            </svg>
          )}
        </button>
      </div>

      <div className="music-player-seek-row">
        <span className="music-player-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="music-player-seek"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
          aria-label="Seek"
        />
        <span className="music-player-time">{formatTime(duration)}</span>
      </div>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}
