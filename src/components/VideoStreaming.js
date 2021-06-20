import React from 'react';

export default class VideoStreaming {
    constructor(props){
        super(props);
    }

    render() {
        var isFilament = this.state.filament;
        return (
            <section className="videoStreaming">
                <div>
                    <img src="http://192.168.1.21/stream.mjpg" />
                </div>
            </section>
        );
    }
}