import React from 'react';

export default class VideoStreaming extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <section className="videoStreaming">
                <div>
                    <img src="http://192.168.1.21/stream.mjpg" />
                </div>
            </section>
        );
    }
}