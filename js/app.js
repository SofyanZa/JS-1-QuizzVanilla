var app = {

  elem_right: null,
  elem_wrong: null,

  init: function() {

    // debugger;

    console.log('app.init');

    app.elem_right = document.querySelector('#right .responses');
    app.elem_wrong = document.querySelector('#wrong .responses');

    // Je lance l'execution du quiz
    app.playQuiz();
  },
  askQuestion: function(questionToAsk) {

    var my_response = prompt(questionToAsk);

    return my_response;
  },

  checkResponse: function(question_id, user_response) {

    var right_answer = responses[question_id];

    // Je compare la réponse de l'utilisateur avec la bonne réponse
    if (right_answer == user_response) {

      return true;

    } else {

      // Je renvoi "faux" si la réponse donnée est incorrecte
      return false;
    }
  },
  playQuiz: function(){

    // Je vide mes éléments au cas où
    app.elem_right.innerHTML = '';
    app.elem_wrong.innerHTML = '';

    var nb_right = 0;
    var nb_wrong = 0;

   
    // Je boucle sur toutes les questions
    // current_question_id comme son nom l'indique est l'id de la question en cours
    for (var current_question_id in questions) {

      // J'execute la méthode de mon objet app qui s'appel askQuestion
      // Je lui donne en argument une question.
      var user_response = app.askQuestion(questions[current_question_id]);

    
      // Je stock dans une variable le résultat du test
      // ma variable "is_correct" va donc contenir un boolean
      var is_correct = app.checkResponse(current_question_id, user_response);

      if (is_correct) {

        console.log('exact');

        // Je place dans mon element un nouveau "sous-element" de type "li"
        var liElement = document.createElement('li');
        // J'ajoute du texte dans mon element
        liElement.textContent = questions[current_question_id];
        app.elem_right.appendChild(liElement);
        nb_right++;

      } else {

        console.log('mauvaise réponse');

        app.elem_wrong.innerHTML += '<li>'+questions[current_question_id]+'</li>';

        nb_wrong++;
      }
    }

    // Je selectionne mes elements dans le DOM puis je modifie leur contenu
    document.querySelector('#right h2').textContent += ' (' + nb_right + ')';
    document.querySelector('#wrong h2').textContent += ' (' + nb_wrong + ')';
  }
};

document.addEventListener('DOMContentLoaded', app.init);