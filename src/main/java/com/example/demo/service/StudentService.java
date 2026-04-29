package com.example.demo.service;

import com.example.demo.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    Student createStudent(Student student);

    List<Student> getAllStudents();

    Optional<Student> getStudentById(Integer id);

    Student updateStudent(Integer id, Student student);

    boolean deleteStudent(Integer id);
}