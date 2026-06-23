'use client';
import React from 'react';
import { Home, Navigation, Battery, HeartPulse } from 'lucide-react';

export default function SheltersView() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="view-title"><Home color="var(--accent-blue)" /> Shelters & Safe Roads</h2>
      
      <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
        
        {/* Shelters List */}
        <div className="card" style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '20px' }}>Active Relief Shelters</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '12px' }}>
            
            <div className="list-item safe">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Home size={18} color="var(--accent-green)"/> BMC Relief Camp, Dadar
                  </strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Dadar West, near Plaza Cinema</p>
                  <p style={{ color: 'var(--text-primary)', marginTop: '4px', fontSize: '0.9rem' }}>📞 Contact: +91 98765 43210 (Mr. Sharma)</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <span className="tag" style={{ background: 'var(--bg-input)' }}>Food Available</span>
                    <span className="tag" style={{ background: 'var(--bg-input)' }}>Medical Camp</span>
                    <span className="tag" style={{ background: 'var(--bg-input)' }}>Pet Friendly</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Capacity: 80%</div>
                  <div style={{ height: '8px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '80%', height: '100%', background: 'var(--accent-yellow)' }}></div>
                  </div>
                  <div style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-primary)' }}>400 / 500 People</div>
                </div>
              </div>
            </div>

            <div className="list-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Home size={18} color="var(--accent-blue)"/> St. Xavier's High School
                  </strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Vile Parle West</p>
                  <p style={{ color: 'var(--text-primary)', marginTop: '4px', fontSize: '0.9rem' }}>📞 Contact: +91 91234 56789 (Fr. D'Souza)</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <span className="tag" style={{ background: 'var(--bg-input)' }}>Charging Station</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Capacity: 30%</div>
                  <div style={{ height: '8px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '30%', height: '100%', background: 'var(--accent-green)' }}></div>
                  </div>
                  <div style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-primary)' }}>60 / 200 People</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Road Status */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--accent-red)' }}>Road Closures</h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className="list-item danger">
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Navigation size={16}/> Hindmata Junction</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>3ft waterlogging. Traffic diverted to Elphinstone bridge.</p>
            </div>
            <div className="list-item danger">
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Navigation size={16}/> Milan Subway</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Closed indefinitely due to flash flood.</p>
            </div>
            <div className="list-item safe" style={{ marginTop: '24px' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Navigation size={16}/> Sea Link</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Open for emergency vehicles only.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
