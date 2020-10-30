const getQuizDataById = async (quizId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/quiz?quizId=${quizId}`, {
      method: 'GET'
    });
    const json = await response.json();
    return json.data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

const sendAnswerDataToAPI = async (quizData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/answer`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(quizData)
    });
    const json = await response.json();
    return json.data ? true : false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createAnswerModal = async (quizId) => {
  const quizData = await getQuizDataById(quizId);
  $('#create-answer-btn').val(quizId);
  if (quizData) {
    $('#modal-create-answer-title').html(quizData.quiz_title);
    $(`#form-create-answer`).html(`
      <label class="mt-2" for="answer-author"><b>Autor</b></label>
      <input type="text" class="form-control" id="answer-author" value="" required>
      <h4 class="mt-4">Perguntas :</h4>
    `);

    quizData.quiz_questions.forEach((question, i) => {
      $(`#form-create-answer`).append(`
        <label class="mt-2" for="answer${i + 1}"><b>${question}</b></label>
        <input type="text" class="form-control" id="answer${i + 1}" value=""></input>
      `)
    })
    $('#modal-create-answer').modal('show');
  } else {
    toastr.error('Não foi possível abrir este questionário.');
  }
};

const createAndValidateAnswerFormData = () => {
  const questionsNumber = ($('#form-create-answer').find('input').length) - 1;
  const quiz_id = $('#create-answer-btn').val();
  const answer_author = $('#answer-author').val();
  const creation_date = moment().format('YYYY-MM-DD');
  if (!answer_author)
    return null;
  
  let formData = {
    quiz_id,
    answer_author,
    creation_date,
    quiz_answers: []
  };

  for (let index = 1; index <= questionsNumber; index++) {
    const answer = $(`#answer${index}`).val();
    if (answer)
      formData.quiz_answers.push(answer);
    else {
      return null;
    }
  }

  return formData;
};

$('#create-answer-btn').on('click', async (event) => {
  event.stopPropagation();
  
  let answerFormData = createAndValidateAnswerFormData();

  if (answerFormData) {
    const created = await sendAnswerDataToAPI(answerFormData);

    if (created) {
      $('#modal-create-answer').modal('hide');
      toastr.success('Resposta cadastrada com sucesso.');
    } else {
      toastr.error('Erro ao realizar cadastro da resposta.');
    }
  }
  else {
    toastr.error('Obrigatório preenchimento de todos os campos.');
  }
});