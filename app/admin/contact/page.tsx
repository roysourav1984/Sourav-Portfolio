'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

export default function ContactAdminPage() {
  const [email, setEmail] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContact();
  }, []);

  async function fetchContact() {
    try {
      const res = await fetch('/api/admin/contact');
      const data = await res.json();
      if (data.email) {
        setEmail(data.email);
        setLinkedIn(data.linkedIn || '');
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, linkedIn }),
      });

      if (res.ok) {
        setMessage('Contact info saved successfully!');
      } else {
        setMessage('Failed to save contact info');
      }
    } catch (error) {
      setMessage('Error saving contact info');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Contact Information</h1>

        {message && (
          <div className={`p-4 mb-6 border rounded ${
            message.includes('success')
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">LinkedIn URL</label>
            <input
              type="text"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !email || !linkedIn}
            className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Contact Info'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
