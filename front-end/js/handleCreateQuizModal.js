const sendQuizDataToAPI = async (quizData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/quiz`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(quizData)
    });
    const json = await response.json();
    return json.data.quiz_id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

$('#add-question').on('click', async (event) => {
  event.stopPropagation();
  const count = parseInt($('#add-question').val()) + 1;
  $('#form-create-quiz').append(`
    <div class="form-group">
      <label class="mt-2" for="question${count}"><b>Pergunta ${count}</b></label>
      <input type="text" class="form-control" id="question${count}" required>
    </div>
  `);
  $('#add-question').val(count);
});

$('#modal-create-quiz').on('hidden.bs.modal', (event) => {
  $('#form-create-quiz').html(`
    <label class="mt-2" for="quiz-title"><b>Titulo</b></label>
    <input type="text" class="form-control" id="quiz-title" required>
    <label class="mt-2" for="quiz-title"><b>Autor</b></label>
    <input type="text" class="form-control" id="quiz-author" value="" required>
    <label class="mt-2" for="question1"><b>Pergunta 1</b></label>
    <input type="text" class="form-control" id="question1" required>
  `);
  $('#add-question').val('1');
});

const createAndValidateQuizFormData = () => {
  const questionsNumber = ($('#form-create-quiz').find('input').length) - 2;
  const quiz_title = $('#quiz-title').val();
  const quiz_author = $('#quiz-author').val();
  const creation_date = moment().format('YYYY-MM-DD');
  if (!quiz_title || !quiz_author)
    return null;
  
  let formData = {
    quiz_title,
    quiz_author,
    creation_date,
    quiz_questions: []
  };
  
  for (let index = 1; index <= questionsNumber; index++) {
    const question = $(`#question${index}`).val();
    if (question)
      formData.quiz_questions.push(question);
    else
      return null;
  }

  return formData;
};

$('#create-quiz-btn').on('click', async (event) => {
  event.stopPropagation();
  
  let quizFormData = createAndValidateQuizFormData();
  if (quizFormData) {
    const quiz_id = await sendQuizDataToAPI(quizFormData);

    if (quiz_id) {
      quizFormData.quiz_id = quiz_id;
      createSingleQuizCard(quizFormData);
      $('#modal-create-quiz').modal('hide');
      toastr.success('Questionário criado com sucesso.');
    } else {
      toastr.error('Erro ao realizar cadastro do questionário.');
    }
  }
  else {
    toastr.error('Obrigatório preenchimento de todos os campos.');
  }
});