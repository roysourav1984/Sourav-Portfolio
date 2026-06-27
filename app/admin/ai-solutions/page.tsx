'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  order?: number;
}

const emptyItem = { title: '', description: '', order: '' };

export default function AiSolutionsAdminPage() {
  const [section, setSection] = useState({ title: '', intro: '' });
  const [sectionSaving, setSectionSaving] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(emptyItem);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/ai-solutions')
      .then((r) => r.json())
      .then((d) => {
        if (d.title) setSection({ title: d.title, intro: d.intro ?? '' });
        if (d.items) setItems(d.items);
      })
      .catch(console.error);
  }, []);

  async function saveSection() {
    setSectionSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/ai-solutions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });
      setMessage(res.ok ? 'Section updated!' : 'Failed to update section');
    } catch {
      setMessage('Error saving section');
    } finally {
      setSectionSaving(false);
    }
  }

  async function fetchItems() {
    const res = await fetch('/api/admin/ai-solutions/items');
    setItems(await res.json());
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, order: item.order?.toString() ?? '' });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyItem);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const payload = { title: form.title, description: form.description, order: form.order ? parseInt(form.order) : undefined };
    try {
      const res = await fetch(
        editingId ? `/api/admin/ai-solutions/items/${editingId}` : '/api/admin/ai-solutions/items',
        { method: editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
      );
      if (res.ok) {
        setMessage(editingId ? 'Item updated!' : 'Item created!');
        resetForm();
        fetchItems();
      } else {
        setMessage('Failed to save item');
      }
    } catch {
      setMessage('Error saving item');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/ai-solutions/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
        setMessage('Item deleted');
      }
    } catch {
      setMessage('Error deleting item');
    }
  }

  const isError = message.includes('Failed') || message.includes('Error');

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">AI Solutions</h1>

        {message && (
          <div className={`p-4 mb-6 border rounded ${isError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            {message}
          </div>
        )}

        {/* Section header */}
        <div className="space-y-4 mb-12">
          <h2 className="text-heading-lg font-display text-ink">Section Header</h2>
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Title</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Intro</label>
            <textarea
              value={section.intro}
              onChange={(e) => setSection({ ...section, intro: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              rows={3}
            />
          </div>
          <button
            onClick={saveSection}
            disabled={sectionSaving || !section.title || !section.intro}
            className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
          >
            {sectionSaving ? 'Saving...' : 'Save Section'}
          </button>
        </div>

        <hr className="my-12 border-rule" />

        {/* Items list */}
        <h2 className="text-heading-lg font-display text-ink mb-6">Solution Items</h2>
        <div className="space-y-4 mb-12">
          {items.map((item) => (
            <div key={item.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{item.title}</p>
                <p className="text-body-sm text-mid">{item.description}</p>
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
          {editingId ? 'Edit Item' : 'Add Item'}
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
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Item'}
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
