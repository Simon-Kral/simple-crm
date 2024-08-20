import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		provideFirebaseApp(() =>
			initializeApp({
				apiKey: 'AIzaSyDD8iK_DCqM1tv4qXHaInyAZVzTY1l389I',
				authDomain: 'simple-crm-cdcdf.firebaseapp.com',
				projectId: 'simple-crm-cdcdf',
				storageBucket: 'simple-crm-cdcdf.appspot.com',
				messagingSenderId: '18755712869',
				appId: '1:18755712869:web:20e6cebf7472bce55dd38c',
			})
		),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideDatabase(() => getDatabase()),
	],
};
