'use client';
import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';

export default function RegistryView() {
  const [registry, setRegistry] = useState([
    { id: 1, name: 'EMERGENCY BEACON USER', status: 'NEEDS ASSISTANCE', notes: 'Beacon active at [19.0760, 72.8777]', time: 'Just Now' },
    { id: 2, name: 'raj', status: 'NEEDS ASSISTANCE', notes: 'No additional status notes provided.', time: 'Just Now' },
    { id: 3, name: 'asaa', status: 'SAFE (AT SHELTER)', notes: 'aaaa', time: 'Just Now' },
    { id: 4, name: 'Priya Sharma', status: 'SAFE (AT SHELTER)', notes: 'With family, safe at Dadar Relief Hall', time: '5 mins ago' },
  ]);

  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState('Needs Medical/Supply Assistance ⚠️');
  const [newNotes, setNewNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const mappedStatus = newStatus.includes('Needs') ? 'NEEDS ASSISTANCE' : 'SAFE (AT SHELTER)';
    
    setRegistry([{
      id: Date.now(),
      name: newName,
      status: mappedStatus,
      notes: newNotes || 'No additional status notes provided.',
      time: 'Just Now'
    }, ...registry]);

    setNewName('');
    setNewNotes('');
  };

  const filteredRegistry = registry.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="view-title"><Users color="var(--accent-green)" /> Safety Check-In & Family Finder</h2>
      
      <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Pane: Form */}
        <div className="card" style={{ flex: '0 0 350px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Check-In Safe</h3>
          
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="John Doe" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Status</label>
              <select 
                className="input-field"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option>Needs Medical/Supply Assistance ⚠️</option>
                <option>Safe at Home / Shelter 🟢</option>
                <option>Trapped / Needs Evacuation 🚨</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Current Location / Notes</label>
              <textarea 
                className="input-field" 
                rows="3" 
                placeholder="e.g. Evacuated to Civic Center, with family."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">Register Safety Status</button>
          </form>
        </div>

        {/* Right Pane: List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search for family members by name..." 
              style={{ paddingLeft: '40px', backgroundColor: 'var(--bg-card)', marginTop: 0 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Registered People</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
            {filteredRegistry.map(person => (
              <div key={person.id} className={`list-item ${person.status === 'NEEDS ASSISTANCE' ? 'danger' : 'safe'}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{person.name}</strong>
                  <span className={`tag ${person.status === 'NEEDS ASSISTANCE' ? 'danger' : 'safe'}`}>
                    {person.status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>{person.notes}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                  Logged: {person.time}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
