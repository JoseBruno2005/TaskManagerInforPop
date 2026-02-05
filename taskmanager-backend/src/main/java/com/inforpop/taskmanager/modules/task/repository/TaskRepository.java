package com.inforpop.taskmanager.modules.task.repository;

import com.inforpop.taskmanager.modules.task.domain.Task;
import com.inforpop.taskmanager.modules.task.domain.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.public_id = :public_id")
    Optional<Task> findByPublic_id(@Param("public_id") UUID public_id);

    @Query("SELECT t FROM Task t WHERE " +
            "(:title IS NULL OR LOWER(CAST(t.title AS string)) LIKE LOWER(CONCAT('%', CAST(:title AS string), '%'))) AND " +
            "(CAST(:status AS string) IS NULL OR t.status = :status)")
    List<Task> findByFilters(@Param("title") String title, @Param("status") TaskStatus status);
}
