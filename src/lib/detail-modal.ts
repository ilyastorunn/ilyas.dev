export interface DetailPayload {
  title: string;
  description: string;
  eyebrow?: string;
  actionLabel?: string;
  url?: string;
  accent?: string;
  meta?: { label: string; value: string }[];
}

export function setupDetailModal(doc: Document = document) {
  const view = doc.defaultView ?? window;
  const dialog = doc.querySelector<HTMLDialogElement>("#detail-modal");
  const closeButton = dialog?.querySelector<HTMLButtonElement>(".modal-close");
  const title = dialog?.querySelector<HTMLElement>("#detail-title");
  const description = dialog?.querySelector<HTMLElement>("#detail-description");
  const eyebrow = dialog?.querySelector<HTMLElement>("#detail-eyebrow");
  const meta = dialog?.querySelector<HTMLElement>(".modal-meta");
  const action = dialog?.querySelector<HTMLAnchorElement>(".modal-action");
  const visual = dialog?.querySelector<HTMLElement>(".modal-visual");
  let trigger: HTMLElement | null = null;

  const closeModal = () => dialog?.close();

  doc.addEventListener("click", (event) => {
    const element = event.target as HTMLElement | null;
    const target = element?.closest<HTMLElement>("[data-detail]");
    if (!target || !dialog || !title || !description || !eyebrow || !meta || !action || !visual) return;
    const raw = target.dataset.detail;
    if (!raw) return;
    event.preventDefault();
    const detail = JSON.parse(raw) as DetailPayload;
    trigger = target;
    title.textContent = detail.title;
    description.textContent = detail.description;
    eyebrow.textContent = detail.eyebrow ?? "Selected detail";
    visual.style.setProperty("--modal-accent", detail.accent ?? "#c8cbcd");
    meta.replaceChildren(...(detail.meta ?? []).map((item) => {
      const wrapper = doc.createElement("div");
      const term = doc.createElement("dt");
      const value = doc.createElement("dd");
      term.textContent = item.label;
      value.textContent = item.value;
      wrapper.append(term, value);
      return wrapper;
    }));
    if (detail.url) {
      action.hidden = false;
      action.href = detail.url;
      if (action.firstChild) action.firstChild.textContent = `${detail.actionLabel ?? "Open link"} `;
    } else {
      action.hidden = true;
      action.removeAttribute("href");
    }
    const scrollbarWidth = view.innerWidth - doc.documentElement.clientWidth;
    doc.body.style.setProperty("--scrollbar-compensation", `${scrollbarWidth}px`);
    doc.body.classList.add("modal-open");
    dialog.showModal();
    closeButton?.focus();
  });

  closeButton?.addEventListener("click", closeModal);
  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog?.open) {
      event.preventDefault();
      closeModal();
    }
  });
  dialog?.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeModal();
  });
  dialog?.addEventListener("close", () => {
    doc.body.classList.remove("modal-open");
    doc.body.style.removeProperty("--scrollbar-compensation");
    trigger?.focus();
  });

  return { dialog, close: closeModal };
}
