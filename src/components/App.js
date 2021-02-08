import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  handleChangeType = (newType) => {
    this.setState(previousState => {
      return {
        filters: {
          ...previousState.filters,
          type: newType
        }
      }
    })
  }

  handleFindPetsClick = () => {
    let filteredURLs = {
      'all': '/api/pets',
      'cat': '/api/pets?type=cat',
      'dog': '/api/pets?type=dog',
      'micropig': '/api/pets?type=micropig'
    }
    fetch(filteredURLs[this.state.filters.type])
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({
          pets: json
        })
      })
  }

  onAdoptPet = (id) => {
    let pets = this.state.pets.map(p => {
      return p.id === id ? {...p, isAdopted: true} : p
    })
    this.setState({pets: pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default App
