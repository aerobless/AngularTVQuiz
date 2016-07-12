import { Injectable } from '@angular/core';
import { Question } from '../question';

@Injectable()
export class QuestionService {
    getQuestions(){
        return QUESTIONS;
    }
}

const QUESTIONS: Question[] = [
    {text: 'An apple a day keeps the ___ away', answers: [{text: 'doctor', correct: true}, {text: 'cat', correct: false}, {text: 'ghost', correct: false}, {text: 'alien', correct: false}]},
    {text: 'What is the name of the highest mountain in the world', answers: [{text: 'Mount Everest', correct: true}, {text: 'Matterhorn', correct: false}]},
    {text: 'When was Google founded?', answers: [{text: 'September 4, 1998', correct: true}, {text: 'August 19, 1985', correct: false}, {text: 'September 15, 1997', correct: false}]},
    {text: 'What was the name of the first apple computer?', answers: [{text: 'Apple I', correct: true}, {text: 'Apple One', correct: false}, {text: 'A1', correct: false}]}
];
