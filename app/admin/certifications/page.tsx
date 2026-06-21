'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year?: string;
  order?: number;
}

const emptyForm = { name: '', issuer: '', year: '', order: '' };

export default function CertificationsAdminPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCerts();
  }, []);

  async function fetchCerts() {
    try {
      const res = await fetch('/api/admin/certifications');
      setCerts(await res.json());
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    }
  }

  function startEdit(cert: Certification) {
    setEditingId(cert.id);
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      year: cert.year || '',
      order: cert.order?.toString() || '',
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');

    const payload = {
      name: form.name,
      issuer: form.issuer,
      year: form.year || undefined,
      order: form.order ? parseInt(form.order) : undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/certifications/${editingId}` : '/api/admin/certifications',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingId ? 'Certification updated!' : 'Certification created!');
        resetForm();
        fetchCerts();
      } else {
        setMessage('Failed to save certification');
      }
    } catch (error) {
      setMessage('Error saving certification');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this certification?')) return;

    try {
      const res = await fetch(`/api/admin/certifications/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCerts(certs.filter((c) => c.id !== id));
        setMessage('Certification deleted');
      }
    } catch (error) {
      setMessage('Error deleting certification');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Certifications</h1>

        {message && (
          <div className={`p-4 mb-6 border rounded ${
            message.includes('Failed') || message.includes('Error')
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4 mb-12">
          {certs.map((cert) => (
            <div key={cert.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{cert.name}</p>
                <p className="text-body-sm text-mid">{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(cert)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="px-3 py-1 text-accent border border-accent hover:bg-red-50 transition-colors text-body-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-12 border-rule" />

        <h2 className="text-heading-lg font-display text-ink mb-4">
          {editingId ? 'Edit Certification' : 'Add Certification'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Issuer</label>
            <input
              type="text"
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Year (Optional)</label>
            <input
              type="text"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Order (Optional)</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.issuer}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Certification'}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-rule text-ink hover:border-accent transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
