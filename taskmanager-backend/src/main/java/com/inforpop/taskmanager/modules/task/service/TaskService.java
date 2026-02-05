package com.inforpop.taskmanager.modules.task.service;

import com.inforpop.taskmanager.modules.task.dto.mapper.TaskMapper;
import com.inforpop.taskmanager.modules.task.dto.request.CreateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.response.ResponseTaskDto;
import com.inforpop.taskmanager.modules.task.repository.TaskRepository;
import com.inforpop.taskmanager.modules.user.domain.User;
import com.inforpop.taskmanager.modules.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserService userService;

    public ResponseTaskDto save(CreateTaskDto createTaskDto){

        var task = taskMapper.dtoCreateToEntity(createTaskDto);
        task.setCreator(userService.getAuthenticatedUser());

        if(createTaskDto.assignedUser() != null){
            User assignedUser = userService.getUserByPublicId(createTaskDto.assignedUser());
            if(!assignedUser.getEnabled()){
                throw new RuntimeException("Usuários desativados não devem receber tarefas.");
            }else {
                task.setAssignedUser(assignedUser);
            }
        }

        return taskMapper.entityToDto(taskRepository.save(task));

    }



}
