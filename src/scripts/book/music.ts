// Room music: a song that starts when a visitor arrives in a room and fades out when they leave.
//
// Browsers only allow audible playback that starts inside a user gesture. Visitors reach a room
// with a click, a key or a drag, so `sync()` is called from those handlers and play() is allowed.
// If it is refused anyway, the player shows a play button instead. A visitor who pauses stays
// paused until they press play again; nothing restarts behind their back.

import { book } from "./scene";

type Song = { title: string; artist: string; preview: string; link: string };

const VOLUME = 0.35;

export function createMusic(song: Song, player: HTMLElement) {
  const toggle = player.querySelector<HTMLButtonElement>("[data-player-toggle]")!;
  // kept inside the player element so it can be found (and inspected) in the page
  const audio = player.appendChild(document.createElement("audio"));
  audio.preload = "none";
  audio.loop = true;
  audio.volume = 0;

  let inRoom = false; // the visitor is in the room this song belongs to
  let playing = false;
  let userPaused = false;
  let fade = 0;

  const show = () => {
    player.hidden = !inRoom;
    player.classList.toggle("is-playing", playing);
    toggle.setAttribute("aria-label", playing ? `Pause ${song.title}` : `Play ${song.title}`);
    toggle.setAttribute("aria-pressed", String(playing));
    book.spinning = playing;
  };

  /** Ramp the volume to `to`, then run `done`. */
  const ramp = (to: number, ms: number, done?: () => void) => {
    cancelAnimationFrame(fade);
    const from = audio.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      audio.volume = from + (to - from) * k;
      if (k < 1) fade = requestAnimationFrame(step);
      else done?.();
    };
    fade = requestAnimationFrame(step);
  };

  const play = () => {
    if (!audio.src) audio.src = song.preview; // fetched only when it is first needed
    playing = true;
    show();
    audio
      .play()
      .then(() => ramp(VOLUME, 900))
      .catch(() => {
        playing = false; // blocked or failed: leave a play button
        show();
      });
  };

  const stop = (hide: boolean) => {
    playing = false;
    show();
    ramp(0, 500, () => {
      audio.pause();
      if (hide) show();
    });
  };

  toggle.addEventListener("click", () => {
    if (playing) {
      userPaused = true;
      stop(false);
    } else {
      userPaused = false;
      play();
    }
  });

  // don't keep playing in a background tab
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && playing) {
      audio.pause();
    } else if (!document.hidden && playing) {
      void audio.play().catch(() => stop(false));
    }
  });

  return {
    /** Call (from a user gesture) whenever the visitor's room changes. */
    sync(nowInRoom: boolean) {
      if (nowInRoom === inRoom) return;
      inRoom = nowInRoom;
      if (inRoom) {
        show();
        if (!userPaused) play();
      } else if (playing) stop(true);
      else show();
    },
  };
}
