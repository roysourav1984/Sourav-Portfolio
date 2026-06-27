'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

export default function SummaryAdminPage() {
  const [paragraphs, setParagraphs] = useState<string[]>(['']);
  const [pullQuote, setPullQuote] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function fetchSummary() {
    try {
      const res = await fetch('/api/admin/summary');
      const data = await res.json();
      if (data.paragraphs) {
        setParagraphs(data.paragraphs);
        setPullQuote(data.pullQuote || '');
      }
    } catch (_error) {
      console.error('Failed to fetch summary:', _error);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/summary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphs: paragraphs.filter((p) => p.trim()),
          pullQuote,
        }),
      });

      if (res.ok) {
        setMessage('Summary saved successfully!');
      } else {
        setMessage('Failed to save summary');
      }
    } catch {
      setMessage('Error saving summary');
    } finally {
      setSaving(false);
    }
  }

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-display-lg font-display text-ink mb-8">Edit Summary</h1>

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
            <h2 className="text-heading-md font-display text-ink mb-4">Paragraphs</h2>
            <div className="space-y-3">
              {paragraphs.map((para, idx) => (
                <textarea
                  key={idx}
                  value={para}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
                  placeholder={`Paragraph ${idx + 1}`}
                  rows={4}
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="pullQuote" className="block text-body-md font-medium text-ink mb-2">
              Pull Quote (Optional)
            </label>
            <textarea
              id="pullQuote"
              value={pullQuote}
              onChange={(e) => setPullQuote(e.target.value)}
              className="w-full px-4 py-2 border border-rule bg-paper text-ink focus:outline-none focus:border-accent"
              placeholder="A highlighted quote from your summary"
              rows={3}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-accent text-paper font-medium hover:bg-dark transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Summary'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
