import React, { useState, useEffect } from 'react';

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) { console.error("Backend not running?"); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text })
    });
    setText('');
    fetchTasks();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-slate-200 p-8 border border-slate-100">
        
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">TaskPulse</h1>
          <p className="text-slate-400 font-medium">Keep your momentum going.</p>
        </header>

        <form onSubmit={addTask} className="flex gap-3 mb-10">
          <input 
            className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-700"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg shadow-indigo-200">
            Add
          </button>
        </form>

        <div className="space-y-4">
          {tasks.length > 0 ? tasks.map(task => (
            <div key={task.id} className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
              <span className="text-slate-600 font-semibold group-hover:text-slate-800">{task.title}</span>
              <div className="h-3 w-3 rounded-full bg-indigo-100 group-hover:bg-indigo-500 transition-colors"></div>
            </div>
          )) : (
            <p className="text-center text-slate-300 italic py-10">No tasks yet. Start by adding one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}