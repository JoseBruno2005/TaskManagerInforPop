package com.inforpop.taskmanager.modules.task.dto.mapper;

import com.inforpop.taskmanager.modules.task.domain.Task;
import com.inforpop.taskmanager.modules.task.domain.TaskStatus;
import com.inforpop.taskmanager.modules.task.dto.request.CreateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.response.ResponseTaskDto;
import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public Task dtoCreateToEntity(CreateTaskDto createTaskDto){
        return Task.builder()
                .title(createTaskDto.title())
                .description(createTaskDto.description())
                .build();
    }

    public ResponseTaskDto entityToDto(Task task){
        ResponseUserDto creatorDto = ResponseUserDto.builder()
                .publicId(task.getCreator().getPublic_id())
                .name(task.getCreator().getName())
                .role(task.getCreator().getRole().toString())
                .build();

        ResponseUserDto assignedUserDto = null;
        if (task.getAssignedUser() != null) {
            assignedUserDto = ResponseUserDto.builder()
                    .publicId(task.getAssignedUser().getPublic_id())
                    .name(task.getAssignedUser().getName())
                    .role(task.getAssignedUser().getRole().toString())
                    .build();
        }

        return ResponseTaskDto.builder()
                .publicId(task.getPublic_id())
                .title(task.getTitle())
                .creator(creatorDto)
                .status(task.getStatus() != null ? task.getStatus().toString() : null)
                .description(task.getDescription())
                .assignedUser(assignedUserDto)
                .build();
    }

}
