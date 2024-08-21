import {
	Component,
	inject,
	ChangeDetectionStrategy,
	OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		RouterLink,
	],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
	readonly dialog = inject(MatDialog);
	firestoreService = inject(FirestoreService);
	user: User = new User();
	unsubUsers;

	constructor() {
		this.unsubUsers = this.firestoreService.subUsersList();
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.unsubUsers();
	}

	openDialog() {
		this.dialog.open(DialogAddUserComponent);
	}
}
