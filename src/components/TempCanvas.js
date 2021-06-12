import React from 'react';
import { ContextExclusionPlugin } from 'webpack';

export default class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.context = this.canvas.getContext('2d');
        this.initCanvas(this.context);
    }
    
    initCanvas(context) {
        context.canvas.width = window.innerWidth * 0.7;
        context.canvas.height = window.innerHeight * 0.3;
        context.fillStyle = "#FFFFFF";
        context.font= '10px Arial';
        context.fillRect(0,0,context.canvas.width, context.canvas.height);
    }

    render() {
        return (
            <section className="tempCanvas">
                <div className="header">
                    <h3>Temperatura de impresora</h3>
                    <button>?</button>
                </div>
                <div className="leyenda" hidden>
                    <span>Extrusor <span className="blueBox"></span></span>
                    <span>Cama <span className="greenBox"></span></span>
                </div>
                <canvas ref={this.canvasRef} id="tempCanvas" height="300" width="400"></canvas>
                
            </section>
        );
    }
}