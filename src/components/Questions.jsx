import React, { Component } from 'react';
import propTypes from 'prop-types';
import '../CSS/Jogo.css';

export default class Questions extends Component {
  state = {
    shuffler: true,
    questionsSort: [],
    correct: '',
    selectedAnswer: null,
    answered: false,
  };

  componentDidUpdate() {
    this.shufflerCondition();
  }

  shufflerCondition = () => {
    const { questions } = this.props;
    const eachQuestion = questions[0];
    const { shuffler } = this.state;
    const correctAnswer = eachQuestion.correct_answer;
    const incorrectAnswers = eachQuestion.incorrect_answers;
    const fisherYates = 0.5;
    if (shuffler) {
      const shuffledAnswers = [...incorrectAnswers, correctAnswer]
        .sort(() => Math.random() - fisherYates);
      this.setState({
        questionsSort: shuffledAnswers,
        shuffler: false,
        correct: correctAnswer,
      });
    }
  };

  handleAnswerClick = (answer) => {
    const { selectedAnswer } = this.state;
    if (selectedAnswer === null) {
      this.setState({ selectedAnswer: answer, answered: true });
    }
  };

  render() {
    const { questions } = this.props;
    if (!questions) {
      return <p>Error</p>;
    }
    const { questionsSort, correct, answered } = this.state;

    const answerButtons = questionsSort.map((answer, index) => {
      let buttonClass = 'answer-button';
      if (answered) {
        buttonClass += answer === correct ? ' correct' : ' wrong';
      }

      return (
        <button
          onClick={ () => this.handleAnswerClick(answer) }
          key={ index }
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
            <p data-testid="question-category">{questions[0].category}</p>
            <p data-testid="question-text">{questions[0].question}</p>
            <div>
              <div data-testid="answer-options">{answerButtons}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Questions.propTypes = ({
  questions: propTypes.arrayOf,
}).isRequired;
