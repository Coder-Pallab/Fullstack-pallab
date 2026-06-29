import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Trash2, LogOut, Pencil, X } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const inputCls = [
  'w-full px-3 py-2 rounded-lg mt-1',
  'bg-white/[0.04] border border-white/[0.08]',
  'text-white/80 text-[0.78rem] placeholder:text-white/20',
  'focus:outline-none focus:border-sky-400/40 transition-colors',
  'font-[Syne]',
].join(' ');

const CATEGORIES = [
  'Frontend', 'Backend', 'Database', 'Authentication',
  'Tools', 'Programming Language', 'Animation', 'Other',
];

const Panel = ({ children, className = '' }) => (
  <div className={`bg-white/[0.025] border border-white/[0.06] rounded-xl p-5 ${className}`}>
    {children}
  </div>
);

const PanelTitle = ({ children }) => (
  <p className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-white/40 mb-4"
     style={{ fontFamily: "'Syne', sans-serif" }}>{children}</p>
);

const FormField = ({ label, children }) => (
  <div className="mb-3">
    <label className="block text-[0.68rem] font-bold tracking-[0.06em] uppercase text-white/30 mb-1.5"
           style={{ fontFamily: "'Syne', sans-serif" }}>{label}</label>
    {children}
  </div>
);

const SubmitBtn = ({ children }) => (
  <button type="submit"
    className="w-full mt-1 py-2.5 rounded-lg bg-sky-400/10 border border-sky-400/25 text-sky-400 text-[0.74rem] font-bold tracking-widest hover:bg-sky-400/20 transition-colors"
    style={{ fontFamily: "'Syne', sans-serif" }}>
    {children}
  </button>
);

const EditBtn = ({ onClick }) => (
  <button type="button" onClick={onClick}
    className="w-7 h-7 rounded-lg border border-sky-400/20 bg-sky-400/[0.06] text-sky-400 flex items-center justify-center hover:bg-sky-400/15 transition-colors">
    <Pencil size={13} />
  </button>
);

const DelBtn = ({ onClick }) => (
  <button type="button" onClick={onClick}
    className="w-7 h-7 rounded-lg border border-red-500/20 bg-red-500/[0.06] text-red-400/70 flex items-center justify-center hover:bg-red-500/15 transition-colors">
    <Trash2 size={13} />
  </button>
);

const Modal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
        <X size={18} />
      </button>
      <p className="text-[0.78rem] font-bold tracking-widest uppercase text-white/50 mb-5"
         style={{ fontFamily: "'Syne', sans-serif" }}>{title}</p>
      {children}
      </div>
  </div>
);

