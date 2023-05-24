import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Jogo extends React.Component {
  state = {
    questions: '',
  };

  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    const { history } = this.props;
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        const invalidToken = 3;
        if (data.response_code === invalidToken) {
          throw new Error('Token inválido');
        }
        this.setState({
          questions: data.results,
        });
      })
      .then(() => console.log('fetch realizado'))
      .catch(() => history.push('/'));
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {questions.length > 0
        && <Questions questions={ questions } />}
      </div>
    );
  }
}

export default Jogo;

Jogo.propTypes = {
  history: propTypes.objectOf,
}.isRequired;
