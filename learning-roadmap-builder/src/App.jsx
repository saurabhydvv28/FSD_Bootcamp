import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TEMPLATES = {
  Frontend: [
    { id: "1", title: "TypeScript", category: "Frontend", desc: "Type safety, interfaces, generics, and integrating with React.", duration: "3 weeks", dep: "", status: "unlocked" },
    { id: "2", title: "State Management", category: "Frontend", desc: "Redux Toolkit, Zustand, or Context API for complex state.", duration: "2 weeks", dep: "1", status: "locked" },
    { id: "3", title: "Performance Optimization", category: "Frontend", desc: "Lazy loading, code splitting, memoization, and Core Web Vitals.", duration: "2 weeks", dep: "2", status: "locked" },
    { id: "4", title: "CSS Architecture", category: "Frontend", desc: "BEM, CSS Modules, styled-components, Tailwind CSS.", duration: "2 weeks", dep: "3", status: "locked" },
    { id: "5", title: "Soft Skills", category: "Frontend", desc: "Communication, teamwork, and how to behave in public.", duration: "4 weeks", dep: "4", status: "locked" }
  ],
  Backend: [
    { id: "1", title: "REST APIs & Fetch", category: "Backend", desc: "HTTP methods, Fetch API, Axios, and working with JSON data.", duration: "2 weeks", dep: "", status: "unlocked" },
    { id: "2", title: "Full Stack Integration", category: "Backend", desc: "Connect React app to a Node.js backend with auth and DB.", duration: "4 weeks", dep: "1", status: "locked" },
    { id: "3", title: "Build Tools", category: "Backend", desc: "Vite, Webpack, npm/yarn, and deployment pipelines.", duration: "1 week", dep: "2", status: "locked" },
    { id: "4", title: "Testing (Jest & RTL)", category: "Backend", desc: "Unit tests, integration tests, and test-driven development.", duration: "2 weeks", dep: "3", status: "locked" }
  ]
};

