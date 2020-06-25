import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import ImageCarousel from './ImageCarousel.jsx';
// import CollapsibleCarousel from './Collapsible.jsx'


class App0 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: [],
      description: '',
      lines: '',
      // features: '',
      // additionalText1: '',
      // additionalText2: '',
      // additionalText3: '',
      readMore: 'READ MORE'
    };
    this.toggleAdditionalText = this.toggleAdditionalText.bind(this);

  }

  componentDidMount = () => {
   axios.get(`/carousels/${this.props.id}`)
   .then((data) => {
    this.setState({
      current: data.data[0],
      description: data.data[0].app_description,
      features: '',
      lines: (data.data[0].additional_text).split('\n'),
      additionalText1: '',
      additionalText2: '',
      additionalText3: '',
      additionalText4: ''
    })
   })
  .then( () => (
    console.log('get req successful', this.state.current)
  ))
  .catch(err => console.log(err));
  }

  toggleAdditionalText(){
    if(this.state.readMore === 'READ MORE'){
      this.setState({
        features: this.state.lines[0],
         additionalText1: this.state.lines[1],
         additionalText2: this.state.lines[2],
         additionalText3: this.state.lines[3],
         additionalText4: this.state.lines[4],
        readMore: 'COLLAPSE'
      })
    } else {
      this.setState({
        // features: this.state.lines[0],
        // additionalText1: this.state.lines[1],
        //  additionalText2: this.state.lines[2],
        //  additionalText3: this.state.lines[3],
        readMore: 'READ MORE'
      })
    }

  }

  render() {
    return (
      <div className="carouselContents">
      <ImageCarousel id={this.props.id}/>
      <div className="container-carousel-service">
      <p className="description-text" style={{marginTop: '5px'}}>{this.state.description} </p>



      <Collapsible  id="readmore" transitionTime='280'
      dataPlacement="top" className="comet-popover--top-left-aligned" trigger=<strong style={{
        display: 'grid',
        cursor: 'pointer',
        gridArea: 'readMore',
        gridTemplate: 'feature text1 text2 text3 readmore',
        color: 'green',
        justifyContent: 'center',
        alignText: 'center',
        fontfamily: 'Arial'
      }}>{this.state.readMore}</strong> onOpening={this.toggleAdditionalText} onClosing={this.toggleAdditionalText}>
      <p className="description-text" id="feature">{this.state.lines[0]}</p>
      <p className="description-text" id="text1">{this.state.lines[1]}</p>
      <p className="description-text" id="addText2">{this.state.lines[2]}</p>
      <p className="description-text" id="addText3">{this.state.lines[3]}</p>
      <p className="description-text" id="addText4">{this.state.lines[4]}</p>
      </Collapsible>
      </div>



      </div>
    );
  }
}

export default App0;


