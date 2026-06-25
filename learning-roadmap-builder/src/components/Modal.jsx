import React, { useState, useEffect } from 'react'
import styles from './Modal.module.css'

const CATS = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend',  label: 'Backend' },
  { value: 'devops',   label: 'DevOps' },
  { value: 'cs',       label: 'CS Fundamentals' },
  { value: 'ml',       label: 'ML / AI' },
  { value: 'cloud',    label: 'Cloud' },
]

const STATUSES = [
  { value: 'todo',   label: 'Not Started' },
  { value: 'active', label: 'In Progress' },
  { value: 'done',   label: 'Completed' },
]

const DEFAULT_MILESTONE = { name: '', desc: '', cat: 'frontend', status: 'todo', dur: '', progress: 0, resources: '', deps: [] }

export function MilestoneModal({ isOpen, onClose, onSave, editing, milestones, activeRoadmapId }) {
  const [form, setForm] = useState(DEFAULT_MILESTONE)

  useEffect(() => {
    if (editing) {
      const m = milestones.find(m => m.id === editing)
      if (m) setForm({ name: m.name, desc: m.desc, cat: m.cat, status: m.status, dur: m.dur || '', progress: m.progress || 0, resources: m.resources || '', deps: [...m.deps] })
    } else {
      setForm(DEFAULT_MILESTONE)
    }
  }, [editing, milestones, isOpen])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const addDep = (id) => {
    if (!id || form.deps.includes(id)) return
    set('deps', [...form.deps, id])
  }
  const removeDep = (id) => set('deps', form.deps.filter(d => d !== id))

  const depOptions = milestones.filter(m => m.roadmap === activeRoadmapId && m.id !== editing)

  const handleSave = () => {
    if (!form.name.trim()) return
    onSave(form)
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        <div className={styles.title}>🏁 {editing ? 'Edit Milestone' : 'Add Milestone'}</div>

        <div className={styles.row}>
          <label className={styles.label}>Milestone name</label>
          <input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Learn React Hooks" />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Description</label>
          <textarea className={styles.textarea} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="What will you learn?" />
        </div>

        <div className={styles.row2}>
          <div>
            <label className={styles.label}>Category</label>
            <select className={styles.select} value={form.cat} onChange={e => set('cat', e.target.value)}>
              {CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={styles.label}>Status</label>
            <select className={styles.select} value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.row2}>
          <div>
            <label className={styles.label}>Duration</label>
            <input className={styles.input} value={form.dur} onChange={e => set('dur', e.target.value)} placeholder="e.g. 2 weeks" />
          </div>
          <div>
            <label className={styles.label}>Progress %</label>
            <input className={styles.input} type="number" min="0" max="100" value={form.progress} onChange={e => set('progress', parseInt(e.target.value) || 0)} />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Resources (comma-separated)</label>
          <input className={styles.input} value={form.resources} onChange={e => set('resources', e.target.value)} placeholder="MDN, YouTube, freeCodeCamp" />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Dependencies</label>
          <select className={styles.select} value="" onChange={e => { addDep(e.target.value); e.target.value = '' }}>
            <option value="">— Select a prerequisite —</option>
            {depOptions.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <div className={styles.depList}>
            {form.deps.map(id => {
              const m = milestones.find(m => m.id === id)
              return m ? (
                <div key={id} className={styles.depTag}>
                  {m.name} <span onClick={() => removeDep(id)}>✕</span>
                </div>
              ) : null
            })}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.submitBtn} onClick={handleSave}>Save Milestone</button>
        </div>
      </div>
    </div>
  )
}

export function RoadmapModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => { if (isOpen) { setName(''); setGoal('') } }, [isOpen])

  const handleSave = () => {
    if (!name.trim()) return
    onSave({ name: name.trim(), goal: goal.trim() })
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        <div className={styles.title}>🗺️ New Roadmap</div>

        <div className={styles.row}>
          <label className={styles.label}>Roadmap name</label>
          <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Full Stack Developer" />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Goal</label>
          <textarea className={styles.textarea} value={goal} onChange={e => setGoal(e.target.value)} placeholder="What do you want to achieve?" />
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.submitBtn} onClick={handleSave}>Create Roadmap</button>
        </div>
      </div>
    </div>
  )
}
