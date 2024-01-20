import { DependencyDecoratorKey } from "../../../../App/domain/decorators/DependencyDecorator/DependencyDecoratorKey";
import InjectedDummyService, { DummyService } from "../../../dummy/DummyService.service"
import "reflect-metadata"

describe("Testing ServiceDecorator", () => {
    const serviceMetadataKey = DependencyDecoratorKey
    const serviceType = DummyService;
    
    test("assigns the correct metadata key for additional data", () => {
        expect(Reflect.hasMetadata(serviceMetadataKey, serviceType)).toEqual(true)
    })

    test("assigns the correct metadata key for inversify", () => {
        const service = InjectedDummyService;
        
        expect(Reflect.hasMetadata("inversify:paramtypes", service)).toEqual(true)
    })
    
    test("assigns className if no name defined", () => {
        expect(Reflect.getMetadata(serviceMetadataKey, serviceType)?.name).toEqual(serviceType.name)
    })
    
    test("assigns the correct dependencies", () => {
        const dependencies: Array<Function> = (Reflect.getMetadata(serviceMetadataKey, serviceType)?.dependencies ?? [])

        expect(dependencies.length && dependencies.findIndex((v) => v.constructor === undefined) === -1).toBeTruthy()
    });
})