const ModalActions = ({ onCancel }) => (
  <div className="flex gap-3 pt-3">
    <button type="button" onClick={onCancel}
      className="flex-1 py-2.5 rounded-lg border border-white/[0.08] text-white/40 text-[0.74rem] font-bold tracking-widest hover:bg-white/[0.04] transition-colors"
      style={{ fontFamily: "'Syne', sans-serif" }}>
      Cancel
    </button>
    <button type="submit"
      className="flex-1 py-2.5 rounded-lg bg-sky-400/10 border border-sky-400/25 text-sky-400 text-[0.74rem] font-bold tracking-widest hover:bg-sky-400/20 transition-colors"
      style={{ fontFamily: "'Syne', sans-serif" }}>
      Save Changes
    </button>
  </div>
);

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', tags: '', url: '', code: '', imageFile: null, imagePreview: '',
  });
  const [skillForm, setSkillForm] = useState({
    name: '', level: '', category: '', iconFile: null, iconPreview: '',
  });

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}` });
  const handleLogout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login'); };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [t, p, s] = await Promise.all([
        fetch(`${API}/testimonials/all`, { headers: auth() }),
        fetch(`${API}/projects`),
        fetch(`${API}/skills`),
      ]);
      if (t.status === 401) { handleLogout(); return; }
      if (t.ok) setTestimonials(await t.json());
      if (p.ok) setProjects(await p.json());
      if (s.ok) setSkills(await s.json());
    } catch { toast.error('Failed to connect to backend'); }
  };

  const buildProjectFormData = (form) => {
    const fd = new FormData();
    ['title','description','tags','url','code'].forEach(k => fd.append(k, form[k]));
    if (form.imageFile) fd.append('image', form.imageFile);
    return fd;
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/projects`, { method: 'POST', headers: auth(), body: buildProjectFormData(projectForm) });
    if (res.ok) { toast.success('Project added!'); setProjectForm({ title:'',description:'',tags:'',url:'',code:'',imageFile:null,imagePreview:'' }); fetchData(); }
    else toast.error('Failed to add project');
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/projects/${editingProject._id}`, { method: 'PUT', headers: auth(), body: buildProjectFormData(editingProject) });
    if (res.ok) { toast.success('Updated!'); setEditingProject(null); fetchData(); }
    else toast.error('Failed to update');
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    const res = await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: auth() });
    if (res.ok) { toast.success('Deleted'); fetchData(); }
  };

  const buildSkillFormData = (form) => {
    const fd = new FormData();
    ['name','level','category'].forEach(k => fd.append(k, form[k]));
    if (form.iconFile) fd.append('icon', form.iconFile);
    return fd;
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/skills`, { method: 'POST', headers: auth(), body: buildSkillFormData(skillForm) });
    if (res.ok) { toast.success('Skill added!'); setSkillForm({ name:'',level:'',category:'',iconFile:null,iconPreview:'' }); fetchData(); }
    else toast.error('Failed to add skill');
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/skills/${editingSkill._id}`, { method: 'PUT', headers: auth(), body: buildSkillFormData(editingSkill) });
    if (res.ok) { toast.success('Updated!'); setEditingSkill(null); fetchData(); }
    else toast.error('Failed to update');
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    const res = await fetch(`${API}/skills/${id}`, { method: 'DELETE', headers: auth() });
    if (res.ok) { toast.success('Deleted'); fetchData(); }
  };

  const approveTestimonial = async (id) => {
    const res = await fetch(`${API}/testimonials/${id}/approve`, { method: 'PATCH', headers: auth() });
    if (res.ok) { toast.success('Approved!'); fetchData(); }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const res = await fetch(`${API}/testimonials/${id}`, { method: 'DELETE', headers: auth() });
    if (res.ok) { toast.success('Deleted'); fetchData(); }
  };

  const tabCls = (t) => [
    'px-5 py-1.5 rounded-full text-[0.74rem] font-bold tracking-widest capitalize border transition-all duration-150',
    activeTab === t
      ? 'bg-sky-400/10 border-sky-400/25 text-sky-400'
      : 'text-white/30 bg-white/[0.03] border-white/[0.06] hover:text-white/60 hover:bg-white/[0.06]',
  ].join(' ');

  return (
    <div className="min-h-screen bg-[#080a0f] text-white p-6" style={{ fontFamily: "'Syne', sans-serif" }}>
      <ToastContainer theme="dark" />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/"
              className="w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-sky-400/80 hover:bg-white/[0.06] transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-[1.1rem] font-extrabold tracking-tight text-white/90">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] text-red-400/75 text-[0.72rem] font-bold tracking-widest hover:bg-red-500/[0.12] transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/[0.06] pb-4">
          {['projects', 'skills', 'testimonials'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={tabCls(t)}>{t}</button>
          ))}
        </div>

        {/* ── PROJECTS ── */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel>
              <PanelTitle>Add New Project</PanelTitle>
              <form onSubmit={handleAddProject}>
                <FormField label="Title *"><input required className={inputCls} value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} /></FormField>
                <FormField label="Description *"><textarea required rows={3} className={inputCls} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} /></FormField>
                <FormField label="Tags"><input className={inputCls} placeholder="React, Node.js" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} /></FormField>
                <FormField label="Live URL"><input className={inputCls} value={projectForm.url} onChange={e => setProjectForm({...projectForm, url: e.target.value})} /></FormField>
                <FormField label="Code URL"><input className={inputCls} value={projectForm.code} onChange={e => setProjectForm({...projectForm, code: e.target.value})} /></FormField>
                <FormField label="Project Image">
                  <input type="file" accept="image/*" className={inputCls} onChange={e => {
                    const file = e.target.files[0];
                    setProjectForm({...projectForm, imageFile: file, imagePreview: file ? URL.createObjectURL(file) : ''});
                  }} />
                  {projectForm.imagePreview && <img src={projectForm.imagePreview} alt="preview" className="mt-2 h-28 w-full object-cover rounded-lg opacity-80" />}
                </FormField>
                <SubmitBtn>Add Project</SubmitBtn>
              </form>
            </Panel>

            <Panel>
              <PanelTitle>Projects ({projects.length})</PanelTitle>
              <div className="space-y-2 overflow-y-auto max-h-[560px] pr-0.5">
                {projects.map(p => (
                  <div key={p._id} className="flex justify-between items-center p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {p.image && <img src={p.image} alt={p.title} className="w-12 h-8 object-cover rounded-md shrink-0 opacity-70" />}
                      <div className="min-w-0">
                        <div className="text-[0.78rem] font-bold text-white/75 truncate">{p.title}</div>
                        <div className="text-[0.67rem] text-white/28 truncate">{p.tags?.join(', ')}</div>
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <EditBtn onClick={() => setEditingProject({...p, tags: p.tags?.join(', '), imageFile: null, imagePreview: ''})} />
                      <DelBtn onClick={() => deleteProject(p._id)} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel>
              <PanelTitle>Add New Skill</PanelTitle>
              <form onSubmit={handleAddSkill}>
                <FormField label="Name *"><input required className={inputCls} value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} /></FormField>
                <FormField label="Level (%) *"><input type="number" min="0" max="100" required className={inputCls} value={skillForm.level} onChange={e => setSkillForm({...skillForm, level: e.target.value})} /></FormField>
                <FormField label="Category *">
                  <select required className={inputCls} value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Icon (optional)">
                  <input type="file" accept="image/*" className={inputCls} onChange={e => {
                    const file = e.target.files[0];
                    setSkillForm({...skillForm, iconFile: file, iconPreview: file ? URL.createObjectURL(file) : ''});
                  }} />
                  {skillForm.iconPreview && <img src={skillForm.iconPreview} alt="preview" className="mt-2 h-10 w-10 object-cover rounded-lg opacity-80" />}
                </FormField>
                <SubmitBtn>Add Skill</SubmitBtn>
              </form>
            </Panel>

            <Panel>
              <PanelTitle>Skills ({skills.length})</PanelTitle>
              <div className="space-y-2 overflow-y-auto max-h-[560px] pr-0.5">
                {skills.map(s => (
                  <div key={s._id} className="flex justify-between items-center p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] gap-3">
                    <div className="flex items-center gap-3">
                      {s.icon && <img src={s.icon} alt={s.name} className="w-8 h-8 object-cover rounded-lg shrink-0 opacity-70" />}
                      <div>
                        <div className="text-[0.78rem] font-bold text-white/75">{s.name}</div>
                        <div className="text-[0.67rem] text-white/28">{s.category} · {s.level}%</div>
                        <div className="w-20 h-0.5 bg-white/[0.08] rounded-full mt-1.5">
                          <div className="h-0.5 bg-sky-400/60 rounded-full" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <EditBtn onClick={() => setEditingSkill({...s, iconFile: null, iconPreview: ''})} />
                      <DelBtn onClick={() => deleteSkill(s._id)} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ── TESTIMONIALS ── */}
        {activeTab === 'testimonials' && (
          <Panel>
            <PanelTitle>Testimonials ({testimonials.length})</PanelTitle>
            <div className="space-y-3">
              {testimonials.length === 0 && (
                <p className="text-white/25 text-[0.78rem] text-center py-10">No testimonials yet.</p>
              )}
              {testimonials.map(t => (
                <div key={t._id} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[0.8rem] font-bold text-white/75">{t.name}</span>
                      {t.role && <span className="text-[0.7rem] text-white/28">— {t.role}</span>}
                      <span className={`text-[0.65rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full border ${
                        t.approved
                          ? 'bg-green-500/10 text-green-400/80 border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400/80 border-yellow-500/20'
                      }`}>
                        {t.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.76rem] text-white/35 italic leading-relaxed">"{t.comment}"</p>
                  </div>
                  <div className="flex gap-2 items-start shrink-0">
                    {!t.approved && (
                      <button onClick={() => approveTestimonial(t._id)}
                        className="w-8 h-8 rounded-lg border border-green-500/20 bg-green-500/[0.06] text-green-400/80 flex items-center justify-center hover:bg-green-500/15 transition-colors">
                        <Check size={14} />
                      </button>
                    )}
                    <DelBtn onClick={() => deleteTestimonial(t._id)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>

      {/* ── EDIT PROJECT MODAL ── */}
      {editingProject && (
        <Modal onClose={() => setEditingProject(null)} title="Edit Project">
          <form onSubmit={handleUpdateProject}>
            <FormField label="Title"><input className={inputCls} value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} /></FormField>
            <FormField label="Description"><textarea rows={3} className={inputCls} value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} /></FormField>
            <FormField label="Tags"><input className={inputCls} value={editingProject.tags} onChange={e => setEditingProject({...editingProject, tags: e.target.value})} /></FormField>
            <FormField label="Live URL"><input className={inputCls} value={editingProject.url} onChange={e => setEditingProject({...editingProject, url: e.target.value})} /></FormField>
            <FormField label="Code URL"><input className={inputCls} value={editingProject.code} onChange={e => setEditingProject({...editingProject, code: e.target.value})} /></FormField>
            <FormField label="Replace Image">
              <input type="file" accept="image/*" className={inputCls} onChange={e => {
                const file = e.target.files[0];
                setEditingProject({...editingProject, imageFile: file, imagePreview: file ? URL.createObjectURL(file) : ''});
              }} />
              <img src={editingProject.imagePreview || editingProject.image} alt="preview" className="mt-2 h-28 w-full object-cover rounded-lg opacity-70" />
            </FormField>
            <ModalActions onCancel={() => setEditingProject(null)} />
          </form>
        </Modal>
      )}

      {/* ── EDIT SKILL MODAL ── */}
      {editingSkill && (
        <Modal onClose={() => setEditingSkill(null)} title="Edit Skill">
          <form onSubmit={handleUpdateSkill}>
            <FormField label="Name"><input className={inputCls} value={editingSkill.name} onChange={e => setEditingSkill({...editingSkill, name: e.target.value})} /></FormField>
            <FormField label="Level (%)"><input type="number" min="0" max="100" className={inputCls} value={editingSkill.level} onChange={e => setEditingSkill({...editingSkill, level: e.target.value})} /></FormField>
            <FormField label="Category">
              <select className={inputCls} value={editingSkill.category} onChange={e => setEditingSkill({...editingSkill, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Replace Icon">
              <input type="file" accept="image/*" className={inputCls} onChange={e => {
                const file = e.target.files[0];
                setEditingSkill({...editingSkill, iconFile: file, iconPreview: file ? URL.createObjectURL(file) : ''});
              }} />
              {(editingSkill.iconPreview || editingSkill.icon) && (
                <img src={editingSkill.iconPreview || editingSkill.icon} alt="icon" className="mt-2 h-10 w-10 object-cover rounded-lg opacity-70" />
              )}
            </FormField>
            <ModalActions onCancel={() => setEditingSkill(null)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Admin;