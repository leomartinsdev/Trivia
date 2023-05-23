import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Questions extends Component {
  state = {
    shuffler: true,
    questionsSort: [],
    correct: '',
    // isToClear: false,
    // seconds: 30,
    // isDisabled: false,
  };

  componentDidUpdate() {
    this.shufflerCondition();
  }

  shufflerCondition = () => {
    const { questions } = this.props;
    const eachQuestion = questions[0];
    const { shuffler, questionsSort } = this.state;
    const correctAnswer = eachQuestion.correct_answer;
    console.log(correctAnswer);
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
      return shuffledAnswers;
    } return questionsSort;
  };

  render() {
    const { questions } = this.props;
    if (!questions) {
      return (<p>Error</p>);
    }
    const { questionsSort, correct } = this.state;
    console.log(questionsSort);
    return (
      <div>
        { questions.length > 0
          && (
            <div>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{questions[0].question}</p>
              <div>
                <div data-testid="answer-options">
                  {questionsSort.map((answer, index) => (
                    <button
                      key={ index }
                      className="answer-button"
                      value={ answer }
                      data-testid={
                        answer === correct
                          ? 'correct-answer'
                          : `wrong-answer-${index}`
                      }
                    >
                      { answer }
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
