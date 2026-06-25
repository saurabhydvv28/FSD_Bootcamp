import React from 'react'
import styles from './Sidebar.module.css'

export default function Sidebar({ roadmaps, milestones, activeRoadmapId, activeView, onSelectRoadmap, onSwitchView, onNewRoadmap }) {
  const navItems = [
    { view: 'roadmap',     icon: '🛤️', label: 'Roadmap' },
    { view: 'milestones',  icon: '🏁', label: 'Milestones' },
    { view: 'dashboard',   icon: '📊', label: 'Dashboard' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>🗺️</div>
        <div className={styles.logoText}>
          PathForge
          <span>Learning Roadmap Builder</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ view, icon, label }) => (
          <button
            key={view}
            className={`${styles.navBtn} ${activeView === view ? styles.active : ''}`}
            onClick={() => onSwitchView(view)}
          >
            <span className={styles.icon}>{icon}</span> {label}
          </button>
        ))}
      </nav>

      <div className={styles.roadmapList}>
        <h4 className={styles.listHeading}>Your Roadmaps</h4>
        {roadmaps.map(r => {
          const ms = milestones.filter(m => m.roadmap === r.id)
          const done = ms.filter(m => m.status === 'done').length
          const pct = ms.length ? Math.round(done / ms.length * 100) : 0
          return (
            <div
              key={r.id}
              className={`${styles.roadmapItem} ${r.id === activeRoadmapId ? styles.activeItem : ''}`}
              onClick={() => onSelectRoadmap(r.id)}
            >
              <div className={styles.itemName}>{r.name}</div>
              <div className={styles.itemMeta}>
                <span>{done}/{ms.length} done</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                </div>
                <span>{pct}%</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.footer}>
        <button className={styles.addBtn} onClick={onNewRoadmap}>
          <span>＋</span> New Roadmap
        </button>
      </div>
    </aside>
  )
}
