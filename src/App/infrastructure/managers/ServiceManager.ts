import "reflect-metadata"
import IServiceManager from "../../domain/services/IServiceManager";
import DependencyLocator from "../services/DependencyLocator";
import { ServiceContainer } from "../../domain/services/ServiceContainer";
import { DependencyDecoratorKey } from "../../domain/decorators/DependencyDecorator/DependencyDecoratorKey";
import { DependencyDecoratorMetadata } from "../../domain/decorators/DependencyDecorator/DependencyDecoratorMetadata";

export default class ServiceManager implements IServiceManager
{
    async fetchServiceContainer(globPattern: string): Promise<ServiceContainer> 
    {
        const container: ServiceContainer =  new ServiceContainer();
        for(let service of await new DependencyLocator().findAll(globPattern))
        {   
            if(!container.includes(service))
            {
                container.bind(service).to(service);
            }
        }   
        
        return container;
    }

    async startAllServices(container: ServiceContainer): Promise<void> 
    {
        for(let registeredType of container.registeredServices)
        {
            const metadata: DependencyDecoratorMetadata = Reflect.getMetadata(DependencyDecoratorKey, registeredType);
            if(metadata && metadata.isService)
            {
                const service: any = container.get(registeredType);
                if(service.start)
                {
                    await service.start()
                }
            }
        }
    }

    async stopAllServices(container: ServiceContainer) 
    {
        for(let registeredType of container.registeredServices)
        {
            const metadata: DependencyDecoratorMetadata = Reflect.getMetadata(DependencyDecoratorKey, registeredType);
            if(metadata && metadata.isService)
            {
                const service: any = container.get(registeredType);
                if(service.start)
                {
                    await service.start()
                }
            }
        }
    }
}