package com.inforpop.taskmanager.modules.task.repository;

import com.inforpop.taskmanager.modules.task.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
