import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const onSuccess = () => {
  console.log('Database opened');
};

const onError = (err: SQLite.SQLError) => {
  console.log('Database error: ' + err);
};

export const sqlDB = SQLite.openDatabase(
  {name: 'db.db', location: 'default'},
  onSuccess,
  onError,
);
