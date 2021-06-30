import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatus } from './project-status.enum';
import { ProjectRepository } from './project.repository';
import { ProjectsService } from './projects.service';

const mockUser = { email: 'test@qeadle.io' };

const mockProjectsRepository = () => ({
  getProjects: jest.fn(),
  findOne: jest.fn(),
});

describe('ProjectsService', () => {
  let projectsService;
  let projectRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: ProjectRepository, useFactory: mockProjectsRepository },
      ],
    }).compile();

    projectsService = await module.get<ProjectsService>(ProjectsService);
    projectRepository = await module.get<ProjectRepository>(ProjectRepository);
  });

  describe('getProjects', () => {
    it('gets all projects from the repository', async () => {
      projectRepository.getProjects.mockResolvedValue('someValue');

      expect(projectRepository.getProjects).not.toHaveBeenCalled();
      const filters: GetProjectsFilterDto = {
        status: ProjectStatus.OPEN,
        search: 'criteria',
      };
      const result = await projectsService.getProjects(filters, mockUser);
      expect(projectRepository.getProjects).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getProjectById', () => {
    it('calls projectRepository.findOne() and succesffuly retrieve and return the project', async () => {
      const mockProject = { name: 'Test project', description: 'Test desc' };
      projectRepository.findOne.mockResolvedValue(mockProject);

      const result = await projectsService.getProjectById(
        '90cba065-50ce-4911-a918-ca72555db1cc',
      );
      expect(result).toEqual(mockProject);

      expect(projectRepository.findOne).toHaveBeenCalledWith(
        '90cba065-50ce-4911-a918-ca72555db1cc',
      );
    });

    it('throws an error as project is not found', () => {
      projectRepository.findOne.mockResolvedValue(null);
      expect(
        projectsService.getProjectById('90cba065-50ce-4911-a918-ca72555db1cc'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createProject', () => {
    it('calls projectRepository.create() and returns the result', async () => {
      projectRepository.createProject.mockResolvedValue('someProject');

      expect(projectRepository.createProject).not.toHaveBeenCalled();
      const createProjectDto = {
        name: 'Test Project',
        description: 'Test desc',
      };
      const result = await projectsService.createProject(createProjectDto);
      expect(projectRepository.createProject).toHaveBeenCalledWith(
        createProjectDto,
        mockUser,
      );
      expect(result).toEqual('someProject');
    });
  });
});
