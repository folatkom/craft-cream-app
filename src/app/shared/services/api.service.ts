import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private firestore: AngularFirestore) {}

  addData(data: any, collection: string) {
    this.firestore
      .collection(collection)
      .add(data)
      .then(
        (res) => {
          alert('Dodano pomyślnie');
        },
        (err) => {
          alert(err.message);
        }
      );
  }
  deleteData(id: string, collection: string) {
    return this.firestore
      .doc(`${collection}/${id}`)
      .delete()
      .then(
        (res) => {
          alert('Usunięto pomyślnie');
        },
        (err) => {
          alert(err.message);
        }
      );
  }
  getData(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }
}
