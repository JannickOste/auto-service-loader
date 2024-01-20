import { inject } from "inversify";
import DependencyDecorator from "../../App/domain/decorators/DependencyDecorator/DependencyDecorator";
import ServiceInterface from "../../App/domain/entities/ServiceInterface";

@DependencyDecorator()
export default class InjectedDummyService  {  


    start: () => void = () => {
        console.log(`Starting ${this.constructor.name}`)
    }

    stop: (() => void)  = () => {
        console.log(`Stopping ${this.constructor.name}`)
    }
    
}

@DependencyDecorator()
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
