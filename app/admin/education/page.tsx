'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface EducationEntry {
  id: number;
  institution: string;
  degree: string;
  year: string;
  order?: number;
}

const emptyForm = { institution: '', degree: '', year: '', order: '' };

export default function EducationAdminPage() {
  const [entries, setEntries] = useState<EducationEntry[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const res = await fetch('/api/admin/education');
      setEntries(await res.json());
    } catch (_error) {
      console.error('Failed to fetch education entries:', _error);
    }
  }

  function startEdit(entry: EducationEntry) {
    setEditingId(entry.id);
    setForm({
      institution: entry.institution,
      degree: entry.degree,
      year: entry.year,
      order: entry.order?.toString() || '',
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
      institution: form.institution,
      degree: form.degree,
      year: form.year,
      order: form.order ? parseInt(form.order) : undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/education/${editingId}` : '/api/admin/education',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingId ? 'Entry updated!' : 'Entry created!');
        resetForm();
        fetchEntries();
      } else {
        setMessage('Failed to save entry');
      }
    } catch {
      setMessage('Error saving entry');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this education entry?')) return;

    try {
      const res = await fetch(`/api/admin/education/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries(entries.filter((e) => e.id !== id));
        setMessage('Entry deleted');
      }
    } catch {
      setMessage('Error deleting entry');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Education</h1>

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
          {entries.map((entry) => (
            <div key={entry.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{entry.degree}</p>
                <p className="text-body-sm text-mid">{entry.institution} · {entry.year}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(entry)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
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
          {editingId ? 'Edit Entry' : 'Add Entry'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Institution</label>
            <input
              type="text"
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Degree</label>
            <input
              type="text"
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Year</label>
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
              disabled={saving || !form.institution || !form.degree || !form.year}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Entry'}
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
