'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  LayoutDashboard, Map, Bot, Navigation, 
  Package, Users, ClipboardList, AlertTriangle 
} from 'lucide-react';

// Import Views
import DashboardView from '../components/DashboardView';
import RegistryView from '../components/RegistryView';
import SupplyHubView from '../components/SupplyHubView';
import SheltersView from '../components/SheltersView';
import AgentView from '../components/AgentView';
import VolunteerTasksView from '../components/VolunteerTasksView';

const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState('registry'); // Default to Registry as per screenshot
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(null);
  const intervalRef = React.useRef(null);
  const timeoutRef = React.useRef(null);

  const handleSosTrigger = () => {
    if (sosCountdown !== null || sosActive) return; // Already triggering or active
    
    setSosCountdown(3);
    
    let count = 3;
    intervalRef.current = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setSosCountdown(count);
      } else {
        clearInterval(intervalRef.current);
        setSosCountdown(null);
        setSosActive(true);
        timeoutRef.current = setTimeout(() => setSosActive(false), 5000);
      }
    }, 1000);
  };

  const cancelSos = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSosCountdown(null);
    setSosActive(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'map': return <MapComponent />;
      case 'agent': return <AgentView />;
      case 'shelters': return <SheltersView />;
      case 'supply': return <SupplyHubView />;
      case 'registry': return <RegistryView />;
      case 'volunteer': return <VolunteerTasksView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="dashboard-layout" style={{ position: 'relative' }}>
      
      {/* Full Screen SOS Overlay */}
      {(sosCountdown !== null || sosActive) && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: sosActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          animation: sosActive ? 'pulse-red 1.5s infinite' : 'none',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px 80px',
            borderRadius: '20px',
            border: `4px solid ${sosActive ? 'var(--accent-red)' : 'var(--accent-yellow)'}`,
            textAlign: 'center',
            boxShadow: `0 0 50px ${sosActive ? 'rgba(239, 68, 68, 0.5)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <AlertTriangle size={80} color={sosActive ? 'var(--accent-red)' : 'var(--accent-yellow)'} style={{ margin: '0 auto 20px' }} />
            <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '10px' }}>
              {sosActive ? 'SOS TRANSMITTING' : 'TRIGGERING SOS'}
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {sosCountdown !== null ? `Broadcasting in ${sosCountdown}...` : 'Broadcasting location to nearby responders...'}
            </p>
            <button 
              onClick={cancelSos}
              className="btn-primary"
              style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', width: 'auto', padding: '10px 30px' }}>
              CANCEL SOS
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div style={{ background: 'var(--accent-red)', padding: '6px', borderRadius: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <h1>LifeBridge AI</h1>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className={`nav-btn ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
            <Map size={20} /> Live Disaster Map
          </button>
          <button className={`nav-btn ${activeTab === 'agent' ? 'active' : ''}`} onClick={() => setActiveTab('agent')}>
            <Bot size={20} /> LifeBridge AI Agent
          </button>
          <button className={`nav-btn ${activeTab === 'shelters' ? 'active' : ''}`} onClick={() => setActiveTab('shelters')}>
            <Navigation size={20} /> Shelters & Roads
          </button>
          <button className={`nav-btn ${activeTab === 'supply' ? 'active' : ''}`} onClick={() => setActiveTab('supply')}>
            <Package size={20} /> Supply Matching Hub
          </button>
          <button className={`nav-btn ${activeTab === 'registry' ? 'active' : ''}`} onClick={() => setActiveTab('registry')}>
            <Users size={20} /> Safety Registry
          </button>
          <button className={`nav-btn ${activeTab === 'volunteer' ? 'active' : ''}`} onClick={() => setActiveTab('volunteer')}>
            <ClipboardList size={20} /> Volunteer Tasks
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-trigger-sos" onClick={handleSosTrigger} disabled={sosCountdown !== null}>
            <AlertTriangle size={20} />
            {sosCountdown !== null 
              ? `TRIGGERING IN ${sosCountdown}...` 
              : sosActive 
                ? 'SOS TRANSMITTING...' 
                : 'TRIGGER SOS'}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-area">
        
        {/* Top Header matching screenshot */}
        <header className="top-header">
          <div className="header-status">
            <span className="badge" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>AGENT SYSTEM</span>
            <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>1.8m</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-yellow)' }}>☀️</span>
              <span>MUMBAI_FLOOD STATUS :</span>
              <strong>28°C</strong>
              <span style={{ color: 'var(--accent-yellow)' }}>| Severe Monsoon Downpour</span>
            </div>
          </div>

          <div className="header-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>DISASTER MODE</span>
              <select className="mode-select">
                <option>Mumbai Monsoon Flash Flood</option>
                <option>Cyclone Alert Level 4</option>
              </select>
            </div>
            
            <div className="toggle-wrap">
              <span>LOW BANDWIDTH</span>
              <div style={{ width: '36px', height: '20px', background: 'var(--border-color)', borderRadius: '10px', position: 'relative' }}>
                <div style={{ width: '16px', height: '16px', background: 'var(--text-secondary)', borderRadius: '50%', position: 'absolute', left: '2px', top: '2px' }}></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="content-container">
          {renderContent()}
        </div>

      </main>
    </div>
  );
}
