import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DragDropModule } from 'primeng/dragdrop';
@Component({
  selector: 'organization-chart-template-demo',
  templateUrl: './organization-chart-template-demo.html',
  styleUrls: ['./organization-chart-template-demo.scss'],
})
export class OrganizationChartTemplateDemo {
  private iter = 0;
  draggeditem: any;
  selecteditems: any[];
  availableitems:any[];
  data: TreeNode[] = [
    {
      label: 'CEO',
      data: {
        name: 'Swagamemnon 2',
        title: 'CEO',
        shape: 'R',
      },
      expanded: true,
      children: [
        {
          label: 'SFO',
          data: {
            name: 'Peter McPeterson',
            title: 'CFO',
            shape: 'T',
          },
          expanded: true,
          children: [],
        },
        {
          label: 'SFO',
          data: {
            name: 'Steven O',
            title: 'CFO',
            shape: 'R',
          },
          expanded: true,
          children: [],
        },
      ],
    },
  ];

  addNode(node: TreeNode): void {
    if (!node.children) {
      node.children = [];
    }
    node.children.push({
      label: '',
      data: {
        name: `Testy Testington ${this.iter++}`,
        title: 'Code Monkey',
        shape: 'T',
      },
      expanded: true,
    });
  }

  addNode2(node: TreeNode,child:any): void {
    if (!node.children) {
      node.children = [];
    }
    node.children.push(child);
  }

  removeNode(node: TreeNode): void {
    const foundNode = this.findParent(node);
    const nodeIndex = foundNode?.children?.indexOf(node);
    foundNode?.children?.splice(nodeIndex, 1);
  }

  dragStart(item: any) {
    this.draggeditem = item;
}

drop(node:any) {
  console.log(node);
  console.log(this.draggeditem);
    if (node && this.draggeditem) {
      this.removeNode(this.draggeditem);
        this.addNode2(node,this.draggeditem);
        //let draggeditemIndex = this.findIndex(this.draggeditem);
        // this.selecteditems = [...(this.selecteditems as any[]), this.draggeditem];
        // this.availableitems = this.availableitems?.filter((val, i) => i != draggeditemIndex);
        this.draggeditem = null;
    }
}

// findIndex(item: any) {
//   let index = -1;
//   for (let i = 0; i < (this.availableitems as any[]).length; i++) {
//       if (item.id === (this.availableitems as any[])[i].id) {
//           index = i;
//           break;
//       }
//   }
//   return index;
// }

dragEnd() {
    this.draggeditem = null;
}

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event);
  //   if (event.previousContainer === event.container) {
  //     console.log('Same container');
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     console.log('Different containers');
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }

  private findParent(node: TreeNode, entries?: TreeNode[]): TreeNode {
    entries ||= this.data;
    let found: TreeNode;
    for (let entry of entries) {
      if (!entry.children?.length) {
        continue;
      }
      if (entry.children.indexOf(node) > -1) {
        return entry;
      } else {
        found = this.findParent(node, entry.children);
        if (found) {
          return found;
        }
      }
    }
    return found;
  }
}
