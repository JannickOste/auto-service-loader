import ServiceManager from "./App/infrastructure/managers/ServiceManager";
import InjectedDummyService from "./test/dummy/DummyDependency";
import { DummyService } from "./test/dummy/DummyService.service";

const main = async() => {
    const manager = new ServiceManager();
    const container = await manager.fetchServiceContainer("./src/test/dummy/**/*.ts")
    console.dir(container.get(DummyService))

    await manager.startAllServices(container);
}

main();