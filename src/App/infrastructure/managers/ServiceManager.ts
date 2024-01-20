import "reflect-metadata"
import IServiceManager from "../../domain/services/IServiceManager";
import DependencyLocator from "../services/DependencyLocator";
import { ServiceContainer } from "../../domain/services/ServiceContainer";
import { DependencyDecoratorKey } from "../../domain/decorators/DependencyDecorator/DependencyDecoratorKey";
import { DependencyDecoratorMetadata } from "../../domain/decorators/DependencyDecorator/DependencyDecoratorMetadata";
import path from "path";

//!TODO: Move to domain
export type ServiceManagerProps = {
    globPattern: string;
}

export default class ServiceManager implements IServiceManager
{
    async fetchServiceContainer(globPattern?: string): Promise<ServiceContainer> 
    {
        const container: ServiceContainer =  new ServiceContainer();
        console.dir()
        for(let service of await new DependencyLocator().findAll(globPattern ?? path.join(path.dirname(require.main?.filename ?? ""), `**/*.service.{ts,js}`)))
        {   
            if(!container.registeredServices.includes(service))
            {
                container.registerService(service).to(service);
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