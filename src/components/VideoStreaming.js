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
                    <img ref={this.imgRef} src="" alt="Camera streaming"/>
                </div>
            </section>
        );
    }
}