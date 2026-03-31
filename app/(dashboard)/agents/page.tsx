'use client';

import { UserSearch, Search, Filter, Download, Mail, Phone, MoreVertical, Briefcase, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const agents = [
  { id: 1, name: 'Global Talent Solutions', agentName: 'Robert Fox', specialization: 'Tech Recruitment', activeJobs: 12, rating: 4.8, status: 'Active', avatar: 'https://picsum.photos/seed/agent1/100/100' },
  { id: 2, name: 'Elite Staffing', agentName: 'Jane Cooper', specialization: 'Executive Search', activeJobs: 5, rating: 4.9, status: 'Active', avatar: 'https://picsum.photos/seed/agent2/100/100' },
  { id: 3, name: 'Nexus HR', agentName: 'Cody Fisher', specialization: 'General Staffing', activeJobs: 24, rating: 4.5, status: 'On Break', avatar: 'https://picsum.photos/seed/agent3/100/100' },
  { id: 4, name: 'Prime Hires', agentName: 'Esther Howard', specialization: 'Healthcare', activeJobs: 8, rating: 4.7, status: 'Active', avatar: 'https://picsum.photos/seed/agent4/100/100' },
];

export default function AgentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recruitment Agents</h2>
          <p className="text-slate-500 text-sm mt-1">Manage external agencies and independent recruiters.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20">
          <UserSearch className="w-4 h-4" />
          Add New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Briefcase className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Total Agencies</h3>
          <p className="text-2xl font-bold text-primary mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 className="text-emerald-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Active Agents</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-2">48</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <Star className="text-amber-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Avg. Rating</h3>
          <p className="text-2xl font-bold text-amber-600 mt-2">4.7</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
            <MapPin className="text-rose-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Regions</h3>
          <p className="text-2xl font-bold text-rose-600 mt-2">6</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents, agencies..."
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Agency & Agent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Active Jobs</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden relative">
                        <Image
                          src={agent.avatar}
                          alt={agent.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{agent.name}</p>
                        <p className="text-xs text-slate-500">{agent.agentName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{agent.specialization}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800">{agent.activeJobs}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-slate-800">{agent.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      agent.status === 'Active' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    )}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}