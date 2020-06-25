import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import ImageCarousel from './ImageCarousel.jsx';
// import CollapsibleCarousel from './Collapsible.jsx'


class App0 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 11,
      current: [],
      description: 'Youre a hairy wizard! *flails pixelated arms to the left*, *flails pixelated arms to the right* *head remains intact but only from the nose up*. Im a hhhhwwwhat?!\n Your honor, we have another cut and dry case of yet another baby genius who thinks he can swindle the american justice system. We must try this cunning infant as an adult or we may have a crime wave on our hands the likes of which we have never smelled before.',
      lines: 'FEATURES\n★  plz send new non silly brain plz! things are way too silly!\n★  steady havin what I believe a psychiatrist would call a "mental breakdance"\n★  when it comes to my mental brain, im just lookin 4 the right crank to pull (keep pulling the wrong cranks, turns out)\n★  not everyday that u get so hilarious brained that u invent the solutions machine',
      features: '',
      additionalText1: '',
      additionalText2: '',
      additionalText3: '',
      readMore: 'READ MORE'
    };
    this.toggleAdditionalText = this.toggleAdditionalText.bind(this);

  }

  componentDidMount = () => {
   axios.get(`/carousels/${this.state.id}`)
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
        features: this.state.lines.split('\n')[0],
         additionalText1: this.state.lines.split('\n')[1],
         additionalText2: this.state.lines.split('\n')[2],
         additionalText3: this.state.lines.split('\n')[3],
         additionalText4: this.state.lines.split('\n')[4],
        readMore: 'COLLAPSE'
      })
    } else {
      this.setState({
        features: this.state.lines[0],
        additionalText1: this.state.lines[1],
         additionalText2: this.state.lines[2],
         additionalText3: this.state.lines[3],
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
      <p className="description-text" id="feature">{this.state.lines.split('\n')[0]}</p>
      <p className="description-text" id="text1">{this.state.lines.split('\n')[1]}</p>
      <p className="description-text" id="addText2">{this.state.lines.split('\n')[2]}</p>
      <p className="description-text" id="addText3">{this.state.lines.split('\n')[3]}</p>
      <p className="description-text" id="addText4">{this.state.lines.split('\n')[4]}</p>
      </Collapsible>
      </div>



      </div>
    );
  }
}

export default App0;


