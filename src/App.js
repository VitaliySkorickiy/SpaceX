import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Features from './Components/Features/Features'
import Footer from './Components/Footer/Footer'
import Calendar from './Components/Calendar/Calendar'
import Details from './Components/Details/Details'
import FetchData from './service/FetchData'

import './style.css'
class App extends React.Component {

  // создаем переменную для работы с классом
  fetchData = new FetchData()

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null
  }
  // метод Ж\Ц до рендера
  // получили объект fetchData с его всеми методами
  componentDidMount() {
    // вызвали нужный метод и получили в нем данные
    this.updateRocket()
    this.updateCompany()
  }
  // метод для добавления ракет
  updateRocket() {
    // вызываем метод getRocket для обработки с помощью then
    this.fetchData.getRocket()
      // беерём имена ракет
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) })
        return data
      })
      //  находим нужную ракету
      .then((data) => data.find((item) => item.name === this.state.rocket))
      // передаем параметры ракеты в state
      .then((rocketFeatures) => {
        this.setState({ rocketFeatures });
      });
  }

  // метод который меняет ракеты
  changeRocket = (rocket) => {
    this.setState({
      rocket
    }, this.updateRocket)
  }
  updateCompany = () => {
    this.fetchData.getCompany()
      .then(data => this.setState({ company: data }))
  }

  render() {
    return (
      <BrowserRouter>

        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Route exact path='/' render={() => this.state.company && <Home company={this.state.company} />} />
        <Route path='/rocket' render={() => this.state.rocketFeatures && <Features {...this.state.rocketFeatures} />} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/details/:id' component={Details} />
        {this.state.company && <Footer {...this.state.company} />}
      </BrowserRouter >
    );
  }
}

export default App;
