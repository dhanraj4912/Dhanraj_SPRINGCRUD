import React from 'react'

export default function StudentTable({ students, loading, onEdit, onDelete }) {
  if (loading) return (
    <div className="state-box">
      <div className="spinner" />
      <p>Loading students…</p>
    </div>
  )

  if (!students.length) return (
    <div className="state-box">
      <span style={{ fontSize: 40 }}>👨‍🎓</span>
      <p style={{ marginTop: 8 }}>No students found.</p>
    </div>
  )

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td><span className="td-id">#{s.id}</span></td>
              <td><strong>{s.name}</strong></td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td className="td-actions">
                <button className="btn-sm btn-sm--edit" onClick={() => onEdit(s)}>✏️ Edit</button>
                <button className="btn-sm btn-sm--del"  onClick={() => onDelete(s)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}