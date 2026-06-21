'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface ExperienceRole {
  id: number;
  slug: string;
  org: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  responsibilities: string[];
  order?: number;
}

const emptyForm = {
  slug: '',
  org: '',
  title: '',
  startDate: '',
  endDate: '',
  summary: '',
  responsibilities: '',
  order: '',
};

export default function ExperienceAdminPage() {
  const [roles, setRoles] = useState<ExperienceRole[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    try {
      const res = await fetch('/api/admin/experience');
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch experience roles:', error);
    }
  }

  function startEdit(role: ExperienceRole) {
    setEditingId(role.id);
    setForm({
      slug: role.slug,
      org: role.org,
      title: role.title,
      startDate: role.startDate,
      endDate: role.endDate === 'Present' ? '' : role.endDate,
      summary: role.summary,
      responsibilities: (role.responsibilities || []).join('\n'),
      order: role.order?.toString() || '',
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
      org: form.org,
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate || 'Present',
      summary: form.summary,
      responsibilities: form.responsibilities.split('\n').map((r) => r.trim()).filter(Boolean),
      order: form.order ? parseInt(form.order) : undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/experience/${editingId}` : '/api/admin/experience',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingId ? 'Role updated!' : 'Role created!');
        resetForm();
        fetchRoles();
      } else {
        setMessage('Failed to save role');
      }
    } catch (error) {
      setMessage('Error saving role');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this role?')) return;

    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRoles(roles.filter((r) => r.id !== id));
        setMessage('Role deleted');
      }
    } catch (error) {
      setMessage('Error deleting role');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Experience Timeline</h1>

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
          {roles.map((role) => (
            <div key={role.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{role.title} — {role.org}</p>
                <p className="text-body-sm text-mid">{role.startDate} – {role.endDate}</p>
                <p className="text-body-sm text-mid">{role.summary}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(role)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
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
          {editingId ? 'Edit Role' : 'Add Role'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. senior-delivery-manager-acme"
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
            <label className="block text-body-md font-medium text-ink mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-body-md font-medium text-ink mb-2">Start Date</label>
              <input
                type="text"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                placeholder="e.g. Jan 2020"
                className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-body-md font-medium text-ink mb-2">End Date</label>
              <input
                type="text"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                placeholder="Leave blank for Present"
                className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">
              Responsibilities (one per line)
            </label>
            <textarea
              value={form.responsibilities}
              onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={6}
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
              disabled={saving || !form.slug || !form.org || !form.title || !form.startDate}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Role'}
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
