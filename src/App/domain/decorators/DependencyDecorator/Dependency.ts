import "reflect-metadata";
import { injectable } from "inversify";
import { DependencyDecoratorProps } from "./DependencyDecoratorProps";
import { DependencyDecoratorMetadata } from "./DependencyDecoratorMetadata";
import { DependencyDecoratorKey } from "./DependencyDecoratorKey";

export default function Dependency<T extends abstract new (...args: any) => unknown>(props?: DependencyDecoratorProps): (target: T) => T {
    return function (target: T): T {
        target = injectable()(target);
        const defaultParsers: { [key in keyof DependencyDecoratorMetadata]: () => any } = {
            name: () => target.name,
            dependencies: () => Object.values((Reflect.getMetadata("inversify:tagged", target) ?? {}))
                                                .map(set => (set as any)[0].value),
            priority: () => Number.MAX_SAFE_INTEGER,
            isService: () => false
        };

        const metadata: any = (props ?? {});
        const existingKeys = Object.keys(metadata);
        for (const [key, callback] of Object.entries(defaultParsers)) {
            if (!existingKeys.includes(key)) {
                metadata[key] = callback();
            }
        }

        Reflect.defineMetadata(DependencyDecoratorKey, metadata, target);

        return target;
    };
}

