import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { News } from 'src/app/Models/news'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-news-submission',
  templateUrl: './news-submission.component.html',
  styleUrls: ['./news-submission.component.css']
})
export class NewsSubmissionComponent {
  newsForm: FormGroup;
  newsList: News[] = [];

  constructor(private fb: FormBuilder) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      writer: ['', Validators.required]
    });
    
  }

  submitNews() {
    if (this.newsForm.valid) {
      const newNews: News = {
        ...this.newsForm.value,
        creationDate: new Date()
      };
      this.newsList.push(newNews); 
      console.log('Notícia submetida:', newNews);
      this.newsForm.reset();
    }
  }
}
