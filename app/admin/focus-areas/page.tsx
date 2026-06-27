'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface FocusArea {
  id: number;
  title: string;
  description: string;
  stat?: string;
  order?: number;
}

const emptyForm = { title: '', description: '', stat: '', order: '' };

export default function FocusAreasAdminPage() {
  const [areas, setAreas] = useState<FocusArea[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAreas();
  }, []);

  async function fetchAreas() {
    try {
      const res = await fetch('/api/admin/focus-areas');
      const data = await res.json();
      setAreas(data);
    } catch (_error) {
      console.error('Failed to fetch focus areas:', _error);
    }
  }

  function startEdit(area: FocusArea) {
    setEditingId(area.id);
    setForm({
      title: area.title,
      description: area.description,
      stat: area.stat || '',
      order: area.order?.toString() || '',
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
      description: form.description,
      stat: form.stat || undefined,
      order: form.order ? parseInt(form.order) : undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/focus-areas/${editingId}` : '/api/admin/focus-areas',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingId ? 'Focus area updated!' : 'Focus area created!');
        resetForm();
        fetchAreas();
      } else {
        setMessage('Failed to save focus area');
      }
    } catch {
      setMessage('Error saving focus area');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this focus area?')) return;

    try {
      const res = await fetch(`/api/admin/focus-areas/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAreas(areas.filter((a) => a.id !== id));
        setMessage('Focus area deleted');
      }
    } catch {
      setMessage('Error deleting focus area');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Focus Areas</h1>

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
          {areas.map((area) => (
            <div key={area.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{area.title}</p>
                <p className="text-body-sm text-mid">{area.description}</p>
                {area.stat && <p className="text-body-sm text-accent">{area.stat}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(area)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(area.id)}
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
          {editingId ? 'Edit Focus Area' : 'Add Focus Area'}
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
            <label className="block text-body-md font-medium text-ink mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Stat (Optional)</label>
            <input
              type="text"
              value={form.stat}
              onChange={(e) => setForm({ ...form, stat: e.target.value })}
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
              disabled={saving || !form.title || !form.description}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Focus Area'}
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
