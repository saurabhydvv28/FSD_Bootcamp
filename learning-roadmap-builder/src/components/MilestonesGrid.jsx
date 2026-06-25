import React, { useState } from 'react'
import { CAT_LABELS, STATUS_LABELS } from '../data'
import styles from './MilestonesGrid.module.css'

const FILTERS = ['all', 'todo', 'active', 'done']

export default function MilestonesGrid({ milestones, onEdit, onCycleStatus, onSwitchView }) {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all' ? milestones : milestones.filter(m => m.status === filter)

  return (
    <div className={styles.view}>
      <div className={styles.header}>
        <h2 className={styles.heading}>All Milestones</h2>
        <div className={styles.filterGroup}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : STATUS_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {visible.map(m => {
          const resources = (m.resources || '').split(',').map(r => r.trim()).filter(Boolean)
          return (
            <div key={m.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={`${styles.stripe} stripe-${m.cat}`} />
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={`${styles.catLabel} color-${m.cat}`}>{CAT_LABELS[m.cat] || m.cat}</span>
                    <span className={`${styles.badge} ${styles[`badge_${m.status}`]}`}>{STATUS_LABELS[m.status]}</span>
                  </div>
                  <div className={styles.cardTitle}>{m.name}</div>
                  <div className={styles.cardDesc}>{m.desc}</div>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.stats}>
                  <div className={styles.stat}><span className={styles.statLabel}>Duration</span><span className={styles.statVal}>{m.dur || '—'}</span></div>
                  <div className={styles.stat}><span className={styles.statLabel}>Deps</span><span className={styles.statVal}>{m.deps.length}</span></div>
                  <div className={styles.stat}><span className={styles.statLabel}>Progress</span><span className={styles.statVal}>{m.progress}%</span></div>
                </div>

                <div className={styles.progressWrap}>
                  <div className={styles.progressLabel}><span>Completion</span><span>{m.progress}%</span></div>
                  <div className={styles.progressTrack}>
                    <div className={`${styles.progressFill} stripe-${m.cat}`} style={{ width: `${m.progress}%` }} />
                  </div>
                </div>

                {resources.length > 0 && (
                  <div className={styles.tags}>
                    {resources.map(r => <span key={r} className={`${styles.tag} tag-${m.cat}`}>{r}</span>)}
                  </div>
                )}

                <div className={styles.actions}>
                  <button className={styles.btn} onClick={() => { onEdit(m.id); onSwitchView('roadmap') }}>Edit</button>
                  <button className={styles.btn} onClick={() => onCycleStatus(m.id)}>Next status</button>
                  <button className={`${styles.btn} ${styles.primary}`} onClick={() => onSwitchView('roadmap')}>View on map</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
