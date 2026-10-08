import backdrop from '../assets/backdrop.webp'

export function Background() {
  return (
    <div className="bg" aria-hidden>
      <img className="bg__photo" src={backdrop} alt="" />
      <div className="bg__veil" />
      <div className="bg__grain" />
    </div>
  )
}
