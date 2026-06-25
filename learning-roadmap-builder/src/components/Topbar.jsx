import React from 'react'
import styles from './Topbar.module.css'

export default function Topbar({ roadmap, milestones, activeView, connectMode, onSwitchView, onAutoLayout, onToggleConnect, onAddMilestone }) {
  const done = milestones.filter(m => m.status === 'done').length
  const tabs = ['roadmap', 'milestones', 'dashboard']

  return (
    <div className={styles.topbar}>
      <div className={styles.title}>
        {roadmap?.name}
        <span>{milestones.length} milestones · {done} done</span>
      </div>

      <div className={styles.tabGroup}>
        {tabs.map(t => (
          <button
            key={t}
            className={`${styles.tabBtn} ${activeView === t ? styles.active : ''}`}
            onClick={() => onSwitchView(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={onAutoLayout} title="Auto layout">⚡</button>
        <button
          className={styles.iconBtn}
          onClick={onToggleConnect}
          title="Connect nodes"
          style={connectMode ? { background: 'rgba(91,141,238,0.2)', borderColor: 'rgba(91,141,238,0.5)' } : {}}
        >🔗</button>
        <button className={styles.primaryBtn} onClick={onAddMilestone}>＋ Add Milestone</button>
      </div>
    </div>
  )
}
