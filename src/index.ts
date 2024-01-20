import ServiceManager from "./App/infrastructure/managers/ServiceManager";
import AService from "./App/domain/entities/AService";
import DependencyDecorator from "./App/domain/decorators/DependencyDecorator/DependencyDecorator";

export const ServiceLoader = ServiceManager;
export const ServiceMetadata = DependencyDecorator;
export const IService = AService;

// Testing remove on publish. 
