export default interface IModuleLocator {
    findAll(globPattern: string): Promise<Array<new (...args: any) => any>>
}
