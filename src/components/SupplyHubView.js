'use client';
import React, { useState } from 'react';
import { Package, ArrowRightLeft, PlusCircle, CheckCircle } from 'lucide-react';

export default function SupplyHubView() {
  const [requests, setRequests] = useState([
    { id: 1, item: 'Medical First Aid Kits', location: 'Dadar Relief Camp', priority: 'HIGH' },
    { id: 2, item: 'Drinking Water (100L)', location: 'Hindmata Volunteer Hub', priority: 'HIGH' },
    { id: 3, item: 'Blankets (50)', location: 'Parel School Shelter', priority: 'MEDIUM' },
  ]);

  const [offers, setOffers] = useState([
    { id: 1, item: 'Cooked Meals (200)', from: 'Andheri Community Kitchen', status: 'AVAILABLE' },
    { id: 2, item: 'Rescue Boat & 2 Divers', from: 'Local Fishermen Assoc.', status: 'DEPLOYED' },
    { id: 3, item: 'Generator (5kVA)', from: 'Tech Park Admin', status: 'AVAILABLE' },
  ]);

  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRequestNew = () => {
    const item = prompt('What supply do you need?');
    if (item) {
      setRequests([{ id: Date.now(), item, location: 'Current Location', priority: 'HIGH' }, ...requests]);
      showToast('Supply request broadcasted to the network.');
    }
  };

  const handleOfferNew = () => {
    const item = prompt('What supply are you offering?');
    if (item) {
      setOffers([{ id: Date.now(), item, from: 'You', status: 'AVAILABLE' }, ...offers]);
      showToast('Offer listed. Waiting for allocation request.');
    }
  };

  const handleFulfill = (id) => {
    setRequests(requests.filter(r => r.id !== id));
    showToast('Thank you! Coordinator notified of your fulfillment.');
  };

  const handleAllocation = (id) => {
    setOffers(offers.map(o => o.id === id ? { ...o, status: 'ALLOCATED' } : o));
    showToast('Allocation requested. Wait for approval.');
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

      <h2 className="view-title"><ArrowRightLeft color="var(--accent-blue)" /> Supply Matching Hub</h2>
      
      <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
        
        {/* Urgent Requests */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--accent-red)' }}>Urgent Needs</h3>
            <button onClick={handleRequestNew} style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
              <PlusCircle size={16}/> Request Supply
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {requests.map(req => (
              <div key={req.id} className="list-item danger">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{req.item}</strong>
                  <span className="tag danger">{req.priority} PRIORITY</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>Dropoff: {req.location}</div>
                <button onClick={() => handleFulfill(req.id)} className="btn-primary" style={{ marginTop: '12px', padding: '6px' }}>I Can Fulfill This</button>
              </div>
            ))}
          </div>
        </div>

        {/* Available Offers */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--accent-green)' }}>Available Resources</h3>
            <button onClick={handleOfferNew} style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
              <PlusCircle size={16}/> Offer Supply
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {offers.map(offer => (
              <div key={offer.id} className={`list-item ${offer.status === 'AVAILABLE' ? 'safe' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{offer.item}</strong>
                  <span className={`tag ${offer.status === 'AVAILABLE' ? 'safe' : ''}`}>{offer.status}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>From: {offer.from}</div>
                {offer.status === 'AVAILABLE' ? (
                  <button onClick={() => handleAllocation(offer.id)} className="btn-primary" style={{ marginTop: '12px', padding: '6px', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}>Request Allocation</button>
                ) : (
                  <button disabled className="btn-primary" style={{ marginTop: '12px', padding: '6px', backgroundColor: 'transparent', color: 'var(--text-muted)' }}>Unavailable</button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
