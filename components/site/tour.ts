export const TOUR_EVENT = 'bisesj:book-tour'

/** Scrolls to the in-page enquiry form and asks it to pre-fill the tour message. */
export function bookCampusTour(e?: React.MouseEvent) {
  e?.preventDefault()
  window.dispatchEvent(new CustomEvent(TOUR_EVENT))
  const target = document.getElementById('enquiry')
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', '#enquiry')
}
