import EventType from "./eventtype";
import Event from "./event";
import EventListener from "./eventlistener";

class EventBus {

    private listeners: Map<EventType, Array<EventListener>>;

    constructor() {
        this.listeners = new Map<EventType, Array<EventListener>>();
    }

    on(eventType: EventType, listener: EventListener) {
        const listeners: Array<EventListener> = this.listeners.get(eventType) ?? [];
        listeners.push(listener);

        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, listeners);
        }
    }

    publish(eventType: EventType, event: Event) {
        if (this.listeners.has(eventType)) {
            const eventListeners: Array<EventListener> = this.listeners.get(eventType) ?? [];

            for (let eventListener of eventListeners) {
                eventListener.handle(event);
            }
        }
    }
}

export default EventBus;