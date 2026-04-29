import React, { useState, useEffect } from 'react'

const EMPTY = { name: '', email: '', course: '' }

export default function StudentForm({ editStudent, onSave, onReset }) {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(editStudent
      ? { name: editStudent.name, email: editStudent.email, course: editStudent.course }
      : EMPTY)
    setErrors({})
  }, [editStudent])

  const validate = () => {
    const e = {}
    if (!form.name.trim())   e.name   = 'Name is required'
    if (!form.email.trim())  e.email  = 'Email is required'
    if (!form.course.trim()) e.course = 'Course is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(err => ({ ...err, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <div className="card">
      <h2 className="card__title">
        {editStudent ? `✏️ Edit Student #${editStudent.id}` : '➕ Add New Student'}
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text"
              placeholder="e.g. Rahul Sharma"
              value={form.name} onChange={handleChange}
              className={errors.name ? 'input--error' : ''} />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email"
              placeholder="e.g. rahul@email.com"
              value={form.email} onChange={handleChange}
              className={errors.email ? 'input--error' : ''} />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input id="course" name="course" type="text"
              placeholder="e.g. Computer Science"
              value={form.course} onChange={handleChange}
              className={errors.course ? 'input--error' : ''} />
            {errors.course && <span className="error-msg">{errors.course}</span>}
          </div>

        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving…' : editStudent ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onReset}>Reset</button>
        </div>
      </form>
    </div>
  )
}