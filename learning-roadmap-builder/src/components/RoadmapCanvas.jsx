import React, { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { CAT_LABELS, STATUS_LABELS } from '../data'
import styles from './RoadmapCanvas.module.css'

function ConnectionsSVG({ milestones }) {
  return (
    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M1 1L8 5L1 9" fill="none" stroke="rgba(91,141,238,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        </marker>
        <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M1 1L8 5L1 9" fill="none" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        </marker>
      </defs>
      {milestones.flatMap(target =>
        target.deps.map(depId => {
          const src = milestones.find(m => m.id === depId)
          if (!src) return null
          const NODE_W = 200, NODE_H = 130
          const sx = src.x + NODE_W, sy = src.y + NODE_H / 2
          const tx = target.x,      ty = target.y + NODE_H / 2
          const cx = (sx + tx) / 2
          const done = src.status === 'done' && target.status === 'done'
          return (
            <path
              key={`${depId}-${target.id}`}
              fill="none"
              stroke={done ? 'rgba(34,197,94,0.5)' : 'rgba(91,141,238,0.25)'}
              strokeWidth="2"
              strokeDasharray={done ? 'none' : '6 4'}
              markerEnd={`url(#${done ? 'arrowGreen' : 'arrowBlue'})`}
              d={`M${sx},${sy} C${cx},${sy} ${cx},${ty} ${tx},${ty}`}
            />
          )
        })
      )}
    </svg>
  )
}

function MilestoneNode({ milestone, connectMode, connectFrom, selectedId, onSelect, onEdit, onCycleStatus, onDelete, onDrag, onConnectClick }) {
  const nodeRef = useRef(null)
  const { id, name, desc, cat, status, dur, progress, x, y } = milestone

  useEffect(() => {
    if (nodeRef.current) {
      gsap.from(nodeRef.current, { scale: 0.7, opacity: 0, duration: 0.4, ease: 'back.out(1.4)' })
    }
  }, [])

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('[data-ctrl]')) return
    if (connectMode) { onConnectClick(id); return }
    e.preventDefault()
    const startX = e.clientX - x
    const startY = e.clientY - y
    const el = nodeRef.current
    if (el) el.style.zIndex = 50

    const onMove = (ev) => {
      onDrag(id, Math.max(0, ev.clientX - startX), Math.max(0, ev.clientY - startY))
    }
    const onUp = () => {
      if (el) el.style.zIndex = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [connectMode, id, x, y, onDrag, onConnectClick])

  const isSelected  = selectedId === id
  const isConnFrom  = connectFrom === id

  return (
    <div
      ref={nodeRef}
      className={`${styles.node} ${styles[`status_${status}`]} ${isSelected ? styles.selected : ''} ${isConnFrom ? styles.depHighlight : ''}`}
      style={{ left: x, top: y }}
      onMouseDown={handleMouseDown}
      onClick={(e) => { if (!connectMode && !e.target.closest('[data-ctrl]')) onSelect(id) }}
    >
      <div className={`${styles.stripe} stripe-${cat}`} />
      <div className={styles.body}>
        <div className={`${styles.category} color-${cat}`}>
          <span>●</span> {CAT_LABELS[cat] || cat}
        </div>
        <div className={styles.title}>{name}</div>
        <div className={styles.desc}>{desc.length > 80 ? desc.slice(0, 80) + '…' : desc}</div>
        {progress > 0 && (
          <div className={styles.progressBar}>
            <div className={`${styles.progressFill} stripe-${cat}`} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.dur}>⏱ {dur || '—'}</div>
        <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>{STATUS_LABELS[status]}</span>
      </div>
      <div className={styles.controls}>
        <button data-ctrl className={styles.ctrlBtn} onClick={() => onEdit(id)} title="Edit">✏️</button>
        <button data-ctrl className={styles.ctrlBtn} onClick={() => onCycleStatus(id)} title="Next status">▶</button>
        <button data-ctrl className={`${styles.ctrlBtn} ${styles.del}`} onClick={() => onDelete(id)} title="Delete">✕</button>
      </div>
    </div>
  )
}

export default function RoadmapCanvas({ milestones, connectMode, onDrag, onEdit, onCycleStatus, onDelete, onAddMilestone, onConnectClick, connectFrom }) {
  const [selectedId, setSelectedId] = React.useState(null)

  return (
    <div className={styles.canvasArea}>
      <div className={styles.canvasScroll}>
        <div className={styles.canvasInner} style={{ cursor: connectMode ? 'crosshair' : '' }}>
          <ConnectionsSVG milestones={milestones} />
          {milestones.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🗺️</div>
              <h3>Start your learning journey</h3>
              <p>Add milestones to build your roadmap</p>
            </div>
          )}
          {milestones.map(m => (
            <MilestoneNode
              key={m.id}
              milestone={m}
              connectMode={connectMode}
              connectFrom={connectFrom}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={onEdit}
              onCycleStatus={onCycleStatus}
              onDelete={onDelete}
              onDrag={onDrag}
              onConnectClick={onConnectClick}
            />
          ))}
        </div>
      </div>
      <button className={styles.fab} onClick={onAddMilestone} title="Add milestone">＋</button>
    </div>
  )
}
