import React from 'react';

export default class VideoStreaming extends React.Component {
    constructor(props){
        super(props);
        this.imgRef= React.createRef();
    }

    componentDidMount() {
        var image = this.imgRef.current;
        this.props.socket.on('liveStream', (data) => {
            image.src = data;
        })
        this.props.socket.emit('startStreaming');
    }

    render() {
        return (
            <section className="videoStreaming">
                <div>
                    <img ref={this.imgRef} alt="Camera streaming" className="streamImg" src="http://192.168.1.21/image_stream.jpg"/>
                </div>
            </section>
        );
    }
}