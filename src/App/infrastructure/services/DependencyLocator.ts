import { DependencyDecoratorKey as DependencyDecoratorKey } from "../../domain/decorators/DependencyDecorator/DependencyDecoratorKey";
import IDependencyLocator from "../../domain/services/IDependencyLocator";
import { globSync } from "glob";

export default class DependencyLocator implements IDependencyLocator {
    async findAll(globPattern: string): Promise<Array<new (...args: any) => any>> {
        const services: Array<new (...args: any) => any> = [];

        const files = globSync(globPattern, { absolute: true, ignore: 'node_modules/**' });

        // !TODO: Better error handling
        for (const path of files) {
            try {
                const module = await import(path);
                
                //!TODO add support for non default members. 
                const current = module.default; 
                if (current && typeof current === "function" && Reflect.getMetadata(DependencyDecoratorKey, current)) {
                    services.push(current);
                }
            } catch (error) {
                console.error(`Error loading module from ${path}: ${(error as Error).message}`);
            }
        }

        return services;
    }
}
