import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { useToast } from '../components/Toast';
import { FormSkeleton } from '../components/LoadingSkeleton';

export default function Profile() {
    const { user } = useAuth();
    const { addToast } = useToast();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({ bio: '', location: '', skills: '' });

    // Experience form
    const [expForm, setExpForm] = useState({ company: '', role: '', startDate: '', endDate: '', description: '' });
    const [addingExp, setAddingExp] = useState(false);

    // Education form
    const [eduForm, setEduForm] = useState({ institution: '', degree: '', year: '' });
    const [addingEdu, setAddingEdu] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.userId) return;
            try {
                const res = await API.get(`/api/profiles/${user.userId}`);
                setProfile(res.data);
                setForm({
                    bio: res.data.bio || '',
                    location: res.data.location || '',
                    skills: res.data.skills || '',
                });
            } catch (err) {
                if (err.response?.status === 404 || err.response?.status === 500) {
                    setIsNew(true);
                } else {
                    addToast('Failed to load profile.', 'error');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user, addToast]);

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                userId: user.userId,
                bio: form.bio,
                location: form.location,
                skills: form.skills,
            };

            let res;
            if (isNew) {
                res = await API.post('/api/profiles', payload);
                setIsNew(false);
            } else {
                res = await API.put(`/api/profiles/${user.userId}`, payload);
            }
            setProfile(res.data);
            addToast('Profile saved successfully!');
        } catch {
            addToast('Failed to save profile.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleAddExperience = async (e) => {
        e.preventDefault();
        if (!expForm.company || !expForm.role) {
            addToast('Company and role are required.', 'error');
            return;
        }
        setAddingExp(true);
        try {
            await API.post(`/api/profiles/${user.userId}/experience`, expForm);
            // Refetch profile to get updated experiences
            const res = await API.get(`/api/profiles/${user.userId}`);
            setProfile(res.data);
            setExpForm({ company: '', role: '', startDate: '', endDate: '', description: '' });
            addToast('Experience added!');
        } catch {
            addToast('Failed to add experience.', 'error');
        } finally {
            setAddingExp(false);
        }
    };

    const handleAddEducation = async (e) => {
        e.preventDefault();
        if (!eduForm.institution || !eduForm.degree) {
            addToast('Institution and degree are required.', 'error');
            return;
        }
        setAddingEdu(true);
        try {
            await API.post(`/api/profiles/${user.userId}/education`, eduForm);
            const res = await API.get(`/api/profiles/${user.userId}`);
            setProfile(res.data);
            setEduForm({ institution: '', degree: '', year: '' });
            addToast('Education added!');
        } catch {
            addToast('Failed to add education.', 'error');
        } finally {
            setAddingEdu(false);
        }
    };

    const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#b5621b] focus:ring-1 focus:ring-[#b5621b]/20 transition';

    if (loading) {
        return (
            <div className="bg-[#f5f0eb] min-h-[calc(100vh-64px)]">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    <FormSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f5f0eb] min-h-[calc(100vh-64px)]">
            <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isNew ? 'Create Your Profile' : 'My Profile'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isNew ? 'Set up your candidate profile to start applying' : 'Keep your profile up to date'}
                    </p>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl shadow-sm p-8 space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900">Basic Info</h2>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Bio</label>
                        <textarea
                            name="bio"
                            placeholder="Tell employers about yourself..."
                            value={form.bio}
                            onChange={handleFormChange}
                            rows={4}
                            className={`mt-1 ${inputClass}`}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. San Francisco, CA"
                            value={form.location}
                            onChange={handleFormChange}
                            className={`mt-1 ${inputClass}`}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">Skills</label>
                        <input
                            type="text"
                            name="skills"
                            placeholder="e.g. React, Node.js, Python (comma-separated)"
                            value={form.skills}
                            onChange={handleFormChange}
                            className={`mt-1 ${inputClass}`}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-3 bg-[#b5621b] text-white rounded-xl font-medium hover:bg-[#a0541a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Saving...
                            </span>
                        ) : isNew ? 'Create Profile' : 'Save Profile'}
                    </button>
                </form>

                {/* Experience Section — only show after profile exists */}
                {!isNew && (
                    <div className="bg-white rounded-3xl shadow-sm p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>

                        {/* Existing experiences */}
                        {profile?.experiences?.length > 0 && (
                            <div className="space-y-3 mb-6">
                                {profile.experiences.map((exp, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="font-medium text-gray-900">{exp.role}</p>
                                        <p className="text-sm text-gray-600">{exp.company}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {exp.startDate} – {exp.endDate || 'Present'}
                                        </p>
                                        {exp.description && (
                                            <p className="text-sm text-gray-500 mt-2">{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add experience form */}
                        <form onSubmit={handleAddExperience} className="space-y-3 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-600">Add Experience</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Company *"
                                    value={expForm.company}
                                    onChange={(e) => setExpForm(prev => ({ ...prev, company: e.target.value }))}
                                    className={inputClass}
                                />
                                <input
                                    type="text"
                                    placeholder="Role *"
                                    value={expForm.role}
                                    onChange={(e) => setExpForm(prev => ({ ...prev, role: e.target.value }))}
                                    className={inputClass}
                                />
                                <input
                                    type="date"
                                    placeholder="Start Date"
                                    value={expForm.startDate}
                                    onChange={(e) => setExpForm(prev => ({ ...prev, startDate: e.target.value }))}
                                    className={inputClass}
                                />
                                <input
                                    type="date"
                                    placeholder="End Date"
                                    value={expForm.endDate}
                                    onChange={(e) => setExpForm(prev => ({ ...prev, endDate: e.target.value }))}
                                    className={inputClass}
                                />
                            </div>
                            <textarea
                                placeholder="Description"
                                value={expForm.description}
                                onChange={(e) => setExpForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={2}
                                className={inputClass}
                            />
                            <button
                                type="submit"
                                disabled={addingExp}
                                className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
                            >
                                {addingExp ? 'Adding...' : '+ Add Experience'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Education Section */}
                {!isNew && (
                    <div className="bg-white rounded-3xl shadow-sm p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>

                        {/* Existing educations */}
                        {profile?.educations?.length > 0 && (
                            <div className="space-y-3 mb-6">
                                {profile.educations.map((edu, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="font-medium text-gray-900">{edu.degree}</p>
                                        <p className="text-sm text-gray-600">{edu.institution}</p>
                                        {edu.year && <p className="text-xs text-gray-400 mt-1">{edu.year}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add education form */}
                        <form onSubmit={handleAddEducation} className="space-y-3 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-600">Add Education</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input
                                    type="text"
                                    placeholder="Institution *"
                                    value={eduForm.institution}
                                    onChange={(e) => setEduForm(prev => ({ ...prev, institution: e.target.value }))}
                                    className={inputClass}
                                />
                                <input
                                    type="text"
                                    placeholder="Degree *"
                                    value={eduForm.degree}
                                    onChange={(e) => setEduForm(prev => ({ ...prev, degree: e.target.value }))}
                                    className={inputClass}
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={eduForm.year}
                                    onChange={(e) => setEduForm(prev => ({ ...prev, year: e.target.value }))}
                                    className={inputClass}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={addingEdu}
                                className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
                            >
                                {addingEdu ? 'Adding...' : '+ Add Education'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
