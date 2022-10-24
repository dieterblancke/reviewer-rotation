class Event {

    private readonly _data: any;

    constructor(data: any) {
        this._data = data;
    }

    get data() {
        return this._data;
    }
}

export default Event;