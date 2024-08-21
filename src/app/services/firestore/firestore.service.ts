import { inject, Injectable, signal } from '@angular/core';
import {
	addDoc,
	collection,
	doc,
	Firestore,
	getDoc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { User } from '../../models/user.class';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	firestore: Firestore = inject(Firestore);
	userListSig = signal<any[] | null | undefined>(undefined);
	userSig = signal<any | null | undefined>(undefined);

	constructor() {
		this.setInitialSig();
	}

	setInitialSig() {
		this.userSig.set(this.setUserObject());
	}

	addUser(user: User) {
		const promise = addDoc(
			collection(this.firestore, 'users'),
			user.toJSON()
		).then(() => {});
		return from(promise);
	}

	editUser(user: User, id: string) {
		const promise = updateDoc(
			doc(collection(this.firestore, 'users'), id),
			user.toJSON()
		).then(() => {});
		return from(promise);
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

	getUsersRef() {
		return collection(this.firestore, 'users');
	}

	subUser(id: string) {
		const q = this.getUserRef(id);
		return onSnapshot(q, (user) => {
			this.userSig.set(this.setUserObject(user.data(), user.id));
		});
	}

	getUserRef(id: string) {
		return doc(collection(this.firestore, 'users'), id);
	}

	setUserObject(obj?: any, id?: string) {
		return {
			id: id ? id : '',
			firstName: obj ? obj.firstName : '',
			lastName: obj ? obj.lastName : '',
			email: obj ? obj.email : '',
			birthDate: obj ? obj.birthDate : '',
			street: obj ? obj.street : '',
			zipCode: obj ? obj.zipCode : '',
			city: obj ? obj.city : '',
		};
	}
}
