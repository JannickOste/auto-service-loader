/** A service model for autoloading. */
export default interface ServiceInterface 
{
    start: () => void;
    stop?: () => void;
}