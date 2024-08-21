import { Component, inject, OnInit } from '@angular/core';
import {
	MatCard,
	MatCardContent,
	MatCardHeader,
	MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Unsubscribe } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserInfoComponent } from '../dialog-edit-user-info/dialog-edit-user-info.component';
import { DialogEditUserDetailComponent } from '../dialog-edit-user-detail/dialog-edit-user-detail.component';

@Component({
	selector: 'app-user-detail',
	standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardTitle,
		MatCardContent,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
	],
	templateUrl: './user-detail.component.html',
	styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
	readonly dialog = inject(MatDialog);
	firestoreService = inject(FirestoreService);
	unsubUser: Unsubscribe | undefined;

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((paramMap) => {
			const userId = paramMap.get('id')!;
			this.unsubUser = this.firestoreService.subUser(userId);
		});
	}

	ngOnDestroy() {
		this.unsubUser!();
	}

	editUserInfo() {
		this.dialog.open(DialogEditUserInfoComponent);
	}
	editUserDetail() {
		this.dialog.open(DialogEditUserDetailComponent);
	}
}
