import React from 'react';
import { ContextExclusionPlugin } from 'webpack';

export default class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
        this.canvas = null
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = "#FFFFFF";
        this.context.font= '10px Arial';
        this.context.fillRect(0,0,context.canvas.width, context.canvas.height);
        */
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
                <canvas id="tempCanvas"></canvas>
                
            </section>
        );
    }
}