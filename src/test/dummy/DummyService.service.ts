import { inject } from "inversify";
import Dependency from "../../App/domain/decorators/DependencyDecorator/Dependency";
import ServiceInterface from "../../App/domain/entities/ServiceInterface";

@Dependency()
export default class InjectedDummyService  {  


    start: () => void = () => {
        console.log(`Starting ${this.constructor.name}`)
    }

    stop: (() => void)  = () => {
        console.log(`Stopping ${this.constructor.name}`)
    }
    
}

@Dependency()
export class DummyService implements ServiceInterface
{
    constructor(
        @inject(InjectedDummyService) private readonly service: InjectedDummyService
    ) {
    }

    start: () => void = () => {
        console.log(`Starting ${this.constructor.name}`)
    }

    stop: (() => void)  = () => {
        console.log(`Stopping ${this.constructor.name}`)
    }
    
}
