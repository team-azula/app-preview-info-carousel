import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import ImageCarousel from './ImageCarousel.jsx';
// import CollapsibleCarousel from './Collapsible.jsx'


class App0 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      current: {data: [
        {
          app_id: 1,
          preview_data: {
            additional_text: '',
            app_description: '',
            images: [
              "https://media.gettyimages.com/photos/small-dog-with-large-championship-ribbon-picture-id83356895?k=6&m=83356895&s=612x612&w=0&h=YrHsNKuQmtxtgdosKcVJBSwTr65B6T9e8p5gQzzByw4=",
              "https://media.gettyimages.com/photos/chris-ware-color-illustration-of-man-wondering-how-big-the-tree-he-is-picture-id166174787?k=6&m=166174787&s=612x612&w=0&h=sRiLNX35EuCIxw8S9NjGknaIM04xVs2l_oi5l-Bx0eE=",
              "https://media.gettyimages.com/photos/group-of-children-in-a-treehouse-blowing-bubbles-picture-id517668448?k=6&m=517668448&s=612x612&w=0&h=uCl7KCXNPxV4AgCOEEjTS32p0GYWR_PBtnlpGXUSncY=",
              "https://media.gettyimages.com/photos/childhood-friends-hammering-and-working-to-build-their-treehouse-picture-id518734384?k=6&m=518734384&s=612x612&w=0&h=w_61eSJrIDvXyRbvjE8W83EdNFjfPw1KguY7YMXaff8="
            ]
          }
        }
      ]},
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
    console.log('making ajax request with id: ', this.state.id);
    axios.get(`/carousels/${this.state.id}`)
    .then((response) => {
      let { preview_data } = response.data[0];
      this.setState({
        current: response,
        description: preview_data.app_description,
        features: '',
        lines: (preview_data.additional_text || '').split('\n'),
        additionalText1: '',
        additionalText2: '',
        additionalText3: '',
        additionalText4: ''
      })
    })
    .then(() => (
      console.log('get req successful', this.state.current)
    ))
    .catch(err => console.log(err));
  }

  toggleAdditionalText(){
    const { lines } = this.state;
    if(this.state.readMore === 'READ MORE') {
      this.setState({
        features: this.state.lines[0],
         additionalText1: lines[1],
         additionalText2: lines[2],
         additionalText3: lines[3],
         additionalText4: lines[4],
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
    const { lines, current } = this.state;
    const { id } = this.props;
    const prevData = this.state.current.data[0].preview_data
    return (
      <div className="carouselContents">
        <ImageCarousel
          id={id}
          current={current}
          prevData={prevData} />
        <div className="container-carousel-service">
          <p className="description-text" style={{marginTop: '5px'}}>{this.state.description} </p>
          <Collapsible
            id="readmore"
            transitionTime={280}
            dataPlacement="top"
            className="comet-popover--top-left-aligned"
            trigger={
              <strong style={{
                display: 'grid',
                cursor: 'pointer',
                gridArea: 'readMore',
                gridTemplate: 'feature text1 text2 text3 readmore',
                color: 'green',
                justifyContent: 'center',
                alignText: 'center',
                fontfamily: 'Arial'
              }}>{this.state.readMore}
              </strong>}
            onOpening={this.toggleAdditionalText}
            onClosing={this.toggleAdditionalText}
          >
            <p className="description-text" id="feature">{lines[0]}</p>
            <p className="description-text" id="text1">{lines[1]}</p>
            <p className="description-text" id="addText2">{lines[2]}</p>
            <p className="description-text" id="addText3">{lines[3]}</p>
            <p className="description-text" id="addText4">{lines[4]}</p>
          </Collapsible>
        </div>
      </div>
    );
  }
}

export default App0;


