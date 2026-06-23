'use client';
import React, { useState } from 'react';
import { Activity, Users, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

export default function DashboardView() {
  const [toast, setToast] = useState('');

  const triggerAction = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent-green)', color: '#fff', padding: '12px 24px', borderRadius: '30px',
          display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100, fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
        }}>
          <CheckCircle size={20} /> {toast}
        </div>
      )}

      <h2 className="view-title"><Activity color="var(--accent-blue)" /> Disaster Response Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--accent-red)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Active SOS Beacons</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle color="var(--accent-red)" size={28} />
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>142</span>
          </div>
        </div>
        
        <div className="card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>People Evacuated</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users color="var(--accent-green)" size={28} />
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>3,450</span>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Active Shelters</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck color="var(--accent-blue)" size={28} />
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>24</span>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--accent-yellow)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Volunteer Taskforce</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users color="var(--accent-yellow)" size={28} />
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>850</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        <div className="card" style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px' }}>AI Incident Timeline</h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className="list-item danger">
              <strong>[15 mins ago]</strong> Multiple SOS signals detected near Hindmata Junction. Probable severe waterlogging.
            </div>
            <div className="list-item">
              <strong>[1 hr ago]</strong> BMC Relief Camp at Dadar reached 80% capacity. Diverting evacuees to Parel Hub.
            </div>
            <div className="list-item safe">
              <strong>[2 hrs ago]</strong> Medical convoy successfully reached KEM Hospital.
            </div>
            <div className="list-item danger">
              <strong>[3 hrs ago]</strong> IMD issues RED ALERT for Mumbai suburbs. High tide expected at 14:00.
            </div>
          </div>
        </div>

        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px' }}>Critical Action Items</h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn-primary" style={{ backgroundColor: 'var(--accent-red)' }} onClick={() => triggerAction('NDRF Rescue Team dispatched to Sector 4!')}>
              Dispatch Rescue to Sector 4
            </button>
            <button className="btn-primary" style={{ backgroundColor: 'var(--accent-yellow)', color: '#000' }} onClick={() => triggerAction('Supply request sent to central warehouse.')}>
              Request More Medical Supplies
            </button>
            <button className="btn-primary" onClick={() => triggerAction('Evacuation SMS broadcasted to 45,000 residents.')}>
              Broadcast Evacuation Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
