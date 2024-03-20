//indexed-db.service.ts
import { Injectable } from '@angular/core';
import{v4 as uuidv4} from 'uuid'



@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  public db:any = IDBDatabase;
  private readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('TodoList', 1);

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async addTask(task: any) {
    await this.readyPromise;
    const transaction = this.db.transaction('tasks', 'readwrite');
    const store = transaction.objectStore('tasks');

    task.id = uuidv4();

    store.add(task);
  }

  async updateTaskCompletedStatus(taskId: number, completed: boolean) {
    await this.readyPromise;
    const transaction = this.db.transaction('tasks', 'readwrite');
    const store = transaction.objectStore('tasks');
    const request = store.get(taskId);
  
    request.onerror = (event:any) => {
      console.error('Erro ao buscar a tarefa no IndexedDB:', (event.target as IDBRequest).error);
    };
  
    request.onsuccess = (event:any) => {
      const task = request.result;
      if (task) {
        task.completed = completed;
        const updateRequest = store.put(task);
        updateRequest.onerror = (event:any) => {
          console.error('Erro ao atualizar a tarefa no IndexedDB:', (event.target as IDBRequest).error);
        };
      } else {
        console.error('Tarefa não encontrada no IndexedDB:', taskId);
      }
    };
  }
  
  

  async getTasks() {
    await this.readyPromise;
    const transaction = this.db.transaction('tasks', 'readonly');
    const store = transaction.objectStore('tasks');
    return new Promise<any[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = (event:any) => {
        resolve((event.target as IDBRequest).result);
      };
      request.onerror = (event:any) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}