export default function App() {
  const [milestones, setMilestones] = useState(TEMPLATES.Frontend);
  const [activeTab, setActiveTab] = useState("Frontend");
  
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");
  const [newDep, setNewDep] = useState("");

  const nodesRef = useRef({});
  const linesRef = useRef({});

  useEffect(() => {
    setMilestones(prev => {
      let changed = false;
      const updated = prev.map(node => {
        if (node.status === "completed") return node;
        
        if (!node.dep) {
          if (node.status !== "unlocked") { changed = true; return { ...node, status: "unlocked" }; }
          return node;
        }

        const parent = prev.find(p => p.id === node.dep);
        const shouldUnlock = parent && parent.status === "completed";
        const targetStatus = shouldUnlock ? "unlocked" : "locked";

        if (node.status !== targetStatus) {
          changed = true;
          return { ...node, status: targetStatus };
        }
        return node;
      });

      return changed ? updated : prev;
    });
  }, [milestones]);

  const handleComplete = (id) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: "completed" } : m));
    
    if (nodesRef.current[id]) {
      gsap.fromTo(nodesRef.current[id], { scale: 0.95 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    }
    if (linesRef.current[id]) {
      gsap.fromTo(linesRef.current[id], { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newId = String(Date.now());
    const newNode = {
      id: newId,
      title: newTitle,
      category: newCategory,
      dep: newDep,
      status: "locked"
    };

    setMilestones([...milestones, newNode]);
    setNewTitle("");
    setNewDep("");
  };

  const filteredNodes = milestones.filter(m => m.category === activeTab);
  const totalCount = filteredNodes.length;
  const completedCount = filteredNodes.filter(m => m.status === "completed").length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: 'window.innerWidth > 1024 ? "1fr 2fr" : "1fr"',
    gap: '32px',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const panelStyle = {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--rad-lg)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  return (
    <div style={layoutStyle} className="app-container">
      
      {/* Left Panel: Configuration Controls & Analytics */}
      <div style={panelStyle}>
        
        <div>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', marginBottom: '12px' }}>Load Roadmap Template</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(TEMPLATES).map(key => (
              <button 
                key={key} 
                onClick={() => { setMilestones(TEMPLATES[key]); setActiveTab(key); }}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: 'var(--rad-sm)',
                  border: '1px solid var(--border2)',
                  background: activeTab === key ? 'var(--bg4)' : 'var(--bg3)',
                  color: activeTab === key ? 'var(--accent)' : 'var(--text)',
                  transition: '0.2s'
                }}
              >
                {key} Stack
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--accent)' }}>Add Roadmap Milestone</h2>
          <form onSubmit={handleAddMilestone} style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--muted)', marginBottom: '6px' }}>Milestone Title</label>
              <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g., Tailwind CSS" style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '10px', borderRadius: 'var(--rad-sm)', color: 'var(--text)', outline: 'none' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--muted)', marginBottom: '6px' }}>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '10px', borderRadius: 'var(--rad-sm)', color: 'var(--text)' }}>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--muted)', marginBottom: '6px' }}>Parent Dependency</label>
                <select value={newDep} onChange={e => setNewDep(e.target.value)} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '10px', borderRadius: 'var(--rad-sm)', color: 'var(--text)' }}>
                  <option value="">None (Root Node)</option>
                  {milestones.filter(m => m.category === newCategory).map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" style={{ width: '100%', background: 'var(--accent)', border: 'none', color: '#fff', padding: '12px', fontWeight: 'bold', borderRadius: 'var(--rad-sm)', cursor: 'pointer' }}>Append Node</button>
          </form>
        </div>

        <div>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>Skill Completion Analytics</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--accent3)' }}>{progressPercent}%</span>
            <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: 'auto' }}>{completedCount} / {totalCount} Solved</span>
          </div>
          <div style={{ width: '100%', background: 'var(--bg3)', height: '10px', borderRadius: '5px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ background: 'var(--accent3)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.5s ease' }} />
          </div>
        </div>

      </div>

      {/* Right Panel: Clean Flow Canvas using modern CSS variables */}
      <div style={{ ...panelStyle, background: 'var(--bg2)', flex: 2, alignItems: 'center', minHeight: '600px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', padding: '16px 0' }}>
          
          {filteredNodes.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '14px', textAlign: 'center', padding: '80px 0' }}>No custom milestones mapped to this track yet.</p>
          ) : (
            filteredNodes.map((node, idx) => {
              const catClass = node.category.toLowerCase();
              return (
                <div key={node.id} ref={el => nodesRef.current[node.id] = el} style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                  
                  <div 
                    onClick={() => node.status === 'unlocked' && handleComplete(node.id)}
                    style={{
                      width: '100%',
                      padding: '20px',
                      borderRadius: 'var(--rad)',
                      border: '1px solid',
                      borderColor: node.status === 'completed' ? 'var(--success)' : node.status === 'unlocked' ? 'var(--accent)' : 'var(--border)',
                      background: node.status === 'completed' ? 'rgba(34,197,94,0.05)' : node.status === 'unlocked' ? 'var(--bg3)' : 'var(--bg2)',
                      opacity: node.status === 'locked' ? 0.4 : 1,
                      pointerEvents: node.status === 'locked' ? 'none' : 'auto',
                      cursor: node.status === 'unlocked' ? 'pointer' : 'default',
                      transition: '0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ paddingRight: '16px' }}>
                        <span className={`color-${catClass}`} style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          {node.category}
                        </span>
                        <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: node.desc ? '6px' : '0' }}>{node.title}</h3>
                        
                        {/* New Description & Duration Rendering */}
                        {node.desc && <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: '1.4', marginBottom: '12px' }}>{node.desc}</p>}
                        {node.duration && <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>⏱ {node.duration}</div>}
                      </div>
                      
                      <div style={{ flexShrink: 0 }}>
                        {node.status === 'completed' && <span style={{ color: 'var(--success)', fontSize: '11px', fontWeight: 'bold', background: 'rgba(34,197,94,0.1)', padding: '4px 10px', borderRadius: '12px' }}>Done</span>}
                        {node.status === 'unlocked' && <span style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 'bold', background: 'rgba(91,141,238,0.1)', padding: '4px 10px', borderRadius: '12px' }}>Active</span>}
                        {node.status === 'locked' && <span style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 'bold', background: 'var(--bg4)', padding: '4px 10px', borderRadius: '12px' }}>Locked</span>}
                      </div>
                    </div>
                  </div>

                  {idx < filteredNodes.length - 1 && (
                    <div 
                      ref={el => linesRef.current[node.id] = el}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        width: '2px',
                        height: '32px',
                        transformOrigin: 'top center',
                        transform: 'translateX(-50%)',
                        zIndex: 0,
                        background: node.status === 'completed' ? 'var(--success)' : 'var(--border2)'
                      }}
                    />
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}