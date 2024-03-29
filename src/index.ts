import ServiceManager from "./App/infrastructure/managers/ServiceManager";
import ServiceInterface from "./App/domain/entities/ServiceInterface";
import Dependency from "./App/domain/decorators/DependencyDecorator/Dependency";
import { inject } from "inversify";
import { ServiceContainer as ServicesContainer } from "./App/domain/services/ServiceContainer";

// Public exports for package.
export const ServiceLoader = ServiceManager;
export const ServiceContainer = ServicesContainer;
export const DependencyDecorator = Dependency;
export const DependencyInject = inject;
export type IService = ServiceInterface;
