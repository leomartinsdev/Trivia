import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Questions extends Component {
  state = {
    shuffler: true,
    questionsSort: [],
    correct: '',
    selectedAnswer: null,
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
    this.setState({ selectedAnswer: answer });
  };

  render() {
    const { questions } = this.props;
    if (!questions) {
      return <p>Error</p>;
    }
    const { questionsSort, correct, selectedAnswer } = this.state;

    return (
      <div>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[0].category}</p>
            <p data-testid="question-text">{questions[0].question}</p>
            <div>
              <div data-testid="answer-options">
                {questionsSort.map((answer, index) => (
                  <button
                    onClick={ () => this.handleAnswerClick(answer) }
                    key={ index }
                    className="answer-button"
                    value={ answer }
                    style={ {
                      border:
                        selectedAnswer === null
                          ? ''
                          : answer === correct
                            ? '3px solid rgb(6, 240, 15)'
                            : '3px solid red',
                    } }
                    data-testid={
                      answer === correct
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
                  >
                    {answer}
                  </button>
                ))}
              </div>
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
