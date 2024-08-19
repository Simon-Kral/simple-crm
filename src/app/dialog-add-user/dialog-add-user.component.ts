import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-dialog-add-user',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		FormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dialog-add-user.component.html',
	styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
	readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
	user: User = new User();
	birthdate: Date = new Date();

	saveUser() {
		this.user.birthDate = this.birthdate.getTime();
		console.log('Current User is', this.user);
	}
}
