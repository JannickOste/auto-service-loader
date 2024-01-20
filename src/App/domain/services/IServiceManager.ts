import { ServiceContainer } from "./ServiceContainer";
import ServiceInterface from "../entities/ServiceInterface";

export default interface IServiceManager 
{
    fetchServiceContainer(globPattern?: string): Promise<ServiceContainer>;
    startAllServices(container: ServiceContainer): Promise<void>;
}