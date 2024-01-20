# auto-service-loader

`auto-service-loader` is a TypeScript package designed to simplify service and dependency management in your application. It leverages decorators, dependency injection, and reflection to make it easier to organize and initialize services and dependencies.

## Installation

Install `auto-service-loader` using npm:

```bash
npm install auto-service-loader
```

Enable `experimentalDecorators` in `tsconfig.json`: 
```bash
{
  "compilerOptions": {
    "experimentalDecorators": true,
    // ... other options
  }
}
```

## Usage

### Creating a dependency
To create a dependency you just need to make a class type that has the DependencyDecorator, this decorator could be use to override default metadata or supply other data necessary for that dependency.
```typescript
// dependency.ts
import DependencyDecorator from "auto-service-loader/dist/App/domain/decorators/DependencyDecorator/DependencyDecorator";

@DependencyDecorator()
export class Dependency {
    constructor(public readonly value: string = "hello world") {}
}
```

### Creating a service
Creating a service is pretty similair to a dependency all you have to do is derive the class of the IService interface, the start/stop functionality will be used by the ServiceManager when calling a start/stop for services.
```typescript
import { IService } from "auto-service-loader";
import DependencyDecorator from "auto-service-loader/dist/App/domain/decorators/DependencyDecorator/DependencyDecorator";
import { Dependency } from "./exampledependency";
import { inject } from "inversify";

@DependencyDecorator({})
export default class TestService implements IService {
    constructor(@inject(Dependency) private readonly _dependency: Dependency) {}

    public get dependency() {
        return this._dependency;
    }

    start: () => void = () => console.log("Starting test service.");
    stop?: (() => void) | undefined = () => console.log("Stopping test service.");
}
```


### ServiceManager
The service manager is used to fetch the service container and handle the thread lifetime of the services.
```typescript
// index.ts
import { ServiceLoader } from "auto-service-loader";
import TestService from "./test.service";

const main = async () => {
    const loader = new ServiceLoader();

    const container = await loader.fetchServiceContainer("**/*.ts");

    console.dir(container.get(TestService));
    console.dir(container.get(TestService).dependency);

    await loader.startAllServices(container);
};

main();
```




## Features
- **Service Loading:** Automatically discover and initialize services based on file patterns.
- **Dependency Injection:** Use decorators and dependency injection to manage dependencies.
- **Reflective Metadata:** Leverage reflective metadata to introspect and interact with your classes.