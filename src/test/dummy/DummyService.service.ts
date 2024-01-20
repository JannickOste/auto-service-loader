import { inject } from "inversify";
import DependencyDecorator from "../../App/domain/decorators/DependencyDecorator/DependencyDecorator";
import AService from "../../App/domain/entities/AService";

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
export class DummyService extends AService
{
    constructor(
        @inject(InjectedDummyService) private readonly service: InjectedDummyService
    ) {
        super();
    }

    start: () => void = () => {
        console.log(`Starting ${this.constructor.name}`)
    }

    stop: (() => void)  = () => {
        console.log(`Stopping ${this.constructor.name}`)
    }
    
}
