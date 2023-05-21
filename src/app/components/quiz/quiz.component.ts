import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz__questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = ' ';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;

      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      /*  ###  abaixo -- o ponteiro exibir a posição zero  e vai dizer as posições q sao 3 vindas do json  */
      console.log(this.questionIndex); //
      console.log(this.questionMaxIndex);
    } // fijm do if
  } // fim do OnInit

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();

    // vai salvando no vetor todas as respostas exibindo na tela
    // com o console abaixo... mais nao tor saindo da pergunta então vai criar o metodo nextStep..
    //console.log( this.answers)
    // console.log("teste")
  } // fim  do playerChoose

  async nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quiz_questions.results[
          finalAnswer as keyof typeof quiz_questions.results
        ];

      // vericando a reposta
      console.log(this.answers);
    } //fim do if-else
  } // fim do nextSetp

  async checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      } //fim if
    }); // fim do reduce
    return result;
  } // fim do check
} // fim de tudo da class
