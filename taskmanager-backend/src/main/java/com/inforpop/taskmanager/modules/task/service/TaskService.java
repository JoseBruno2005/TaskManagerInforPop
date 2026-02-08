package com.inforpop.taskmanager.modules.task.service;

import com.inforpop.taskmanager.exceptions.BusinessException;
import com.inforpop.taskmanager.exceptions.InvalidStatusException;
import com.inforpop.taskmanager.exceptions.ResourceNotFoundException;
import com.inforpop.taskmanager.exceptions.UnauthorizedAccessException;
import com.inforpop.taskmanager.modules.task.domain.TaskStatus;
import com.inforpop.taskmanager.modules.task.dto.mapper.TaskMapper;
import com.inforpop.taskmanager.modules.task.dto.request.CreateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.request.UpdateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.response.ResponseTaskDto;
import com.inforpop.taskmanager.modules.task.repository.TaskRepository;
import com.inforpop.taskmanager.modules.user.domain.User;
import com.inforpop.taskmanager.modules.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserService userService;

    public ResponseTaskDto save(CreateTaskDto createTaskDto){

        var task = taskMapper.dtoCreateToEntity(createTaskDto);
        task.setCreator(userService.getAuthenticatedUser());
        task.setStatus(TaskStatus.PENDING);

        if(createTaskDto.assignedUser() != null){
            User assignedUser = userService.getUserByPublicId(createTaskDto.assignedUser());
            if(!assignedUser.getEnabled()){
                throw new BusinessException("Usuários desativados não devem receber tarefas.");
            }else {
                task.setAssignedUser(assignedUser);
            }
        }

        return taskMapper.entityToDto(taskRepository.save(task));

    }

    public void delete(UUID publicId){
        var task = taskRepository.findByPublic_id(publicId)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com o ID fornecido."));

        task.setDeleted(true);
        taskRepository.save(task);
    }

    public ResponseTaskDto findByPublicId(UUID publicId){
        return taskMapper.entityToDto(
                taskRepository.findByPublic_id(publicId).orElseThrow(
                        (() -> new ResourceNotFoundException("Atividade não encontrada."))
                )
        );
    }

    public List<ResponseTaskDto> findByAssignedUser(String title, String status) {

        User user = userService.getAuthenticatedUser();

        TaskStatus taskStatus = null;
        if (status != null && !status.isBlank()) {
            try {
                taskStatus = TaskStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new InvalidStatusException("Status inválido: " + status);
            }
        }

        return taskRepository
                .findByAssignedUserWithFilters(
                        user.getPublic_id(),
                        title,
                        taskStatus
                )
                .stream()
                .map(taskMapper::entityToDto)
                .toList();
    }

    public List<ResponseTaskDto> findAll(String title, String status) {
        TaskStatus taskStatus = null;
        if (status != null && !status.isBlank()) {
            try {
                taskStatus = TaskStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new InvalidStatusException("Status inválido: " + status);
            }
        }

        return taskRepository.findByFilters(title, taskStatus)
                .stream()
                .map(taskMapper::entityToDto)
                .toList();
    }

    public ResponseTaskDto update(UUID publicId, UpdateTaskDto updateDto) {
        var task = taskRepository.findByPublic_id(publicId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tarefa não encontrada para atualização."
                ));

        User currentUser = userService.getAuthenticatedUser();
        if (!task.getCreator().getId().equals(currentUser.getId())
                && !currentUser.getRole().name().equals("ADMIN")) {
            throw new UnauthorizedAccessException(
                    "Você não tem permissão para alterar esta tarefa."
            );
        }

        if (updateDto.title() != null){
            task.setTitle(updateDto.title());
        }

        if (updateDto.description() != null){
            task.setDescription(updateDto.description());
        }

        if (updateDto.status() != null) {
            try {
                task.setStatus(TaskStatus.valueOf(updateDto.status().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new InvalidStatusException("Status inválido: " + updateDto.status());
            }
        }

        if (updateDto.assignedUser() != null) {
            User assignedUser = userService.getUserByPublicId(updateDto.assignedUser());
            if (!assignedUser.getEnabled()) {
                throw new BusinessException(
                        "Não é possível atribuir tarefas a usuários desativados."
                );
            }
            task.setAssignedUser(assignedUser);
        }else{
            task.setAssignedUser(null);
        }

        return taskMapper.entityToDto(taskRepository.save(task));
    }

}
