const POSITIONS = {
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
}

const THEMES = { LIGHT: "light", DARK: "dark", COLORED: "colored" }
const TRANSITIONS = { SLIDE: "slide", BOUNCE: "bounce", ZOOM: "zoom", FLIP: "flip", FADE: "fade" }
const TYPES = { SUCCESS: "success", ERROR: "error", WARNING: "warning", INFO: "info", DEFAULT: "default" }

const ICONS = {
  success: `<svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1zm-1.5 2.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" fill="currentColor"/><path d="M10.23 3.216c.75-1.425 2.79-1.425 3.54 0l8.343 15.852C22.814 20.4 21.85 22 20.343 22H3.657c-1.505 0-2.47-1.6-1.77-2.931L10.23 3.216zM20.344 20L12 4.147 3.656 20h16.688z" fill="currentColor"/></svg>`,
  info: `<svg fill="currentColor" width="20" height="20" viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin"><path d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/></svg>`,
  default: `<svg fill="currentColor" width="20" height="20" viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin"><path d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/></svg>`,
}

const ENTER_ANIMS = {
  slide: { right: "Toastify__slideInRight", left: "Toastify__slideInLeft", center: "Toastify__slideInDown", bottom: "Toastify__slideInUp" },
  bounce: { right: "Toastify__bounceInRight", left: "Toastify__bounceInRight", center: "Toastify__bounceInRight", bottom: "Toastify__bounceInRight" },
  zoom: { right: "Toastify__zoomIn", left: "Toastify__zoomIn", center: "Toastify__zoomIn", bottom: "Toastify__zoomIn" },
  flip: { right: "Toastify__flipIn", left: "Toastify__flipIn", center: "Toastify__flipIn", bottom: "Toastify__flipIn" },
  fade: { right: "Toastify__fadeIn", left: "Toastify__fadeIn", center: "Toastify__fadeIn", bottom: "Toastify__fadeIn" },
}

const defaults = {
  position: POSITIONS.TOP_RIGHT,
  autoClose: 5000,
  theme: THEMES.LIGHT,
  transition: TRANSITIONS.SLIDE,
  closeButton: true,
  pauseOnHover: true,
  draggable: true,
}

const containers = {}

function getContainer(position) {
  if (containers[position]) return containers[position];

  const el = document.createElement("div");
  el.className = `Toastify__toast-container Toastify__toast-container--${position}`;
  el.setAttribute("data-position", position);

  // Use the permanent root if available, otherwise fall back to body
  const root = document.getElementById("toast-container-root") || document.body;
  root.appendChild(el);

  containers[position] = el;
  return el;
}

function getEnterAnim(transition, position) {
  const map = ENTER_ANIMS[transition] || ENTER_ANIMS.slide
  if (position.includes("right")) return map.right
  if (position.includes("left")) return map.left
  if (position.startsWith("bottom")) return map.bottom
  return map.center
}

function dismiss(toast) {
  if (!toast || toast._dismissing) return
  toast._dismissing = true
  clearTimeout(toast._timer)

  toast.classList.add("Toastify__toast--exit")
  toast.addEventListener("animationend", () => {
    toast.remove()
  }, { once: true })
}

function show(message, options = {}) {
  const opts = { ...defaults, ...options }
  const { position, autoClose, theme, transition, closeButton, pauseOnHover, draggable, type = TYPES.DEFAULT } = opts

  const container = getContainer(position)
  const isBottom = position.startsWith("bottom")

  const toast = document.createElement("div")
  toast.className = [
    "Toastify__toast",
    `Toastify__toast--${type}`,
    theme === THEMES.DARK ? "Toastify__toast--dark" : "",
    theme === THEMES.COLORED ? "Toastify__toast--colored" : "",
  ].filter(Boolean).join(" ")

  const enterAnim = getEnterAnim(transition, position)
  toast.style.setProperty("--enter-anim", enterAnim)
  toast.classList.add("Toastify__toast--enter")

  const progressBar = autoClose
    ? `<div class="Toastify__progress-bar Toastify__progress-bar--${type}" style="animation-duration:${autoClose}ms;"></div>`
    : ""

  const closeBtn = closeButton
    ? `<button class="Toastify__close-button" aria-label="Close toast">&#x2715;</button>`
    : ""

  toast.innerHTML = `
    <div class="Toastify__toast-body">
      <div class="Toastify__toast-icon">${ICONS[type] || ICONS.default}</div>
      <div class="Toastify__toast-message">${message}</div>
    </div>
    ${closeBtn}
    ${progressBar}
  `

  toast.querySelector(".Toastify__close-button")?.addEventListener("click", () => dismiss(toast))

  if (autoClose) {
    toast._timer = setTimeout(() => dismiss(toast), autoClose)
  }

  if (pauseOnHover && autoClose) {
    const pb = toast.querySelector(".Toastify__progress-bar")
    toast.addEventListener("mouseenter", () => {
      clearTimeout(toast._timer)
      pb?.style.setProperty("animation-play-state", "paused")
    })
    toast.addEventListener("mouseleave", () => {
      pb?.style.setProperty("animation-play-state", "running")
      toast._timer = setTimeout(() => dismiss(toast), autoClose / 2)
    })
  }

  if (draggable) {
    let startX = 0
    let currentX = 0
    let dragging = false

    toast.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".Toastify__close-button")) return;
      startX = e.clientX
      dragging = true
      toast.style.transition = "none"
      toast.setPointerCapture(e.pointerId)
    })

    toast.addEventListener("pointermove", (e) => {
      if (!dragging) return
      currentX = e.clientX - startX
      toast.style.transform = `translateX(${currentX}px)`
      toast.style.opacity = `${1 - Math.abs(currentX) / 150}`
    })

    toast.addEventListener("pointerup", () => {
      if (!dragging) return
      dragging = false
      toast.style.transition = ""
      if (Math.abs(currentX) > 80) {
        dismiss(toast)
      } else {
        toast.style.transform = ""
        toast.style.opacity = ""
      }
      currentX = 0
    })
  }

  if (isBottom) container.appendChild(toast)
  else container.insertBefore(toast, container.firstChild)

  return toast
}

const Toastify = {
  success: (msg, opts) => show(msg, { ...opts, type: TYPES.SUCCESS }),
  error: (msg, opts) => show(msg, { ...opts, type: TYPES.ERROR }),
  warning: (msg, opts) => show(msg, { ...opts, type: TYPES.WARNING }),
  info: (msg, opts) => show(msg, { ...opts, type: TYPES.INFO }),
  show: (msg, opts) => show(msg, opts),
  dismiss,
  POSITIONS,
  THEMES,
  TRANSITIONS,
  defaults,
}

window.Toastify = Toastify

export default Toastify
