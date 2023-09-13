import {SQLNewEpisodeData, SQLUpdateNewEpisodeData} from '../../@types';
import {sqlDB} from './client';

const TABLE_NAME = `new_episodes`;

export const createTable = async () => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anime_id INT NOT NULL,
    title VARCHAR(512)
    checked BOOLEAN,
    checkedAt TIMESTAMP,
    nextCheckAt TIMESTAMP,
    latestEpisode JSON,
    currentEpisodes INT
);`;

  //Execute query
  try {
    const DB = await sqlDB.transaction(tx => {
      return tx.executeSql(query, []);
    });
    return DB;
  } catch (error) {
    console.log(error);
  }
};

export const insertEpisode = async (data: SQLNewEpisodeData) => {
  // Update the episode data
  const searchQuery = `SELECT * FROM ${TABLE_NAME} WHERE anime_id = ?`;

  const searchPromise: any[] = await new Promise((resolve, reject) => {
    sqlDB.transaction(tx => {
      tx.executeSql(
        searchQuery,
        [data.anime_id],
        (_, {rows: {raw}}) => {
          resolve(raw());
        },
        (_, error) => reject(error),
      );
    });
  });

  if (searchPromise.length > 0) return;

  const query = `INSERT INTO ${TABLE_NAME} (anime_id, title, checked, checkedAt, nextCheckAt, latestEpisode, currentEpisodes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  return await sqlDB.transaction(tx => {
    return tx.executeSql(query, [
      data.anime_id,
      data.title,
      data.checked,
      data.checkedAt,
      data.nextCheckAt,
      data.latestEpisode,
      data.currentEpisodes,
    ]);
  });
};

export const updateTable = async (data: SQLUpdateNewEpisodeData) => {
  const query = `UPDATE ${TABLE_NAME} SET anime_id = ?, checked = ? , checkedAt = ?, nextCheckAt = ?, currentEpisodes = ?, latestEpisode = ?`;

  return await sqlDB.transaction(tx => {
    return tx.executeSql(query, [
      data.anime_id,
      data.checked,
      data.checkedAt,
      data.nextCheckAt,
      data.currentEpisodes,
      data.latestEpisode,
    ]);
  });
};
