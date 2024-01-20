import IServiceManager from "../../../../App/domain/services/IServiceManager";
import ServiceManager from "../../../../App/infrastructure/managers/ServiceManager";
import { ServiceContainer } from "../../../../App/domain/services/ServiceContainer";
import InjectedDummyService, { DummyService } from "../../../dummy/DummyService.service";
import DummyDependency from "../../../dummy/DummyDependency";

describe('Testing ServiceManager', () => {
    const getManager = () => new ServiceManager();

    test("fetchServiceContainer returns correct type.", async() => 
    {
        expect(await getManager().fetchServiceContainer("./src/test/**/*.{ts,js}"))
            .toEqual(expect.any(ServiceContainer));
    });
    
    test("fetchServiceContainer loads services into container", async() => 
    {
        expect((await getManager().fetchServiceContainer("./src/test/**/*.{ts,js}")).get(InjectedDummyService))
            .toEqual(expect.any(InjectedDummyService));
    });

    // test("fetchServiceContainer loads dependencies into container", async() => 
    // {
    //     expect((await getManager().fetchServiceContainer()).get(DummyDependency))
    //         .toEqual(expect.any(DummyDependency));
    // });

    test("fetchServiceContainer loads services into container", async() => 
    {
        const manager  = getManager();
        const container = await manager.fetchServiceContainer("./src/test/**/*.{ts,js}");

        await manager.startAllServices(container)
    });

    //!TODO ADD TEST FOR START/STOP
});
