import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publishedYear: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      if (this.book) {
        this.bookService.updateBook(this.book._id, this.bookForm.value).subscribe(() => {
          this.formSubmitted.emit();
        });
      } else {
        this.bookService.createBook(this.bookForm.value).subscribe(() => {
          this.formSubmitted.emit();
        });
      }
    }
  }
}
