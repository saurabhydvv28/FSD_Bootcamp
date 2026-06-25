import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CAT_LABELS, CAT_COLORS } from '../data'
import styles from './Dashboard.module.css'

function StatCard({ label, value, sub, color }) {
  const valRef = useRef(null)
  useEffect(() => {
    if (!valRef.current) return
    const target = parseFloat(value)
    if (isNaN(target)) return
    gsap.fromTo({ val: 0 }, { val: target }, {
      val: target, duration: 1.2, ease: 'power2.out',
      onUpdate: function () {
        if (valRef.current) valRef.current.textContent = Math.round(this.targets()[0].val) + (String(value).includes('%') ? '%' : '')
      }
    })
  }, [value])

  return (
    <div className={`${styles.statCard} ${styles[`c_${color}`]}`}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue} ref={valRef}>{value}</div>
      <div className={styles.statSub}>{sub}</div>
    </div>
  )
}

export default function Dashboard({ roadmaps, milestones, activities }) {
  const total  = milestones.length
  const done   = milestones.filter(m => m.status === 'done').length
  const active = milestones.filter(m => m.status === 'active').length
  const pct    = total ? Math.round(done / total * 100) : 0

  const allResources = milestones.flatMap(m => (m.resources || '').split(',').map(r => r.trim())).filter(Boolean)
  const uniqueResources = [...new Set(allResources)].slice(0, 18)

  return (
    <div className={styles.view}>
      <div className={styles.statsGrid}>
        <StatCard label="Total milestones" value={total}  sub={`across ${roadmaps.length} roadmaps`} color="blue" />
        <StatCard label="Completed"        value={done}   sub={`${pct}% overall progress`}           color="green" />
        <StatCard label="In progress"      value={active} sub="currently active"                     color="purple" />
        <StatCard label="Overall progress" value={`${pct}%`} sub="keep going!"                       color="teal" />
      </div>

      <div className={styles.row}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📁 Progress by category</h3>
          <div className={styles.catBars}>
            {Object.keys(CAT_LABELS).map(c => {
              const catMs = milestones.filter(m => m.cat === c)
              if (!catMs.length) return null
              const p = Math.round(catMs.filter(m => m.status === 'done').length / catMs.length * 100)
              return (
                <div key={c} className={styles.catRow}>
                  <span className={styles.catName}>{CAT_LABELS[c]}</span>
                  <div className={styles.catTrack}>
                    <div className={styles.catFill} style={{ width: `${p}%`, background: CAT_COLORS[c] }} />
                  </div>
                  <span className={styles.catPct}>{p}%</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>⚡ Recent activity</h3>
          <div className={styles.activityList}>
            {activities.slice(0, 5).map((a, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityDot} style={{ background: a.color }} />
                <div>
                  <div className={styles.activityName}>{a.name}</div>
                  <div className={styles.activityTime}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🏷️ Skills covered</h3>
          <div className={styles.skillTags}>
            {uniqueResources.map(r => (
              <span key={r} className={styles.skillTag}>{r}</span>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🗺️ Roadmaps overview</h3>
          {roadmaps.map(r => {
            const ms = milestones.filter(m => m.roadmap === r.id)
            const d  = ms.filter(m => m.status === 'done').length
            const p  = ms.length ? Math.round(d / ms.length * 100) : 0
            return (
              <div key={r.id} className={styles.roadmapRow}>
                <div className={styles.roadmapRowHeader}>
                  <span className={styles.roadmapRowName}>{r.name}</span>
                  <span className={styles.roadmapRowCount}>{d}/{ms.length}</span>
                </div>
                <div className={styles.progTrack}>
                  <div className={styles.progFill} style={{ width: `${p}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
