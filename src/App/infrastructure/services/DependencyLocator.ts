import { DependencyDecoratorKey as DependencyDecoratorKey } from "../../domain/decorators/DependencyDecorator/DependencyDecoratorKey";
import IModuleLocator from "../../domain/services/IModuleLocator";
import { globSync } from "glob";


export default class DependencyLocator implements IModuleLocator {

    private validate(obj: unknown) 
    {
        return obj 
            && typeof obj === "function"
            && Reflect.getMetadata(DependencyDecoratorKey, obj);
    }

    async findAll(
        globPattern: string
    ): Promise<Array<new (...args: any) => any>> {
        const dependencies: Array<new (...args: any) => any> = [];

        const files = globSync(globPattern, { absolute: true, ignore: 'node_modules/**' });

        // !TODO: Better error handilng
        for (const path of files) {
            try {
                const module = await import(path);
                
                //!TODO add support for non default members. 
                for(let current of Object.values(module))
                {
                    if (this.validate(current)) {
                        dependencies.push(current as any);
                    }
                }
            } catch (error) {
                console.error(`Error loading module from ${path}: ${(error as Error).message}`);
            }
        }

        return dependencies;
    }
}
