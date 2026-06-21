'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface HeroContent {
  name?: string;
  headline?: string;
  subtitle?: string;
  location?: string;
  summary?: string;
  portraitUrl?: string;
  portraitAlt?: string;
  stats?: Array<{ id: number; label: string; value: string }>;
}

interface StatForm {
  id?: number;
  label: string;
  value: string;
}

export default function HeroAdminPage() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [portraitAlt, setPortraitAlt] = useState('');
  const [stats, setStats] = useState<Array<{ id: number; label: string; value: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingStat, setEditingStat] = useState<StatForm | null>(null);
  const [statLabel, setStatLabel] = useState('');
  const [statValue, setStatValue] = useState('');

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    try {
      const res = await fetch('/api/admin/hero');
      const data = await res.json();
      if (data.headline) {
        setHero(data);
        setName(data.name || '');
        setHeadline(data.headline);
        setSubtitle(data.subtitle);
        setLocation(data.location);
        setSummary(data.summary || '');
        setPortraitUrl(data.portraitUrl || '');
        setPortraitAlt(data.portraitAlt || '');
        setStats(data.stats || []);
      }
    } catch (error) {
      console.error('Failed to fetch hero:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, headline, subtitle, location, summary, portraitUrl, portraitAlt }),
      });

      if (res.ok) {
        setMessage('Hero content saved successfully!');
        fetchHero();
      } else {
        setMessage('Failed to save hero content');
      }
    } catch (error) {
      setMessage('Error saving hero content');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteStat(id: number) {
    if (!confirm('Delete this stat?')) return;

    try {
      const res = await fetch(`/api/admin/hero/stats/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setStats(stats.filter((s) => s.id !== id));
        setMessage('Stat deleted');
      }
    } catch (error) {
      setMessage('Error deleting stat');
    }
  }

  function handleEditStat(stat: { id: number; label: string; value: string }) {
    setEditingStat(stat);
    setStatLabel(stat.label);
    setStatValue(stat.value);
  }

  function handleCancelEditStat() {
    setEditingStat(null);
    setStatLabel('');
    setStatValue('');
  }

  async function handleSaveStat() {
    if (!statLabel.trim() || !statValue.trim()) {
      setMessage('Label and value are required');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const url = editingStat
        ? `/api/admin/hero/stats/${editingStat.id}`
        : '/api/admin/hero/stats';

      const method = editingStat ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: statLabel, value: statValue }),
      });

      if (res.ok) {
        setMessage(editingStat ? 'Stat updated successfully!' : 'Stat added successfully!');
        setStatLabel('');
        setStatValue('');
        setEditingStat(null);
        fetchHero();
      } else {
        setMessage(`Failed to ${editingStat ? 'update' : 'add'} stat`);
      }
    } catch (error) {
      setMessage(`Error ${editingStat ? 'updating' : 'adding'} stat`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Edit Hero Section</h1>

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
            <label htmlFor="name" className="block text-body-md font-medium text-ink mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label htmlFor="headline" className="block text-body-md font-medium text-ink mb-2">
              Headline
            </label>
            <input
              id="headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="Enter headline"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-body-md font-medium text-ink mb-2">
              Subtitle / Current Role
            </label>
            <input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="Enter subtitle"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-body-md font-medium text-ink mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label htmlFor="summary" className="block text-body-md font-medium text-ink mb-2">
              Professional Summary
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent h-24 resize-none"
              placeholder="Enter professional summary paragraph"
            />
          </div>

          <div>
            <label htmlFor="portraitUrl" className="block text-body-md font-medium text-ink mb-2">
              Portrait Image URL
            </label>
            <input
              id="portraitUrl"
              type="url"
              value={portraitUrl}
              onChange={(e) => setPortraitUrl(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="https://example.com/portrait.jpg"
            />
            {portraitUrl && (
              <div className="mt-4 p-4 border border-rule">
                <p className="text-body-sm text-mid mb-2">Preview:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitUrl}
                  alt={portraitAlt || 'Portrait preview'}
                  className="w-32 h-32 object-cover border border-rule"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="portraitAlt" className="block text-body-md font-medium text-ink mb-2">
              Portrait Alt Text (for accessibility)
            </label>
            <input
              id="portraitAlt"
              type="text"
              value={portraitAlt}
              onChange={(e) => setPortraitAlt(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="e.g., Professional headshot portrait"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Hero'}
          </button>
        </div>

        <hr className="my-12 border-rule" />

        <div>
          <h2 className="text-heading-lg font-display text-ink mb-6">Hero Stats</h2>

          {/* Add/Edit Stat Form */}
          <div className="p-6 border border-rule bg-gray-50 mb-8">
            <h3 className="text-heading-sm font-display text-ink mb-4">
              {editingStat ? 'Edit Stat' : 'Add New Stat'}
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="stat-label" className="block text-body-md font-medium text-ink mb-2">
                  Label
                </label>
                <input
                  id="stat-label"
                  type="text"
                  value={statLabel}
                  onChange={(e) => setStatLabel(e.target.value)}
                  className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
                  placeholder="e.g., Years in Delivery Leadership"
                />
              </div>

              <div>
                <label htmlFor="stat-value" className="block text-body-md font-medium text-ink mb-2">
                  Value
                </label>
                <input
                  id="stat-value"
                  type="text"
                  value={statValue}
                  onChange={(e) => setStatValue(e.target.value)}
                  className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
                  placeholder="e.g., 20+"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveStat}
                  disabled={saving}
                  className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingStat ? 'Update Stat' : 'Add Stat'}
                </button>
                {editingStat && (
                  <button
                    onClick={handleCancelEditStat}
                    className="px-6 py-2 border border-rule text-ink font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats List */}
          <div className="space-y-3">
            <h3 className="text-heading-sm font-display text-ink mb-4">Current Stats</h3>
            {stats.length === 0 ? (
              <p className="text-body-md text-mid py-4">No stats yet. Add one above.</p>
            ) : (
              stats.map((stat) => (
                <div key={stat.id} className="p-4 border border-rule flex justify-between items-center">
                  <div>
                    <p className="text-body-md font-medium text-ink">{stat.value}</p>
                    <p className="text-body-sm text-mid">{stat.label}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditStat(stat)}
                      className="px-3 py-1 text-accent border border-accent hover:bg-blue-50 transition-colors text-body-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStat(stat.id)}
                      className="px-3 py-1 text-accent border border-accent hover:bg-red-50 transition-colors text-body-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
