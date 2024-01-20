import { ServiceContainer } from "./ServiceContainer";
import AService from "../entities/AService";

export default interface IServiceManager 
{
    fetchServiceContainer(globPattern?: string): Promise<ServiceContainer>;
    startAllServices(container: ServiceContainer): Promise<void>;
}