import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaUserPlus, FaPen, FaTrashAlt, 
  FaEnvelope, FaUserShield, FaUser, FaStar, 
  FaCheckCircle, FaExclamationCircle, FaLock 
} from 'react-icons/fa';
import { usersAPI } from '../services/usersAPI';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
    tier: 'Bronze',
    points: 0,
    status: 'Active'
  });

  const defaultUsers = [
    { id: "a1b2c3d4", name: "Nabila Syakieb", email: "nabila.syakieb@gmail.com", role: "member", tier: "VIP", points: 2450, status: "Active", created_at: "2026-01-12T10:00:00Z" },
    { id: "b2c3d4e5", name: "Aurelia Putri", email: "aurelia.p@yahoo.com", role: "member", tier: "Gold", points: 1200, status: "Active", created_at: "2026-02-18T14:30:00Z" },
    { id: "c3d4e5f6", name: "Clarissa Dewi", email: "clarissa.d@gmail.com", role: "member", tier: "Silver", points: 650, status: "Active", created_at: "2026-03-05T09:15:00Z" },
    { id: "d4e5f6g7", name: "Jessica Mila", email: "jessica.m@outlook.com", role: "member", tier: "Platinum", points: 3800, status: "Active", created_at: "2026-01-20T16:45:00Z" },
    { id: "e5f6g7h8", name: "Amanda Rawles", email: "amanda.r@gmail.com", role: "member", tier: "Bronze", points: 150, status: "Active", created_at: "2026-04-14T11:20:00Z" },
    { id: "f6g7h8i9", name: "Nayla Beauty", email: "admin@luneve.com", role: "admin", tier: "Platinum", points: 5000, status: "Active", created_at: "2026-01-01T08:00:00Z" },
  ];

  const [users, setUsers] = useState(defaultUsers);

  const fetchUsers = () => {
    setIsLoading(true);
    usersAPI.getAll().then(data => {
      if (data && data.length > 0) {
        setUsers(data);
      } else {
        setUsers(defaultUsers);
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Error fetching users from Supabase:", err);
      setUsers(defaultUsers);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'points' ? parseInt(value) || 0 : value 
    }));
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'member',
      tier: 'Bronze',
      points: 0,
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (u) => {
    setEditingId(u.id);
    setFormData({
      name: u.name || '',
      email: u.email || '',
      password: u.password || '',
      role: u.role || 'member',
      tier: u.tier || 'Bronze',
      points: u.points || 0,
      status: u.status || 'Active'
    });
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password || 'member123',
      role: formData.role,
      tier: formData.tier,
      points: parseInt(formData.points) || 0,
      status: formData.status
    };

    usersAPI.create(payload).then(() => {
      setIsAddModalOpen(false);
      fetchUsers();
    }).catch(err => {
      console.error("Error creating user in Supabase:", err);
      // Fallback update state
      const newUser = {
        ...payload,
        id: `usr-${Date.now().toString().slice(-6)}`,
        created_at: new Date().toISOString()
      };
      setUsers(prev => [newUser, ...prev]);
      setIsAddModalOpen(false);
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      tier: formData.tier,
      points: parseInt(formData.points) || 0,
      status: formData.status
    };
    if (formData.password) {
      payload.password = formData.password;
    }

    usersAPI.update(editingId, payload).then(() => {
      setIsEditModalOpen(false);
      fetchUsers();
    }).catch(err => {
      console.error("Error updating user in Supabase:", err);
      setUsers(prev => prev.map(u => u.id === editingId ? { ...u, ...payload } : u));
      setIsEditModalOpen(false);
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      usersAPI.delete(id).then(() => {
        fetchUsers();
      }).catch(err => {
        console.error("Error deleting user from Supabase:", err);
        setUsers(prev => prev.filter(u => u.id !== id));
      });
    }
  };

  // Filter logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || u.role === selectedRole;
    const matchesTier = selectedTier === 'All' || u.tier === selectedTier;
    return matchesSearch && matchesRole && matchesTier;
  });

  // Calculate quick stats
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalPlatinumVip = users.filter(u => u.tier === 'Platinum' || u.tier === 'VIP').length;

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans w-full p-6 md:p-10 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-8 w-full">
        
        {/* HEADER */}
        <div className="px-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              User <span className="text-pink-500">Accounts</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Manage system administrators, members, and customer privileges via Supabase.
            </p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20 flex items-center gap-2"
          >
            <FaUserPlus size={13} /> Add New User
          </button>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Registered</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalUsers} <span className="text-xs font-bold text-slate-400">Users</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl shadow-inner">
              <FaUser />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrators</p>
              <h3 className="text-2xl font-black text-indigo-600 mt-1">{totalAdmins} <span className="text-xs font-bold text-slate-400">Admins</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl shadow-inner">
              <FaUserShield />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platinum & VIP Tier</p>
              <h3 className="text-2xl font-black text-amber-500 mt-1">{totalPlatinumVip} <span className="text-xs font-bold text-slate-400">Members</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl shadow-inner">
              <FaStar />
            </div>
          </div>
        </div>

        {/* BENTO CARD */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="relative w-full lg:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
              <input
                type="text"
                placeholder="Search name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 pl-10 pr-4 py-3.5 rounded-2xl text-xs font-medium border-0 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-slate-800 placeholder-slate-400"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              {/* Role Filter */}
              <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                {['All', 'admin', 'member'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedRole === role ? "bg-pink-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {role === 'All' ? 'All Roles' : role}
                  </button>
                ))}
              </div>

              {/* Tier Filter */}
              <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 overflow-x-auto">
                {['All', 'Bronze', 'Silver', 'Gold', 'Platinum', 'VIP'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      selectedTier === tier ? "bg-white text-pink-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tier === 'All' ? 'All Tiers' : tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 text-center font-bold text-slate-400 animate-pulse">
                Synchronizing users with Supabase database...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-20 text-center text-slate-400 font-medium">
                No users found matching your filters.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="pb-4 pl-3">User & UUID</th>
                    <th className="pb-4">Contact</th>
                    <th className="pb-4">Role</th>
                    <th className="pb-4">Loyalty Tier</th>
                    <th className="pb-4 text-center">Points</th>
                    <th className="pb-4 text-center">Status</th>
                    <th className="pb-4">Join Date</th>
                    <th className="pb-4 text-right pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-50">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="py-4 pl-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-black flex items-center justify-center text-sm shadow-md shadow-pink-500/10">
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm">{u.name || 'Unnamed'}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              ID: {typeof u.id === 'string' ? u.id.slice(0, 8) : u.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-slate-600">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-slate-300" size={11} />
                          <span>{u.email}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${
                          u.role === 'admin' 
                            ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                            : 'bg-pink-50 text-pink-600 border border-pink-100'
                        }`}>
                          {u.role === 'admin' ? <FaUserShield size={10} /> : <FaUser size={9} />}
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                          u.tier === 'Platinum' || u.tier === 'VIP' ? 'bg-indigo-50 text-indigo-600' :
                          u.tier === 'Gold' ? 'bg-amber-50 text-amber-600' :
                          u.tier === 'Silver' ? 'bg-slate-100 text-slate-600' :
                          'bg-orange-50 text-orange-600'
                        }`}>
                          {u.tier || 'Bronze'}
                        </span>
                      </td>
                      <td className="py-4 text-center font-black text-slate-800">
                        ✨ {(u.points || 0).toLocaleString()} Pts
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          u.status === 'Suspended' 
                            ? 'bg-rose-50 text-rose-600' 
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {u.status === 'Suspended' ? <FaExclamationCircle /> : <FaCheckCircle />}
                          {u.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400 font-bold text-[11px]">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '12 Jan 2026'}
                      </td>
                      <td className="py-4 pr-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button 
                            onClick={() => openEditModal(u)}
                            className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
                            title="Edit User"
                          >
                            <FaPen size={12} />
                          </button>
                          <button 
                            onClick={() => handleDelete(u.id, u.name)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="Delete User"
                          >
                            <FaTrashAlt size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] border border-slate-100 shadow-2xl p-6 md:p-8 relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900">Add New User</h3>
                <p className="text-xs text-slate-400 font-medium">Create a new account in Supabase database.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 flex items-center justify-center transition-colors">&times;</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1">
                <label className="text-slate-400">Full Name</label>
                <input type="text" required name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Nabila Syakieb" className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Email Address</label>
                <input type="email" required name="email" value={formData.email} onChange={handleInputChange} placeholder="e.g. nabila@luneve.com" className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={11} />
                  <input type="password" required name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-slate-50 pl-10 pr-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Role</label>
                  <select name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold">
                    <option value="member">member</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Loyalty Tier</label>
                  <select name="tier" value={formData.tier} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold">
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Initial Points</label>
                  <input type="number" name="points" value={formData.points} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold">
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-pink-500 text-white rounded-xl shadow-md shadow-pink-200 hover:bg-pink-600 transition-all font-bold">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] border border-slate-100 shadow-2xl p-6 md:p-8 relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900">Edit User Account</h3>
                <p className="text-xs text-slate-400 font-medium">Modify user details and privileges in Supabase.</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 flex items-center justify-center transition-colors">&times;</button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1">
                <label className="text-slate-400">Full Name</label>
                <input type="text" required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Email Address</label>
                <input type="email" required name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">New Password <span className="text-[10px] font-normal text-slate-400">(Leave blank to keep current)</span></label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Role</label>
                  <select name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold">
                    <option value="member">member</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Loyalty Tier</label>
                  <select name="tier" value={formData.tier} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold">
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Points</label>
                  <input type="number" name="points" value={formData.points} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-bold">
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-pink-500 text-white rounded-xl shadow-md shadow-pink-200 hover:bg-pink-600 transition-all font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
