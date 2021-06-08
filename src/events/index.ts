import { EventEmitter } from 'events';
import SpotifyEventTypes from './eventTypes';

interface SpotifyEventListenerC {
    on(event: SpotifyEventTypes, listener: Function): this;
    once(event: SpotifyEventTypes, listener: Function): this;
    emit(event: SpotifyEventTypes);
}

class SpotifyEventListenerC extends EventEmitter {

}

const SpotifyEventListener = new SpotifyEventListenerC();
export default SpotifyEventListener;