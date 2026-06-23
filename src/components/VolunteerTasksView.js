'use client';
import React, { useState } from 'react';
import { ClipboardList, CheckCircle, MapPin } from 'lucide-react';

export default function VolunteerTasksView() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Sandbag Placement', loc: 'Dadar Coast', req: '5 people', status: 'OPEN' },
    { id: 2, title: 'Medical Supply Sorting', loc: 'KEM Hospital', req: '2 people', status: 'OPEN' },
    { id: 3, title: 'Evacuee Registration Desk', loc: 'St. Xavier School', req: 'Filled', status: 'ASSIGNED' },
  ]);

  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleVolunteer = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'ASSIGNED', req: 'Filled' } : t));
    showToast('You have been assigned to this task! Details sent to your phone.');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {toast && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent-green)', color: '#fff', padding: '12px 24px', borderRadius: '30px',
          display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100, fontWeight: 'bold'
        }}>
          <CheckCircle size={20} /> {toast}
        </div>
      )}

      <h2 className="view-title"><ClipboardList color="var(--accent-yellow)" /> Volunteer Taskforce</h2>
      
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '20px' }}>Available Field Tasks</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tasks.map(task => (
            <div key={task.id} className={`list-item ${task.status === 'OPEN' ? 'danger' : 'safe'}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '1.2rem' }}>{task.title}</strong>
                <span className={`tag ${task.status === 'OPEN' ? 'danger' : 'safe'}`}>{task.status}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16}/> {task.loc}</span>
                <span>Requirement: {task.req}</span>
              </div>
              
              {task.status === 'OPEN' ? (
                <button onClick={() => handleVolunteer(task.id)} className="btn-primary" style={{ backgroundColor: 'var(--accent-yellow)', color: '#000' }}>
                  Volunteer for this Task
                </button>
              ) : (
                <button disabled className="btn-primary" style={{ backgroundColor: 'transparent', color: 'var(--text-muted)' }}>
                  Task Assigned
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
