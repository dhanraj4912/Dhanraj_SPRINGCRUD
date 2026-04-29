package com.example.demo.repository;

import com.example.demo.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentRepository {

    Student save(Student student);           // CREATE

    List<Student> findAll();                 // READ ALL

    Optional<Student> findById(Integer id);  // READ BY ID

    Student update(Integer id, Student student); // UPDATE

    boolean deleteById(Integer id);          // DELETE
}