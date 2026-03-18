'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Mail, Phone, MapPin, Users } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  position: string;
  type: 'staff' | 'volunteer';
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  imageUrl: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  subscribedDate: string;
  status: 'active' | 'unsubscribed';
}

const initialStaff: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Sarah Johnson',
    role: 'Executive Director',
    position: 'Leadership',
    type: 'staff',
    email: 'sarah@seedsoflove.org',
    phone: '+1 (555) 123-4567',
    joinDate: '2015-01-15',
    status: 'active',
    imageUrl: '/placeholder-avatar.jpg',
  },
  {
    id: 'staff-2',
    name: 'Michael Chen',
    role: 'Program Manager',
    position: 'Programs',
    type: 'staff',
    email: 'michael@seedsoflove.org',
    phone: '+1 (555) 234-5678',
    joinDate: '2018-03-20',
    status: 'active',
    imageUrl: '/placeholder-avatar.jpg',
  },
  {
    id: 'vol-1',
    name: 'Emma Davis',
    role: 'Community Volunteer',
    position: 'Outreach',
    type: 'volunteer',
    email: 'emma@example.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2024-01-10',
    status: 'active',
    imageUrl: '/placeholder-avatar.jpg',
  },
];

const initialNewsletterSubscribers: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'john@example.com',
    name: 'John Smith',
    subscribedDate: '2024-02-15',
    status: 'active',
  },
  {
    id: 'sub-2',
    email: 'alice@example.com',
    name: 'Alice Johnson',
    subscribedDate: '2024-02-20',
    status: 'active',
  },
  {
    id: 'sub-3',
    email: 'bob@example.com',
    name: 'Bob Williams',
    subscribedDate: '2024-01-30',
    status: 'active',
  },
  {
    id: 'sub-4',
    email: 'carol@example.com',
    name: 'Carol Brown',
    subscribedDate: '2024-03-01',
    status: 'unsubscribed',
  },
];

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(initialNewsletterSubscribers);
  const [activeTab, setActiveTab] = useState<'staff' | 'volunteers' | 'subscribers'>('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<StaffMember>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    role: '',
    position: '',
    email: '',
    phone: '',
  });

  const staffList = staff.filter(s => s.type === 'staff');
  const volunteerList = staff.filter(s => s.type === 'volunteer');
  const activeSubscribers = subscribers.filter(s => s.status === 'active');

  const filteredStaff = useMemo(() => {
    const list = activeTab === 'staff' ? staffList : activeTab === 'volunteers' ? volunteerList : [];
    return list.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staff, activeTab, searchTerm]);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter(sub =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subscribers, searchTerm]);

  const handleEdit = (member: StaffMember) => {
    setEditingId(member.id);
    setEditData(member);
  };

  const handleSave = (id: string) => {
    setStaff(staff.map(member =>
      member.id === id ? { ...member, ...editData } : member
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const handleAddMember = () => {
    if (!newMemberForm.name || !newMemberForm.email) return;
    
    const newMember: StaffMember = {
      id: `${activeTab === 'staff' ? 'staff' : 'vol'}-${Date.now()}`,
      name: newMemberForm.name,
      role: newMemberForm.role,
      position: newMemberForm.position,
      type: activeTab === 'staff' ? 'staff' : 'volunteer',
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      imageUrl: '/placeholder-avatar.jpg',
    };
    
    setStaff([...staff, newMember]);
    setNewMemberForm({ name: '', role: '', position: '', email: '', phone: '' });
    setShowAddForm(false);
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive') => {
    setStaff(staff.map(member =>
      member.id === id ? { ...member, status: newStatus } : member
    ));
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id));
  };

  const handleUnsubscribe = (id: string) => {
    setSubscribers(subscribers.map(sub =>
      sub.id === id ? { ...sub, status: 'unsubscribed' } : sub
    ));
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Staff & Volunteers Management</h2>
        <p className="text-foreground/70">Manage your team members and newsletter subscribers</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => {
            setActiveTab('staff');
            setSearchTerm('');
            setShowAddForm(false);
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'staff'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground/60 hover:text-foreground'
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => {
            setActiveTab('volunteers');
            setSearchTerm('');
            setShowAddForm(false);
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'volunteers'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground/60 hover:text-foreground'
          }`}
        >
          Volunteers
        </button>
        <button
          onClick={() => {
            setActiveTab('subscribers');
            setSearchTerm('');
            setShowAddForm(false);
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'subscribers'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground/60 hover:text-foreground'
          }`}
        >
          Newsletter Subscribers
        </button>
      </div>

      {/* Statistics */}
      {activeTab !== 'subscribers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Total {activeTab === 'staff' ? 'Staff' : 'Volunteers'}</p>
            <p className="text-3xl font-bold text-foreground">
              {activeTab === 'staff' ? staffList.length : volunteerList.length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Active</p>
            <p className="text-3xl font-bold text-accent">
              {(activeTab === 'staff' ? staffList : volunteerList).filter(m => m.status === 'active').length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Inactive</p>
            <p className="text-3xl font-bold text-primary">
              {(activeTab === 'staff' ? staffList : volunteerList).filter(m => m.status === 'inactive').length}
            </p>
          </Card>
        </div>
      )}

      {/* Newsletter Statistics */}
      {activeTab === 'subscribers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Total Subscribers</p>
            <p className="text-3xl font-bold text-foreground">{subscribers.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Active</p>
            <p className="text-3xl font-bold text-accent">{activeSubscribers.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Unsubscribed</p>
            <p className="text-3xl font-bold text-primary">
              {subscribers.filter(s => s.status === 'unsubscribed').length}
            </p>
          </Card>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">Search</label>
          <Input
            type="text"
            placeholder={
              activeTab === 'subscribers'
                ? 'Search by email or name...'
                : 'Search by name, email, or role...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background text-foreground border-border"
          />
        </div>
        {activeTab !== 'subscribers' && (
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            {showAddForm ? 'Cancel' : `+ Add ${activeTab === 'staff' ? 'Staff' : 'Volunteer'}`}
          </Button>
        )}
      </div>

      {/* Add New Form */}
      {showAddForm && activeTab !== 'subscribers' && (
        <Card className="p-6 space-y-4 bg-background">
          <h3 className="font-semibold text-foreground">
            Add New {activeTab === 'staff' ? 'Staff Member' : 'Volunteer'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={newMemberForm.name}
              onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Role"
              value={newMemberForm.role}
              onChange={(e) => setNewMemberForm({ ...newMemberForm, role: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Position/Department"
              value={newMemberForm.position}
              onChange={(e) => setNewMemberForm({ ...newMemberForm, position: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Email"
              type="email"
              value={newMemberForm.email}
              onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Phone Number"
              value={newMemberForm.phone}
              onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <Button
            onClick={handleAddMember}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            Add {activeTab === 'staff' ? 'Staff Member' : 'Volunteer'}
          </Button>
        </Card>
      )}

      {/* Staff/Volunteers Table */}
      {(activeTab === 'staff' || activeTab === 'volunteers') && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-background/50">
                    <td className="px-6 py-4 text-foreground">
                      {editingId === member.id ? (
                        <Input
                          value={editData.name || ''}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="bg-background border-border"
                        />
                      ) : (
                        member.name
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member.id ? (
                        <Input
                          value={editData.role || ''}
                          onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                          className="bg-background border-border"
                        />
                      ) : (
                        member.role
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member.id ? (
                        <Input
                          value={editData.position || ''}
                          onChange={(e) => setEditData({ ...editData, position: e.target.value })}
                          className="bg-background border-border"
                        />
                      ) : (
                        member.position
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member.id ? (
                        <Input
                          value={editData.email || ''}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="bg-background border-border text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {member.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member.id ? (
                        <Input
                          value={editData.phone || ''}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="bg-background border-border text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {member.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">{member.joinDate}</td>
                    <td className="px-6 py-4">
                      <select
                        value={member.status}
                        onChange={(e) => handleStatusChange(member.id, e.target.value as 'active' | 'inactive')}
                        className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${
                          member.status === 'active'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {editingId === member.id ? (
                          <>
                            <Button
                              onClick={() => handleSave(member.id)}
                              className="bg-accent hover:bg-accent/90 text-xs px-3"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancel}
                              variant="outline"
                              className="text-xs px-3"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(member)}
                              className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-foreground"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Newsletter Subscribers Table */}
      {activeTab === 'subscribers' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subscribed Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-border hover:bg-background/50">
                    <td className="px-6 py-4 text-foreground">{subscriber.name}</td>
                    <td className="px-6 py-4 text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {subscriber.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/70">{subscriber.subscribedDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          subscriber.status === 'active'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {subscriber.status === 'active' && (
                          <button
                            onClick={() => handleUnsubscribe(subscriber.id)}
                            className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500"
                            title="Mark as unsubscribed"
                          >
                            <Mail size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {((activeTab !== 'subscribers' && filteredStaff.length === 0) ||
        (activeTab === 'subscribers' && filteredSubscribers.length === 0)) && (
        <Card className="p-8 text-center">
          <Users size={48} className="mx-auto text-foreground/30 mb-4" />
          <p className="text-foreground/70">
            {activeTab === 'subscribers'
              ? 'No subscribers found matching your search'
              : `No ${activeTab} members found matching your search`}
          </p>
        </Card>
      )}
    </div>
  );
}
