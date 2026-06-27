'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface SkillCategory {
  id: number;
  categoryName: string;
  skills: string[];
  order?: number;
}

interface FunctionalSkill {
  id: number;
  label: string;
  order?: number;
}

const emptyCategoryForm = { categoryName: '', skills: '', order: '' };
const emptyFunctionalForm = { label: '', order: '' };

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [functionalSkills, setFunctionalSkills] = useState<FunctionalSkill[]>([]);

  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const [functionalForm, setFunctionalForm] = useState(emptyFunctionalForm);
  const [editingFunctionalId, setEditingFunctionalId] = useState<number | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchFunctionalSkills();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/admin/skills/categories');
      setCategories(await res.json());
    } catch (_error) {
      console.error('Failed to fetch skill categories:', _error);
    }
  }

  async function fetchFunctionalSkills() {
    try {
      const res = await fetch('/api/admin/skills/functional');
      setFunctionalSkills(await res.json());
    } catch (_error) {
      console.error('Failed to fetch functional skills:', _error);
    }
  }

  function startEditCategory(cat: SkillCategory) {
    setEditingCategoryId(cat.id);
    setCategoryForm({
      categoryName: cat.categoryName,
      skills: (cat.skills || []).join(', '),
      order: cat.order?.toString() || '',
    });
  }

  function resetCategoryForm() {
    setEditingCategoryId(null);
    setCategoryForm(emptyCategoryForm);
  }

  async function handleSaveCategory() {
    setSaving(true);
    setMessage('');

    const payload = {
      categoryName: categoryForm.categoryName,
      skills: categoryForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      order: categoryForm.order ? parseInt(categoryForm.order) : undefined,
    };

    try {
      const res = await fetch(
        editingCategoryId ? `/api/admin/skills/categories/${editingCategoryId}` : '/api/admin/skills/categories',
        {
          method: editingCategoryId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingCategoryId ? 'Category updated!' : 'Category created!');
        resetCategoryForm();
        fetchCategories();
      } else {
        setMessage('Failed to save category');
      }
    } catch {
      setMessage('Error saving category');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCategory(id: number) {
    if (!confirm('Delete this skill category?')) return;

    try {
      const res = await fetch(`/api/admin/skills/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
        setMessage('Category deleted');
      }
    } catch {
      setMessage('Error deleting category');
    }
  }

  function startEditFunctional(skill: FunctionalSkill) {
    setEditingFunctionalId(skill.id);
    setFunctionalForm({ label: skill.label, order: skill.order?.toString() || '' });
  }

  function resetFunctionalForm() {
    setEditingFunctionalId(null);
    setFunctionalForm(emptyFunctionalForm);
  }

  async function handleSaveFunctional() {
    setSaving(true);
    setMessage('');

    const payload = {
      label: functionalForm.label,
      order: functionalForm.order ? parseInt(functionalForm.order) : undefined,
    };

    try {
      const res = await fetch(
        editingFunctionalId ? `/api/admin/skills/functional/${editingFunctionalId}` : '/api/admin/skills/functional',
        {
          method: editingFunctionalId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setMessage(editingFunctionalId ? 'Skill updated!' : 'Skill created!');
        resetFunctionalForm();
        fetchFunctionalSkills();
      } else {
        setMessage('Failed to save skill');
      }
    } catch {
      setMessage('Error saving skill');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteFunctional(id: number) {
    if (!confirm('Delete this skill?')) return;

    try {
      const res = await fetch(`/api/admin/skills/functional/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFunctionalSkills(functionalSkills.filter((s) => s.id !== id));
        setMessage('Skill deleted');
      }
    } catch {
      setMessage('Error deleting skill');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Skills Matrix</h1>

        {message && (
          <div className={`p-4 mb-6 border rounded ${
            message.includes('Failed') || message.includes('Error')
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            {message}
          </div>
        )}

        <h2 className="text-heading-lg font-display text-ink mb-4">Technical Skill Categories</h2>

        <div className="space-y-4 mb-8">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 border border-rule flex justify-between items-start">
              <div>
                <p className="text-body-md font-medium text-ink">{cat.categoryName}</p>
                <p className="text-body-sm text-mid">{(cat.skills || []).join(', ')}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEditCategory(cat)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="px-3 py-1 text-accent border border-accent hover:bg-red-50 transition-colors text-body-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-heading-md font-display text-ink mb-4">
          {editingCategoryId ? 'Edit Category' : 'Add Category'}
        </h3>

        <div className="space-y-6 mb-12">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Category Name</label>
            <input
              type="text"
              value={categoryForm.categoryName}
              onChange={(e) => setCategoryForm({ ...categoryForm, categoryName: e.target.value })}
              placeholder="e.g. Cloud & Infrastructure"
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Skills (comma-separated)</label>
            <input
              type="text"
              value={categoryForm.skills}
              onChange={(e) => setCategoryForm({ ...categoryForm, skills: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Order (Optional)</label>
            <input
              type="number"
              value={categoryForm.order}
              onChange={(e) => setCategoryForm({ ...categoryForm, order: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveCategory}
              disabled={saving || !categoryForm.categoryName}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingCategoryId ? 'Update' : 'Add Category'}
            </button>
            {editingCategoryId && (
              <button
                onClick={resetCategoryForm}
                className="px-6 py-2 border border-rule text-ink hover:border-accent transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <hr className="my-12 border-rule" />

        <h2 className="text-heading-lg font-display text-ink mb-4">Functional Skills</h2>

        <div className="space-y-4 mb-8">
          {functionalSkills.map((skill) => (
            <div key={skill.id} className="p-4 border border-rule flex justify-between items-center">
              <p className="text-body-md text-ink">{skill.label}</p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEditFunctional(skill)}
                  className="px-3 py-1 text-ink border border-rule hover:border-accent transition-colors text-body-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFunctional(skill.id)}
                  className="px-3 py-1 text-accent border border-accent hover:bg-red-50 transition-colors text-body-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-heading-md font-display text-ink mb-4">
          {editingFunctionalId ? 'Edit Skill' : 'Add Functional Skill'}
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Label</label>
            <input
              type="text"
              value={functionalForm.label}
              onChange={(e) => setFunctionalForm({ ...functionalForm, label: e.target.value })}
              placeholder="e.g. Stakeholder Engagement"
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-body-md font-medium text-ink mb-2">Order (Optional)</label>
            <input
              type="number"
              value={functionalForm.order}
              onChange={(e) => setFunctionalForm({ ...functionalForm, order: e.target.value })}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveFunctional}
              disabled={saving || !functionalForm.label}
              className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingFunctionalId ? 'Update' : 'Add Skill'}
            </button>
            {editingFunctionalId && (
              <button
                onClick={resetFunctionalForm}
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
