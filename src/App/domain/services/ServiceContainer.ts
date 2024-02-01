import { Container, interfaces } from "inversify";
import { DependencyDecoratorKey } from "../decorators/DependencyDecorator/DependencyDecoratorKey";
import { DependencyDecoratorMetadata } from "../decorators/DependencyDecorator/DependencyDecoratorMetadata";


export class ServiceContainer extends Container {
    private readonly _registeredServices: Array<interfaces.ServiceIdentifier<any>> = [];
    public get registeredServices(): Array<interfaces.ServiceIdentifier<any>> {
        return this._registeredServices;
    }

    private readonly _registeredDependencies: Array<interfaces.ServiceIdentifier<any>> = [];
    public get registeredDependencies(): Array<interfaces.ServiceIdentifier<any>>
    {
        return this._registeredDependencies;
    }

    /**
     * Bind a service or dependency to the container for DI usage.
     * 
     * @param identifier 
     * @returns 
     */
    public bind<T>(identifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
        if (!this.includes(identifier)) {
            const metadata: DependencyDecoratorMetadata | undefined = Reflect.getMetadata(DependencyDecoratorKey, identifier);

            if(this.isService(identifier))
            {
                this._registeredServices.push(identifier);
            } else if(this.isDependency(identifier))
            {
                this._registeredDependencies.push(identifier)
            }
            
            return super.bind(identifier)
        }

        throw new Error("Service definition already defined");
    }

    private isService(value: unknown): boolean
    {
        return this.isDependency(value)
                && false; //!TODO: Implement logic for start / stop check. 
    }

    private isDependency(value: unknown): boolean 
    {
        return value 
            && typeof value === "function"
            && Reflect.getMetadata(DependencyDecoratorKey, value);
    }

    /**
     * Check or the service container has a value already bound. 
     * 
     * @param value 
     * @returns 
     */
    public includes(value: any): boolean 
    {
        return this.registeredServices.includes(value) || this.registeredDependencies.includes(value);
    }
}
