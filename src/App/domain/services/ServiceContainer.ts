import { Container, interfaces } from "inversify";


export class ServiceContainer extends Container {
    private readonly _registeredServices: Array<interfaces.ServiceIdentifier<any>> = [];
    public get registeredServices(): Array<interfaces.ServiceIdentifier<any>> {
        return this._registeredServices;
    }

    public registerService<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
        if (!this._registeredServices.includes(serviceIdentifier)) {
            this._registeredServices.push(serviceIdentifier);

            return super.bind(serviceIdentifier);
        }

        throw new Error("Service definition already defined");
    }
}
