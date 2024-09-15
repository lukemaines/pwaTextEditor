import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Request to update the database');
// open the db
  const jateDb = await openDB('jate', 1);
// create a readwrite transaction
  const tx = jateDb.transaction('jate', 'readwrite');
// open the object store for 'jate'
  const store = tx.objectStore('jate');
// put method to add content
  const request = store.put({ id: 1, value: content });
// request confirmation
  const result = await request;
  console.log('saved to database', result);

};

  

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET request to the db');
// open the db
  const jateDb = await openDB('jate', 1);
// create readonly transaction
  const tx = jateDb.transaction('jate', 'readonly');
// open the object store
  const store = tx.objectStore('jate');
// retrieve content by id
  const request = store.get(1);
// request confirmation
  const result = await request;
  console.log('data retrieved', result?.value);
  return result?.value;

};

initdb();
