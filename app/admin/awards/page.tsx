'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Award {
  id: number;
  title: string;
  org: string;
  description?: string;
  order?: number;
}

const emptyForm = { title: '', org: '', description: '', order: '' };

export default function AwardsAdminPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAwards();
  }, []);

  async function fetchAwards() {
    try {
      const res = await fetch('/api/admin/awards');
      setAwards(await res.json());
    } catch (error) {
      console.error('Failed to fetch awards:', error);
    }
  }

  function startEdit(award: Award) {
    setEditingId(award.id);
    setForm({
      title: award.title,
      org: award.org,
      description: award.description || '',
      order: award.order?.toString() || '',
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
      title: form.title,
      org: form.org,
      description: form.description || undefined,
      order: form.order ? parseInt(form.order) : undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/awards/${editingId}` : '/api/admin/awards',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingId ? 'Award updated!' : 'Award created!');
        resetForm();
        fetchAwards();
      } else {
        setMessage('Failed to save award');
      }
    } catch (error) {
      setMessage('Error saving award');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this award?')) return;

    try {
      const res = await fetch(`/api/admin/awards/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAwards(awards.filter((a) => a.id !== id));
        setMessage('Award deleted');
      }
    } catch (error) {
      setMessage('Error deleting award');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Awards & Recognition</h1>

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
          {awards.map((award) => (
            <div key={award.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{award.title}</p>
                <p className="text-body-sm text-mid">{award.org}</p>
                {award.description && <p className="text-body-sm text-mid">{award.description}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(award)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(award.id)}
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
          {editingId ? 'Edit Award' : 'Add Award'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Organization</label>
            <input
              type="text"
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Description (Optional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={3}
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
              disabled={saving || !form.title || !form.org}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Award'}
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
