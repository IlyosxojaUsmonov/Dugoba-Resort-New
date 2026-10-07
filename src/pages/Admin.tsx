import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Package, Flag, Users, CheckCircle2, XCircle, Eye,
  TrendingUp, Clock, AlertTriangle, Lock,
} from 'lucide-react';
import { useApp } from '../context';
import { StatusBadge } from '../components/StatusBadge';
import { CATEGORY_LABELS, COMPLAINT_REASONS } from '../types';
import { cn } from '../utils';
import { formatRelativeTime } from '../utils';

type Tab = 'overview' | 'pending' | 'complaints';

export function Admin() {
  const { listings, complaints, approveListing, rejectListing, reviewComplaint } = useApp();
  const [tab, setTab] = useState<Tab>('overview');

  const pendingListings = listings.filter((l) => l.adminStatus === 'pending');
  const activeListings = listings.filter(
    (l) => l.adminStatus === 'approved' && l.status !== 'taken'
  );
  const pendingComplaints = complaints.filter((c) => c.status === 'pending');

  const uniqueUsers = new Set(listings.map((l) => l.giverId)).size;

  const STATS = [
    { icon: Package, label: 'Faol e\'lonlar', value: activeListings.length, color: 'text-primary-600 bg-primary-100' },
    { icon: Clock, label: 'Kutilayotgan e\'lonlar', value: pendingListings.length, color: 'text-accent-600 bg-accent-100' },
    { icon: Users, label: 'Foydalanuvchilar', value: uniqueUsers, color: 'text-blue-600 bg-blue-100' },
    { icon: Flag, label: 'Shikoyatlar', value: complaints.length, color: 'text-red-600 bg-red-100' },
  ];

  return (
    <div className="container-page py-8 lg:py-12">
      {/* Admin header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-white">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-neutral-800">
            Admin panel
          </h1>
          <p className="text-sm text-neutral-500">Moderatsiya va boshqaruv</p>
        </div>
      </div>

      {/* Demo notice */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent-200 bg-accent-50 p-3 text-xs text-accent-700">
        <Lock className="h-4 w-4 flex-shrink-0" />
        Bu sahifa demo maqsadida ochiq. Real loyihada autentifikatsiya bilan himoyalangan bo'ladi.
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-neutral-200">
        <AdminTab active={tab === 'overview'} onClick={() => setTab('overview')}>
          <TrendingUp className="h-4 w-4" />
          Umumiy ({STATS.length})
        </AdminTab>
        <AdminTab active={tab === 'pending'} onClick={() => setTab('pending')}>
          <Clock className="h-4 w-4" />
          Kutilayotgan ({pendingListings.length})
        </AdminTab>
        <AdminTab active={tab === 'complaints'} onClick={() => setTab('complaints')}>
          <Flag className="h-4 w-4" />
          Shikoyatlar ({pendingComplaints.length})
        </AdminTab>
      </div>

      <div className="mt-6">
        {/* Overview */}
        {tab === 'overview' && (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <div key={i} className="card p-5">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-3xl font-bold text-neutral-800">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Recent listings */}
              <div className="card p-5">
                <h2 className="font-semibold text-neutral-800">So\'nggi e\'lonlar</h2>
                <div className="mt-3 space-y-2">
                  {listings.slice(0, 5).map((l) => (
                    <div key={l.id} className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2 last:border-0">
                      <Link to={`/listing/${l.id}`} className="flex-1 truncate text-sm font-medium text-neutral-700 hover:text-primary-700">
                        {l.title}
                      </Link>
                      <StatusBadge status={l.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent complaints */}
              <div className="card p-5">
                <h2 className="font-semibold text-neutral-800">So\'nggi shikoyatlar</h2>
                <div className="mt-3 space-y-2">
                  {complaints.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2 last:border-0">
                      <span className="flex-1 truncate text-sm text-neutral-700">
                        {c.listingTitle}
                      </span>
                      <span className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        c.status === 'pending' ? 'bg-accent-100 text-accent-700' : 'bg-neutral-100 text-neutral-500'
                      )}>
                        {c.status === 'pending' ? 'Yangi' : 'Ko\'rilgan'}
                      </span>
                    </div>
                  ))}
                  {complaints.length === 0 && (
                    <p className="text-sm text-neutral-400">Shikoyatlar yo'q</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending listings */}
        {tab === 'pending' && (
          <div>
            {pendingListings.length === 0 ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary-500" />
                <h2 className="mt-3 font-semibold text-neutral-800">Kutilayotgan e\'lonlar yo\'q</h2>
                <p className="mt-1 text-sm text-neutral-500">Hammasi ko\'rib chiqilgan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingListings.map((l) => (
                  <div key={l.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <img src={l.images[0]} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-800">{l.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{l.description}</p>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-400">
                        <span>{CATEGORY_LABELS[l.category]}</span>
                        <span>{l.district}</span>
                        <span>{formatRelativeTime(l.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/listing/${l.id}`} className="btn-ghost text-sm">
                        <Eye className="h-4 w-4" />
                        Ko'rish
                      </Link>
                      <button
                        onClick={() => approveListing(l.id)}
                        className="btn-primary text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Tasdiqlash
                      </button>
                      <button
                        onClick={() => rejectListing(l.id)}
                        className="btn-danger text-sm"
                      >
                        <XCircle className="h-4 w-4" />
                        Rad etish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Complaints */}
        {tab === 'complaints' && (
          <div>
            {complaints.length === 0 ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <Flag className="h-12 w-12 text-neutral-300" />
                <h2 className="mt-3 font-semibold text-neutral-800">Shikoyatlar yo\'q</h2>
              </div>
            ) : (
              <div className="space-y-3">
                {complaints.map((c) => {
                  const reasonLabel = COMPLAINT_REASONS.find((r) => r.value === c.reason)?.label;
                  return (
                    <div key={c.id} className="card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-accent-600" />
                            <Link
                              to={`/listing/${c.listingId}`}
                              className="font-semibold text-neutral-800 hover:text-primary-700"
                            >
                              {c.listingTitle}
                            </Link>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-400">
                            <span className="rounded-full bg-accent-100 px-2 py-0.5 font-medium text-accent-700">
                              {reasonLabel}
                            </span>
                            <span>{c.reporterName}</span>
                            <span>{formatRelativeTime(c.createdAt)}</span>
                          </div>
                          <p className="mt-2 text-sm text-neutral-600">{c.description}</p>
                        </div>
                        <span className={cn(
                          'flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                          c.status === 'pending' ? 'bg-accent-100 text-accent-700' : 'bg-primary-100 text-primary-700'
                        )}>
                          {c.status === 'pending' ? 'Yangi' : 'Ko\'rilgan'}
                        </span>
                      </div>
                      {c.status === 'pending' && (
                        <div className="mt-3 flex justify-end border-t border-neutral-100 pt-3">
                          <button
                            onClick={() => reviewComplaint(c.id)}
                            className="btn-outline text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Ko\'rib chiqildi
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
        active
          ? 'border-primary-600 text-primary-700'
          : 'border-transparent text-neutral-500 hover:text-neutral-700'
      )}
    >
      {children}
    </button>
  );
}
