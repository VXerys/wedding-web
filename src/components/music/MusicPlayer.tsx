"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  isOpened: boolean;
}

export default function MusicPlayer({ isOpened }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set default volume
    audio.volume = 0.35;

    if (isOpened) {
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Audio playback auto-start failed:", error);
          setIsPlaying(false);
        }
      };
      void playAudio();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isOpened]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Audio playback toggle failed:", error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding-music.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {isOpened && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={togglePlay}
            className="fixed bottom-5 right-5 z-40 p-3.5 rounded-full bg-white/60 backdrop-blur-lg border border-white/30 text-gold-500 shadow-card hover:bg-white/80 active:scale-95 transition-colors cursor-pointer flex items-center justify-center"
            aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Play className="w-5 h-5" strokeWidth={2} />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
