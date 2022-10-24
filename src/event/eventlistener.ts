import Event from './event';

abstract class EventListener {

    abstract handle(event: Event): void;

}

export default EventListener;