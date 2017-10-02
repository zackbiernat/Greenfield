class QuestionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionType: 'textResponse',
      currentQuestion: null,
      currentResponse: ''
    };
  }

  // componentDidMount() {
  //   TODO: display something by default
  // }
  handleQuestionTypeClick (questionType) {
    this.currentQuestionType = questionType;
    this.setQuestion();
  }

  setQuestion () {
    this.getQuestion(this.currentQuestionType, (question) =>
      this.setState({
        currentQuestion: question
      })
    );
  }

  getQuestion (questionType, callback) => {
    let urlRoute = 'http://127.0.0.1:8080/questions?questionType=' + questionType;
    $.ajax({
      url: urlRoute,
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'jsonp',
      success: function (data) {
        console.log('success', data);
        callback(data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error', errorThrown);
      }
    });
  }



  render() {
    //TODO: delegate the rendering to sub-components
    //<PromptView prompt={this.currentQuestion.questionText}>
    //<ResponseView question={this.currentQuestion.answerText}>
    //<QuestionButtons question={this.currentQuestion}>
    return (
      <div>Select a question type
        <a
          href=""
          onClick={() => this.handleQuestionTypeClick(textResponse)} > Text Response
        </a>
      </div>

      <div className="head-question">
        <div className="head-question-prompt">
          {this.currentQuestion.questionText}
        </div>
        <div className="head-question-response">
          <form>
            <input
              className="response-field"
              type="text"
              value={this.state.currentResponse} />
          </form>
        </div>
        <div className="head-question-buttons">
          <button className="btn-submit">
            <span className="btn-text">Submit</span>
          </button>
        </div>
      </div>
    )
  }
}
