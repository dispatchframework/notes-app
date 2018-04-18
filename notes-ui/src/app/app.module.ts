import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AceEditorModule } from 'ng2-ace-editor';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { NotesComponent } from "./notes/notes.component";
import { NotesService } from "./notes/notes.service";

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent
    ],
    imports: [
        AceEditorModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule,
        ROUTING
    ],
    providers: [NotesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
