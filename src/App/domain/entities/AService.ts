/** A service model for autoloading. */
export default abstract class AService 
{
    abstract start: () => void;
    abstract stop?: () => void;
}