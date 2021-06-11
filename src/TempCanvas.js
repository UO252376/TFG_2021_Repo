class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = useRef(null);
    }

    componentDidMount() {
        this.canvas = this.canvasRev.current;
        this.context = this.canvas.getContext('2d');
        this.initCanvas(this.context);
    }
    
    initCanvas(context) {
        context.fillStyle = "#000000";
        context.font= '10px Arial';
        context.fillRect(0,0,context.canvas.width, context.canvas.height);
        context.fillText("Hello World", 10, 50);
    }

    render() {
        return (
            <div>
                <canvas id="tempCanvas" height="200" width="300"></canvas>
            </div>
        );
    }
}