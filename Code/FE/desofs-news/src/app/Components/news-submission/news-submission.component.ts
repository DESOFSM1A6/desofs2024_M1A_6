import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from './../../Services/news.service';

@Component({
  selector: 'app-news-submission',
  templateUrl: './news-submission.component.html',
  styleUrls: ['./news-submission.component.css']
})
export class NewsSubmissionComponent {
  newsForm: FormGroup;
  selectedFiles: File[] = [];
  newsList: any[] = [];

  constructor(private fb: FormBuilder, private newsService: NewsService) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      writer: ['', Validators.required],
      images: [null, Validators.required]
    });
  }

  onFilesSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem não pode exceder 2MB.');
        return;
      }
    });
    this.selectedFiles = files;
    this.newsForm.patchValue({ images: files });
  }

  submitNews() {
    if (this.newsForm.valid && this.selectedFiles.length > 0) {
      const formData: FormData = new FormData();
      formData.append('title', this.newsForm.get('title')?.value);
      formData.append('content', this.newsForm.get('content')?.value);
      formData.append('writer', this.newsForm.get('writer')?.value);
      this.selectedFiles.forEach((file, index) => {
        formData.append(`images`, file, file.name);
      });
      formData.append('status', 'pending');

      let newsDTO = {
        id: 0 as number,
        title: this.newsForm.get('title')?.value,
        content: this.newsForm.get('content')?.value,
        writer: this.newsForm.get('writer')?.value,
        images: [] as string[],
        status: 'PENDING',
        creationDate: new Date()
      };
      this.selectedFiles.forEach((file, index) => {
        newsDTO.images.push(file.name);
      });

      console.log(newsDTO);

      this.newsService.createNews(newsDTO).subscribe(response => {
        console.log('Notícia submetida:', newsDTO);
        this.newsList.push(newsDTO);
        this.newsForm.reset();
      }, error => {
        console.error('Erro ao submeter notícia:', error);
      });
    }
  }

  noHTMLTags(control: any) {
    const hasHTMLTags = /<\/?[a-z][\s\S]*>/i.test(control.value);
    return hasHTMLTags ? { 'htmlTags': true } : null;
  }
}
