
const AutoplayHOC = ViewedComponent => 
    
 class extends ViewedComponent {

        componentDidMount(){
            if(this.props.autoplay){
                this.clear = setInterval(this.play, 3000);
            }
        }
        componentDidUnmount(){
            this.clear && clearInterval(this.clear);
        }

        play = () => this.props.autoplay && this.next();

    }

export default AutoplayHOC;