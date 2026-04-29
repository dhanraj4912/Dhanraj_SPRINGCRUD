import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import StudentForm  from './components/StudentForm'
import StudentTable from './components/StudentTable'
import Toast        from './components/Toast'
import './App.css'

const API = '/students'

export default function App() {
  const [students, setStudents]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [editStudent, setEditStudent]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast]               = useState(null)

  const notify = (message, type = 'success') => setToast({ message, type })

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get(API)
      setStudents(res.data)
    } catch {
      notify('❌ Cannot connect. Is Spring Boot running on port 8080?', 'error')
      setStudents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchStudents() }, [fetchStudents])

  const handleSave = async (payload) => {
    try {
      if (editStudent) {
        await axios.put(`${API}/${editStudent.id}`, payload)
        notify(`✅ "${payload.name}" updated!`)
      } else {
        await axios.post(API, payload)
        notify(`✅ "${payload.name}" added!`)
      }
      setEditStudent(null)
      fetchStudents()
    } catch (err) {
      notify(`❌ ${err.response?.data?.message || 'Something went wrong'}`, 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${deleteTarget.id}`)
      notify(`🗑 "${deleteTarget.name}" deleted`)
      setDeleteTarget(null)
      fetchStudents()
    } catch {
      notify('❌ Failed to delete', 'error')
    }
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h1>Student Manager</h1>
          </div>
          <span className="header__sub">Spring Boot + JDBC · PostgreSQL</span>
        </div>
      </header>

      <main className="main">
        {/* Form */}
        <StudentForm
          editStudent={editStudent}
          onSave={handleSave}
          onReset={() => setEditStudent(null)}
        />

        {/* Search Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="search"
              placeholder="Search by name or course…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>
          <span className="count">{filtered.length} student{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Table */}
        <StudentTable
          students={filtered}
          loading={loading}
          onEdit={setEditStudent}
          onDelete={setDeleteTarget}
        />
      </main>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="overlay">
          <div className="modal">
            <h2>Delete Student</h2>
            <p>Are you sure you want to delete <strong>"{deleteTarget.name}"</strong>? This cannot be undone.</p>
            <div className="modal__actions">
              <button className="btn btn--ghost"  onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn--danger" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}