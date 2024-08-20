import {
	Component,
	inject,
	ChangeDetectionStrategy,
	OnInit,
	signal,
	Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import {
	collection,
	Firestore,
	onSnapshot,
	query,
} from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';

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
	firestore: Firestore = inject(Firestore);
	user: User = new User();
	userListSig = signal<any[] | null | undefined>(undefined);

	unsubUsers;

	constructor() {
		this.unsubUsers = this.subUsersList();
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.unsubUsers();
	}

	openDialog() {
		this.dialog.open(DialogAddUserComponent);
	}

	subUsersList() {
		const q = query(this.getUsersRef());
		return onSnapshot(q, (usersList) => {
			let signalList: any[] = [];
			usersList.forEach((user) => {
				signalList.push(this.setUserObject(user.data(), user.id));
			});
			this.userListSig.set(signalList);
		});
	}

	setUserObject(obj: any, id: string) {
		return {
			id: id,
			firstName: obj.firstName,
			lastName: obj.lastName,
			email: obj.email,
			birthDate: obj.birthDate,
			street: obj.street,
			zipCode: obj.zipCode,
			city: obj.city,
		};
	}

	getUsersRef() {
		return collection(this.firestore, 'users');
	}
}
