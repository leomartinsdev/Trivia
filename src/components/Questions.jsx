import React, { Component } from 'react';
import propTypes from 'prop-types';
import '../CSS/Jogo.css';
import { connect } from 'react-redux';
import { saveScore } from '../redux/actions';

const oneSecond = 1000; // define 1 segundo
const thirtySeconds = 30000; // define 30 segundos

// 10 + (timer * dificuldade) fórmula pontuação

class Questions extends Component {
  state = {
    shuffler: true,
    questionsSort: [],
    correct: '',
    selectedAnswer: null,
    answered: false,
    isDisabled: false,
    timer: 30,
    indice: 0,
    interval: setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, oneSecond),
  };

  componentDidMount() {
    const { interval } = this.state;
    setTimeout(() => {
      this.changeToDisabled();
      clearInterval(interval);
    }, thirtySeconds);
  }

  componentDidUpdate() {
    this.shufflerCondition();
  }

  changeToDisabled = () => {
    this.setState({
      isDisabled: true,
    });
  };

  shufflerCondition = () => {
    const { questions } = this.props;
    const { shuffler, indice } = this.state;
    const eachQuestion = questions[indice]; // pega a primeira questão do array de 5 questões
    const correctAnswer = eachQuestion.correct_answer; // atribui a resposta certa a essa variável
    const incorrectAnswers = eachQuestion.incorrect_answers;
    const fisherYates = 0.5;
    if (shuffler) {
      const shuffledAnswers = [...incorrectAnswers, correctAnswer]
        .sort(() => Math.random() - fisherYates); // cria um array com as respostas embaralhadas (as certas e as erradas)
      this.setState({
        questionsSort: shuffledAnswers, // atribui ao localState questionsSort as respostas embaralhadas
        shuffler: false, // muda o shuffler para false (ele começa como true)
        correct: correctAnswer, // atribui ao localState correct a resposta certa
      });
    }
  };

  sumPoints = () => {
    const { timer } = this.state;
    const { questions } = this.props;
    const eachQuestion = questions[0];
    const ten = 10;
    const two = 2;
    const three = 3;

    if (eachQuestion.difficulty === 'hard') {
      return ten + (timer * three);
    } if (eachQuestion.difficulty === 'medium') {
      return ten + (timer * two);
    } if (eachQuestion.difficulty === 'easy') {
      return ten + timer;
    }
    return 0;
  };

  handleAnswerClick = (answer) => {
    const { selectedAnswer } = this.state;
    const { questions, dispatch } = this.props;
    const eachQuestion = questions[0];
    const correctAnswer = eachQuestion.correct_answer;
    this.setState({ selectedAnswer: answer, answered: true });
    if (answer === correctAnswer) {
      console.log('cliquei', selectedAnswer);
      dispatch(saveScore(this.sumPoints()));
    }
  };

  handleClickNext = () => {
    const { indice } = this.state;
    const { questions } = this.props;
    if (indice === questions.length - 1) {
      this.setState(() => ({
        indice: 4,
      }));
    } else {
      this.setState((prevState) => ({
        indice: prevState.indice + 1,
        shuffler: true,
      }));
    }
  };

  render() {
    const { questions } = this.props;
    if (!questions) { // se não tiver nenhuma questão, renderiza um erro. Isso acontecerá no caso do token estar expirado
      return <p>Error</p>;
    }
    const { questionsSort, correct, answered, timer, isDisabled, indice } = this.state;

    const answerButtons = questionsSort.map((answer, index) => {
      let buttonClass = 'answer-button';
      if (answered) {
        buttonClass += answer === correct ? ' correct' : ' wrong';
      }

      return (
        <button
          onClick={ () => this.handleAnswerClick(answer) }
          key={ index }
          disabled={ isDisabled }
          className={ buttonClass }
          value={ answer }
          data-testid={
            answer === correct ? 'correct-answer' : `wrong-answer-${index}`
          }
        >
          {answer}
        </button>
      );
    });

    return (
      <div>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[indice].category}</p>
            <p data-testid="question-text">{questions[indice].question}</p>
            <div>
              <div data-testid="answer-options">{answerButtons}</div>
            </div>
            <span>
              Timer:
              {' '}
              { timer }
            </span>
            {
              answered && (
                <button
                  data-testid="btn-next"
                  onClick={ this.handleClickNext }
                >
                  Next
                </button>
              )
            }
          </div>
        )}
      </div>
    );
  }
}

Questions.propTypes = ({
  questions: propTypes.arrayOf,
}).isRequired;

export default connect()(Questions);
