import { fireEvent } from "@testing-library/dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setupDetailModal } from "./detail-modal";

const payload = JSON.stringify({
  title: "Signal Notes",
  description: "A calm notes app.",
  eyebrow: "iOS app",
  actionLabel: "View concept",
  url: "https://example.com/signal",
  meta: [{ label: "Platform", value: "iOS" }],
});

beforeEach(() => {
  document.body.innerHTML = `
    <a id="trigger" href="https://example.com/signal" data-detail='${payload}'>Signal</a>
    <dialog id="detail-modal">
      <button class="modal-close">Close</button><div class="modal-visual"></div>
      <p id="detail-eyebrow"></p><h2 id="detail-title"></h2><p id="detail-description"></p>
      <dl class="modal-meta"></dl><a class="modal-action">Open <span>↗</span></a>
    </dialog>`;
  const dialog = document.querySelector<HTMLDialogElement>("dialog")!;
  dialog.showModal = vi.fn(() => dialog.setAttribute("open", ""));
  dialog.close = vi.fn(() => { dialog.removeAttribute("open"); dialog.dispatchEvent(new Event("close")); });
});

describe("detail modal", () => {
  it("opens from a detail trigger and renders structured content", () => {
    setupDetailModal(document);
    fireEvent.click(document.querySelector("#trigger")!);
    expect(document.querySelector("dialog")?.hasAttribute("open")).toBe(true);
    expect(document.querySelector("#detail-title")?.textContent).toBe("Signal Notes");
    expect(document.querySelector(".modal-meta")?.textContent).toContain("Platform");
    expect(document.body.classList.contains("modal-open")).toBe(true);
  });

  it("closes with Escape and restores focus", () => {
    setupDetailModal(document);
    const trigger = document.querySelector<HTMLAnchorElement>("#trigger")!;
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.querySelector("dialog")?.hasAttribute("open")).toBe(false);
    expect(document.activeElement).toBe(trigger);
    expect(document.body.classList.contains("modal-open")).toBe(false);
  });
});
