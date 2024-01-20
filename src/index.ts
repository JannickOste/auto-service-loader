import ServiceManager from "./App/infrastructure/managers/ServiceManager";
import ServiceInterface from "./App/domain/entities/ServiceInterface";
import DependencyDecorator from "./App/domain/decorators/DependencyDecorator/DependencyDecorator";

export const ServiceLoader = ServiceManager;
export const ServiceMetadata = DependencyDecorator;
export type IService = ServiceInterface;

// Testing remove on publish. 
