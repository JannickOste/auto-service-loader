export default interface IDependencyLocator {
    findAll(globPattern: string): Promise<Array<new (...args: any) => any>>
}
