// Controls and DOM for the pop-up book: open/close, paging (arrows, keys, drag), captions and
// the close-up note. The scene itself lives in ./scene.ts.
//
// Close-up: the camera moves in on an object and slides it aside; a paper note with the
// project's details sits next to it (right on wide screens, at the bottom on phones). Nothing
// dims the scene. While the note is open, the arrows and ←/→ step through the room's projects;
// Escape, the × or a click on the scene closes it.

import { N, logicalOf, physicalOf } from "../../lib/unfold/fold";
import { ROOMS } from "../../lib/unfold/rooms";
import { SPOTS, type Spot } from "../../lib/unfold/spots";
import { buildTextures } from "../../lib/unfold/textures";
import { loadImages } from "../../lib/unfold/images";
import { book, createScene } from "./scene";

const FONT = "Caveat";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

async function start() {
  const root = document.querySelector<HTMLElement>("[data-book]");
  if (!root || !webglAvailable()) {
    document.documentElement.classList.remove("js"); // show the plain-HTML version
    return;
  }

  const host = root.querySelector<HTMLElement>("[data-book-canvas]")!;
  const header = root.querySelector<HTMLElement>(".topbar")!;
  const prev = root.querySelector<HTMLButtonElement>("[data-book-prev]")!;
  const next = root.querySelector<HTMLButtonElement>("[data-book-next]")!;
  const caption = root.querySelector<HTMLElement>("[data-book-caption]")!;
  const live = root.querySelector<HTMLElement>("[data-book-live]")!;
  const spotList = root.querySelector<HTMLElement>("[data-book-spots]")!;
  const tip = root.querySelector<HTMLElement>("[data-book-tip]")!;
  const note = root.querySelector<HTMLDialogElement>("[data-book-note]")!;
  const q = <T extends HTMLElement>(sel: string) => note.querySelector<T>(sel)!;
  const noteKicker = q("[data-note-kicker]");
  const noteTitle = q("[data-note-title]");
  const noteTagline = q("[data-note-tagline]");
  const noteBody = q("[data-note-body]");
  const noteFacts = q("[data-note-facts]");
  const noteLinks = q("[data-note-links]");
  const noteCount = q("[data-note-count]");

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reducedMotion = () => motion.matches;

  const fonts = Promise.all([document.fonts.load(`700 64px ${FONT}`), document.fonts.load(`500 64px ${FONT}`)]).catch(() => {
    /* fall back to whatever cursive font is around */
  });
  await Promise.all([fonts, loadImages()]);

  let room = 0; // logical index
  let open = false;
  /** the spot whose note is showing */
  let active: string | null = null;
  /** where focus goes back to when the note closes */
  let returnFocus: HTMLElement | null = null;

  const hideTip = () => {
    tip.hidden = true;
  };
  const roomSpots = () => Object.entries(SPOTS[ROOMS[room].id] ?? {});

  const fillNote = (spot: Spot, key: string) => {
    noteKicker.textContent = spot.kicker ?? "";
    noteKicker.hidden = !spot.kicker;
    noteTitle.textContent = spot.title;
    noteTagline.textContent = spot.tagline ?? "";
    noteTagline.hidden = !spot.tagline;
    noteBody.textContent = spot.body;
    noteFacts.replaceChildren(
      ...(spot.facts ?? []).map((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        return li;
      }),
    );
    noteFacts.hidden = !spot.facts?.length;
    noteLinks.replaceChildren(
      ...(spot.links ?? []).map((l) => {
        const a = document.createElement("a");
        a.href = l.href;
        a.textContent = l.label;
        if (!l.href.startsWith("mailto:")) {
          a.target = "_blank";
          a.rel = "noreferrer";
          a.append(Object.assign(document.createElement("span"), { textContent: " ↗", ariaHidden: "true" }));
        }
        const li = document.createElement("li");
        li.append(a);
        return li;
      }),
    );
    const all = roomSpots();
    const i = all.findIndex(([k]) => k === key);
    noteCount.textContent = all.length > 1 ? `${i + 1} / ${all.length}` : "";
    // restart the little paper drop-in for each project
    note.classList.remove("is-in");
    void note.offsetWidth;
    note.classList.add("is-in");
  };

  /** Show a spot's note; the camera moves in on it when the scene knows where it is. */
  const openSpot = (li: number, key: string, zoom = true) => {
    const spot = SPOTS[ROOMS[li].id]?.[key];
    if (!spot) return;
    hideTip();
    if (!active) returnFocus = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    active = key;
    book.zoomTarget = zoom ? 1 : 0;
    fillNote(spot, key);
    if (!note.open) {
      note.show();
      note.focus(); // stepping later keeps focus where it is (an arrow, a project button)
    }
    root.classList.add("is-closeup");
    render();
  };

  const closeNote = () => {
    if (note.open) note.close(); // the close event does the rest
  };

  const step = (dir: number) => {
    const all = roomSpots();
    const i = all.findIndex(([k]) => k === active);
    const [key] = all[(i + dir + all.length) % all.length];
    openSpot(room, key, scene.focus(room, key));
  };

  const scene = createScene({
    canvasHost: host,
    tex: buildTextures(`${FONT}, cursive`),
    reducedMotion,
    insets: () => ({ top: header.offsetHeight, bottom: caption.offsetHeight }),
    onSpot: openSpot,
  });
  root.classList.add("is-ready");

  note.addEventListener("close", () => {
    active = null;
    book.zoomTarget = 0;
    root.classList.remove("is-closeup");
    render();
    if (returnFocus?.isConnected) returnFocus.focus();
    returnFocus = null;
  });

  const render = () => {
    const current = ROOMS[room];
    caption.querySelector("[data-caption-name]")!.textContent = open ? current.name : "İlyas Torun";
    caption.querySelector("[data-caption-mood]")!.textContent = open ? current.mood : "tap the cover to open";
    if (active) {
      prev.disabled = next.disabled = roomSpots().length < 2;
      prev.setAttribute("aria-label", "Previous project");
      next.setAttribute("aria-label", "Next project");
    } else {
      prev.disabled = !open;
      prev.setAttribute("aria-label", room === 0 ? "Close the book" : "Previous room");
      next.disabled = open && room === N - 1;
      next.setAttribute("aria-label", open ? "Next room" : "Open the book");
    }
    // one button per spot, so the room's contents are readable (and reachable) without hunting
    const spots = open ? roomSpots() : [];
    const focusedKey = (document.activeElement as HTMLElement | null)?.dataset?.spot;
    spotList.replaceChildren(
      ...spots.map(([key, spot]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = spot.label;
        b.dataset.spot = key;
        if (key === active) b.setAttribute("aria-current", "true");
        b.addEventListener("click", () => openSpot(room, key, scene.focus(room, key)));
        const li = document.createElement("li");
        li.append(b);
        return li;
      }),
    );
    // keep keyboard focus on the same button across re-renders
    if (focusedKey) spotList.querySelector<HTMLElement>(`[data-spot="${focusedKey}"]`)?.focus();
    if (returnFocus?.dataset.spot) returnFocus = spotList.querySelector<HTMLElement>(`[data-spot="${returnFocus.dataset.spot}"]`);
    spotList.hidden = spots.length === 0;
    hideTip();
    live.textContent = open ? `${current.name}, room ${room + 1} of ${N}` : "Book closed";
  };

  const goTo = (logical: number) => {
    room = Math.max(0, Math.min(N - 1, logical));
    book.target = physicalOf(room);
    render();
  };
  const setOpen = (v: boolean) => {
    open = v;
    book.openTarget = v ? 1 : 0;
    render();
  };

  prev.addEventListener("click", () => {
    if (active) step(-1);
    else if (room === 0) setOpen(false);
    else goTo(room - 1);
  });
  next.addEventListener("click", () => {
    if (active) step(1);
    else if (open) goTo(room + 1);
    else setOpen(true);
  });

  window.addEventListener("keydown", (ev) => {
    if (ev.defaultPrevented) return;
    const onControl = ev.target instanceof HTMLButtonElement || ev.target instanceof HTMLAnchorElement;
    if (active) {
      if (ev.key === "Escape") closeNote();
      else if (ev.key === "ArrowRight") step(1);
      else if (ev.key === "ArrowLeft") step(-1);
      return;
    }
    if (ev.key === "ArrowRight") {
      if (!open) setOpen(true);
      else goTo(room + 1);
    } else if (ev.key === "ArrowLeft") {
      if (open) {
        if (room === 0) setOpen(false);
        else goTo(room - 1);
      }
    } else if ((ev.key === "Enter" || ev.key === " ") && !onControl) {
      ev.preventDefault();
      setOpen(!open);
    } else if (ev.key === "Escape") setOpen(false);
  });

  // Drag sideways to page through: content follows your finger.
  const drag = { x: 0, startX: 0, active: false };
  host.addEventListener("pointerdown", (ev) => {
    drag.x = drag.startX = ev.clientX;
    drag.active = true;
    host.setPointerCapture(ev.pointerId);
    if (open && !active) book.dragging = true;
  });
  host.addEventListener("pointermove", (ev) => {
    if (!drag.active) {
      if (ev.pointerType !== "mouse" || active) return;
      const h = scene.hover(ev.clientX, ev.clientY);
      const spot = h && SPOTS[ROOMS[h.room].id]?.[h.spot];
      if (spot) {
        tip.textContent = spot.label;
        tip.style.left = `${ev.clientX}px`;
        tip.style.top = `${ev.clientY}px`;
        tip.hidden = false;
      } else hideTip();
      return;
    }
    if (!open || active) return;
    const dx = ev.clientX - drag.x;
    drag.x = ev.clientX;
    book.f = Math.max(0, Math.min(N - 1, book.f + dx / 170));
  });
  const end = (ev: PointerEvent) => {
    if (!drag.active) return;
    drag.active = false;
    const moved = Math.abs(ev.clientX - drag.startX);
    if (active) {
      // a click on the scene steps back out of the close-up
      if (moved < 6) closeNote();
      return;
    }
    if (!open) {
      if (moved < 6) setOpen(true);
      return;
    }
    book.dragging = false;
    if (moved < 6 && scene.click(ev.clientX, ev.clientY)) return;
    goTo(logicalOf(Math.round(book.f)));
  };
  host.addEventListener("pointerup", end);
  host.addEventListener("pointercancel", end);
  host.addEventListener("pointerleave", () => {
    scene.clearHover();
    hideTip();
  });
  host.addEventListener("dblclick", () => {
    if (!active) setOpen(!open);
  });

  render();
}

// if anything goes wrong while starting, fall back to the plain-HTML version
start().catch((err) => {
  console.error(err);
  document.documentElement.classList.remove("js");
  document.querySelector("[data-book]")?.classList.remove("is-ready");
});
