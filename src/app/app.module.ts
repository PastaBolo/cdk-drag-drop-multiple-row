import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppComponent } from './app.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [AppComponent, ListComponent],
  imports: [BrowserModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
