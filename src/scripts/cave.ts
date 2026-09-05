const reduced = matchMedia("(prefers-reduced-motion: reduce)");
document
  .querySelectorAll<HTMLButtonElement>("[data-photo]")
  .forEach((button) => {
    button.addEventListener("click", () =>
      button.setAttribute(
        "aria-pressed",
        String(button.getAttribute("aria-pressed") !== "true"),
      ),
    );
    button.addEventListener("keydown", (event) => {
      if (event.key === "Escape") button.setAttribute("aria-pressed", "false");
    });
  });
const strip = document.querySelector<HTMLElement>("[data-film-window]");
const track = document.querySelector<HTMLElement>("[data-film-track]");
const pause = document.querySelector<HTMLButtonElement>("[data-film-pause]");
if (strip && track && pause) {
  let offset = 0,
    last = 0,
    velocity = 0,
    dragging = false,
    hovered = false,
    stopped = false,
    visible = false,
    previousX = 0;
  let raf = 0;
  const draw = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.04);
    last = now;
    if (!dragging && !hovered && !stopped && !reduced.matches) {
      offset += (16 + velocity) * dt;
      velocity *= Math.exp(-dt * 5);
    }
    const width = track.firstElementChild?.getBoundingClientRect().width ?? 1;
    offset = ((offset % width) + width) % width;
    track.style.transform = `translateX(${-offset}px)`;
    raf = visible && !document.hidden ? requestAnimationFrame(draw) : 0;
  };
  const start = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }
  };
  addEventListener("portfolio-card-change", ((e: CustomEvent) => {
    visible = e.detail.activeIndex === 2;
    start();
  }) as EventListener);
  document.addEventListener("visibilitychange", start);
  strip.addEventListener("pointerenter", () => (hovered = true));
  strip.addEventListener("pointerleave", () => (hovered = false));
  strip.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragging = true;
    previousX = e.clientX;
    strip.setPointerCapture(e.pointerId);
  });
  strip.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const delta = previousX - e.clientX;
    offset += delta;
    velocity = delta * 30;
    previousX = e.clientX;
  });
  const finish = () => (dragging = false);
  strip.addEventListener("pointerup", finish);
  strip.addEventListener("pointercancel", finish);
  const toggle = () => {
    stopped = !stopped;
    pause.setAttribute("aria-pressed", String(stopped));
    pause.setAttribute(
      "aria-label",
      stopped ? "Play film strip" : "Pause film strip",
    );
    pause.textContent = stopped ? "▶" : "Ⅱ";
  };
  pause.addEventListener("click", toggle);
  strip.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      offset += e.key === "ArrowRight" ? 110 : -110;
    }
    if (e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
  strip.addEventListener("focusin", () => (hovered = true));
  strip.addEventListener("focusout", () => (hovered = false));
}
const stage = document.querySelector<HTMLElement>("[data-book-stage]");
if (stage) {
  let loaded = false;
  const load = async () => {
    if (loaded) return;
    loaded = true;
    try {
      const { initBooks } = await import("./cave-books");
      await initBooks(stage);
    } catch (error) {
      console.warn(
        "3D books unavailable; preserving photographic shelf.",
        error,
      );
    }
  };
  addEventListener("portfolio-card-change", ((e: CustomEvent) => {
    if (e.detail.activeIndex === 2) void load();
  }) as EventListener);
  stage.addEventListener("pointerenter", load, { once: true });
  stage.addEventListener("focusin", load, { once: true });
}
