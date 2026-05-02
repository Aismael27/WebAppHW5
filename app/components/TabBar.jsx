import './TabBar.css'

export default function TabBar() {
  return (
    <div className="tab-bar">
      <button className="tab tab--active">Personal</button>
      <button className="tab">Professional</button>
    </div>
  )
}