import { Component, inject } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { User } from '../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-dialog-edit-user-detail',
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
	templateUrl: './dialog-edit-user-detail.component.html',
	styleUrl: './dialog-edit-user-detail.component.scss',
})
export class DialogEditUserDetailComponent {
	readonly dialogRef = inject(MatDialogRef<DialogEditUserDetailComponent>);
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
