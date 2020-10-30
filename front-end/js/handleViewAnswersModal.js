const getAnswerByQuizId = async (quizId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/answer?quizId=${quizId}`, {
      method: 'GET'
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createViewAnswersModal = async (quizId) => {
  const quizData = await getQuizDataById(quizId);
  if (!quizData) {
    toastr.error('Erro ao visualizar questionário.');
    return null;
  }

  const answerData = await getAnswerByQuizId(quizId);
  if (!answerData.length) {
    toastr.error('Este questionário não possui respostas cadastradas.');
    return null;
  }

  $('#modal-view-answers-title').html(quizData.quiz_title);
  $('#modal-view-answers-body').html('');

  quizData.quiz_questions.forEach((question, i) => {
    let arrAnswers = [];
    answerData.forEach((answer) => {
      arrAnswers.push({
        author: answer.answer_author,
        creation_date: answer.creation_date,
        answer: answer.quiz_answers[i]
      });
    });
    appendQuestionAndAnswersToModal(question, arrAnswers);
  });

  $('#modal-view-answers').modal('show');
};

const appendQuestionAndAnswersToModal = (question, arrAnswers) => {
  $('#modal-view-answers-body').append(`
    <label class="mt-2" for="answer-author"><b>${question}</b></label>
  `);

  arrAnswers.forEach((answer) => {
    const creationDate = moment(answer.creation_date).format('DD/MM/YYYY');
    $('#modal-view-answers-body').append(`
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <p class="mb-1">${answer.answer}</p>
        <small class="text-muted text-left">${answer.author} em ${creationDate}</small>
      </div>
      `
    );
  });
};