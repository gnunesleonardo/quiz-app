const getAllQuizzes = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/quiz`, {
      method: 'GET'
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createCardListener = (quizId) => {
  $(`#open-answer-modal${quizId}`).on('click', (event) => {
    event.stopPropagation();
    createAnswerModal(quizId);
  });

  $(`#open-view-answers-modal${quizId}`).on('click', (event) => {
    event.stopPropagation();
    createViewAnswersModal(quizId);
  });
};

const createSingleQuizCard = (quizData) => {
  const creationDate = moment(quizData.creation_date).format('DD/MM/YYYY');
  $('#quiz-cards').append(`
      <div id="${quizData.quiz_id}" class="card ml-2 mr-2 mt-2 mb-2">
        <div class="card-body">
          <h5 class="card-title">${quizData.quiz_title}</h5>
          <p class="card-text"><small class="text-muted">Autor(a): </small></p>
          <p class="card-text">${quizData.quiz_author}</b></p>
          <p class="card-text"><small class="text-muted">criado em ${creationDate}</small></p>
        </div>
        <div class="card-footer">
          <button id="open-answer-modal${quizData.quiz_id}" type="button" class="btn btn-custom">Responder</button>
          <button id="open-view-answers-modal${quizData.quiz_id}" type="button" class="btn btn-custom">Visualizar</button>
        </div>
      </div>
    `
  );
  createCardListener(quizData.quiz_id);
};

const createQuizzesCards = async () => {
  $('#load-spin').show();
  const quizData = await getAllQuizzes();

  if (quizData) {
    $('#quiz-cards').html('');
    quizData.forEach((data) => createSingleQuizCard(data));
  } else {
    toastr.error('Não foi possível carregar os questionários.');
  }
  $('#load-spin').hide();
};