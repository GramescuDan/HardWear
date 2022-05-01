import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent{

  @Input() Id = ' ';
  @Input() image = ' ';

}
