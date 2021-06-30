import React from 'react';

export default class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasGridRef = React.createRef();
        this.canvasDataRef = React.createRef();
        this.state = {
            showLegend: false
        }
        this.toggleLegend = this.toggleLegend.bind(this);
    }

    componentDidMount() {
        this.canvasGrid = this.canvasGridRef.current;
        this.contextGrid = this.canvasGrid.getContext('2d');
        this.contextGrid.fillStyle = "#FF00FF";
        this.contextGrid.fillRect(0,0, this.canvasGrid.width, this.canvasGrid.height);

        this.canvasData = this.canvasDataRef.current;
        this.contextData = this.canvasData.getContext('2d');
        this.contextData.fillStyle = "#00FFFF";
        this.contextData.fillRect(this.canvasData.width/2, this.canvasData.height/2,this.canvasData.width, this.canvasData.height)
    }

    toggleLegend() {
        this.setState((state) => ({
            showLegend: !state.showLegend
        }));
    }

    render() {
        return (
            <section className="tempCanvas">
                <div className="header">
                    <h3>Temperatura de impresora</h3>
                    <button onClick={this.toggleLegend}>?</button>
                </div>
                <div class="canvasHolder">
                    <canvas ref={this.canvasGridRef} id="gridCanvas"></canvas>
                    <canvas ref={this.canvasDataRef} if="dataCanvas"></canvas>
                </div>
                <div className={"leyenda "  + (this.state.showLegend ? "" : "hide")}>
                    <span>Extrusor <span className="spanBox blueBox"></span></span>
                    <span>Cama <span className="spanBox greenBox"></span></span>
                </div>
                
            </section>
        );
    }
}