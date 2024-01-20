import { DependencyDecoratorProps } from "./DependencyDecoratorProps";


export type DependencyDecoratorMetadata = DependencyDecoratorProps & {
    dependencies: any[];
    isService: boolean;
};
