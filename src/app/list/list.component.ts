import { Component, ViewChildren, QueryList, Renderer2 } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragExit,
  CdkDragEnter,
  CdkDropList,
  CdkDropListContainer
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @ViewChildren(CdkDropList) dropLists: QueryList<CdkDropListContainer<string[]>>

  data = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]

  private exited: CdkDropListContainer<string[]>

  constructor(private renderer: Renderer2) {}

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex - 1)
    }
  }

  exit({ container: exited }: CdkDragExit<string[]>): void {
    this.exited = exited
  }

  enter({ container: entered }: CdkDragEnter<string[]>): void {
    const exitedIndex = this.dropLists.toArray().indexOf(this.exited)
    const enteredIndex = this.dropLists.toArray().indexOf(entered)

    exitedIndex < enteredIndex ? this.translateUp(this.exited, entered) : this.translateDown(this.exited, entered)
  }

  private translateUp(exited: CdkDropListContainer<string[]>, entered: CdkDropListContainer<string[]>): void {
    exited.data.push(entered.data.shift())
    this.renderer.setStyle(entered.element.nativeElement.querySelector('[cdkDrag]:first-child'), 'display', 'none')
  }

  private translateDown(exited: CdkDropListContainer<string[]>, entered: CdkDropListContainer<string[]>): void {
    exited.data.unshift(entered.data.pop())
    this.renderer.setStyle(entered.element.nativeElement.querySelector('[cdkDrag]:last-child'), 'display', 'none')
  }

  getData(): void {
    console.log(this.data)
  }
}
