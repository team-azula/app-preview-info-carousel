import React from 'react';
import Collapsible from 'react-collapsible';


const dropdownOpen = () => {
  <Collapsible  id="readmore" dataPlacement="bottom" className="comet-popover--top-left-aligned" trigger=<strong style={{
    display: 'grid',
    cursor: 'pointer',
    gridArea: 'readMore',
    gridTemplate: 'feature text1 text2 text3 readmore',
    color: 'green',
    justifyContent: 'center',
    alignText: 'center',
    fontfamily: 'Arial'
  }}>{this.state.readMore}</strong> onOpening={this.toggleAdditionalText} onClosing={this.toggleAdditionalText}>
  <p className="description-text" id="feature" style={{
    display: 'grid',
    gridArea: 'feature'
  }}>{this.state.lines[0]}</p>
  <p className="description-text" id="text1" style={{
    display: 'grid',
    gridArea: 'text1'
  }}>{this.state.lines[1]}</p>
  <p className="description-text" id="addText2" style={{
    display: 'grid',
    gridArea: 'text2'
  }}>{this.state.lines[2]}</p>
  <p className="description-text" id="addText3" style={{
    display: 'grid',
    gridArea: 'text3'
  }}>{this.state.lines[3]}</p>
  </Collapsible>
}