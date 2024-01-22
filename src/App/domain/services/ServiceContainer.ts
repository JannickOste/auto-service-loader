import { Container, interfaces } from "inversify";


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
        if (!this._registeredServices.includes(identifier)) {
            this._registeredServices.push(identifier);

            return super.bind(identifier)
        }

        throw new Error("Service definition already defined");
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
