import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirestoreService } from '../services/firestore/firestore.service';
import { User } from '../models/user.class';

@Component({
	selector: 'app-dialog-edit-user-info',
	standalone: true,
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatProgressBarModule,
		FormsModule,
	],
	templateUrl: './dialog-edit-user-info.component.html',
	styleUrl: './dialog-edit-user-info.component.scss',
})
export class DialogEditUserInfoComponent {
	readonly dialogRef = inject(MatDialogRef<DialogEditUserInfoComponent>);
	firestoreService = inject(FirestoreService);
	user: User = new User(this.firestoreService.userSig());
	loading: boolean = false;

	saveUser() {
		this.loading = true;
		this.firestoreService
			.editUser(this.user, this.firestoreService.userSig().id)
			.subscribe({
				next: () => {
					this.loading = false;
					this.dialogRef.close();
				},
			});
	}
}
