/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { NotesService } from "./notes.service";
import { Note } from "./notes";

@Component({
    styleUrls: ['./notes.component.scss'],
    templateUrl: './notes.component.html',
})
export class NotesComponent {
    title: string = "";
    text: string = "";
    errorMessage: string;
    notes: Note[];

    constructor(
        private noteService: NotesService
    ) { }

    refreshNotes(period: number): void {
        this.noteService
            .refreshNotes(period)
            .subscribe(
                notes => {
                    this.notes = notes;
                },
                error => this.errorMessage = <any>error
            );
    }

    getNotes(): void {
        this.noteService
            .getNotes()
            .toPromise()
            .then(
                notes => {
                    this.notes = notes;
                }
            );
    }

    getNote(note: Note): void {
        this.text = note.text;
        this.title = note.title;
    }

    createNote(): void {
        console.log(this.title + " " + this.text);
        this.noteService
            .addNote(this.title, this.text)
            .toPromise()
            .then(
                note => {
                    this.notes.push(note);
                    this.title = "";
                    this.text = "";
                });
    }

    ngOnInit(): void {
        this.refreshNotes(5000);
        this.getNotes();
    }
}
