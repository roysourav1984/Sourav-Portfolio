'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Initiative {
  id: number;
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  tags: string[];
  context: string;
  approach: string;
  technologies: string[];
  outcome: string;
  order?: number;
}

const emptyForm = {
  slug: '',
  title: '',
  oneLiner: '',
  year: '',
  tags: '',
  context: '',
  approach: '',
  technologies: '',
  outcome: '',
  order: '',
};

export default function InitiativesAdminPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInitiatives();
  }, []);

  async function fetchInitiatives() {
    try {
      const res = await fetch('/api/admin/initiatives');
      const data = await res.json();
      setInitiatives(data);
    } catch (error) {
      console.error('Failed to fetch initiatives:', error);
    }
  }

  function startEdit(item: Initiative) {
    setEditingId(item.id);
    setForm({
      slug: item.slug,
      title: item.title,
      oneLiner: item.oneLiner,
      year: item.year,
      tags: (item.tags || []).join(', '),
      context: item.context,
      approach: item.approach,
      technologies: (item.technologies || []).join(', '),
      outcome: item.outcome,
      order: item.order?.toString() || '',
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
      slug: form.slug,
      title: form.title,
      oneLiner: form.oneLiner,
      year: form.year,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      context: form.context,
      approach: form.approach,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      outcome: form.outcome,
      order: form.order ? parseInt(form.order) : undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/initiatives/${editingId}` : '/api/admin/initiatives',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingId ? 'Initiative updated!' : 'Initiative created!');
        resetForm();
        fetchInitiatives();
      } else {
        setMessage('Failed to save initiative');
      }
    } catch (error) {
      setMessage('Error saving initiative');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this initiative?')) return;

    try {
      const res = await fetch(`/api/admin/initiatives/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInitiatives(initiatives.filter((i) => i.id !== id));
        setMessage('Initiative deleted');
      }
    } catch (error) {
      setMessage('Error deleting initiative');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Featured Initiatives</h1>

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
          {initiatives.map((item) => (
            <div key={item.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{item.title} ({item.year})</p>
                <p className="text-body-sm text-mid">{item.oneLiner}</p>
                <p className="text-body-sm text-accent">{(item.tags || []).join(', ')}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
          {editingId ? 'Edit Initiative' : 'Add Initiative'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. genai-platform-rollout"
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

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
            <label className="block text-body-md font-medium text-ink mb-2">One-liner</label>
            <input
              type="text"
              value={form.oneLiner}
              onChange={(e) => setForm({ ...form, oneLiner: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Year / Duration</label>
            <input
              type="text"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Context</label>
            <textarea
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Approach</label>
            <textarea
              value={form.approach}
              onChange={(e) => setForm({ ...form, approach: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Outcome</label>
            <textarea
              value={form.outcome}
              onChange={(e) => setForm({ ...form, outcome: e.target.value })}
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
              disabled={saving || !form.slug || !form.title || !form.oneLiner || !form.year}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Initiative'}
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
