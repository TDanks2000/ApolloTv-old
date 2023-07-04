import {SQLEpisodeData, SQLUpdateEpisodeData} from '../../@types';
import {sqlDB} from './client';

export const createTable = async () => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS episodes (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    anime_id INTEGER NOT NULL,
    image TEXT NOT NULL,
    episode_number INTEGER NOT NULL,
    next_episode_id TEXT NOT NULL,
    watched BOOLEAN DEFAULT(${Number(false)}),
    watched_percentage FLOAT DEFAULT(0),
    watchedAt DATETIME DEFAULT CURRENT_TIMESTAMP
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

export const insertEpisode = async (episode: SQLEpisodeData) => {
  // Update the episode data
  const searchQuery = `SELECT * FROM episodes WHERE id = ?`;

  const searchPromise: any[] = await new Promise((resolve, reject) => {
    sqlDB.transaction(tx => {
      tx.executeSql(
        searchQuery,
        [episode.id],
        (_, {rows: {raw}}) => {
          resolve(raw());
        },
        (_, error) => reject(error),
      );
    });
  });

  if (searchPromise.length > 0) return;

  const query = `INSERT INTO episodes (id, title, anime_id, image, episode_number, next_episode_id, watched, watched_percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  return await sqlDB.transaction(tx => {
    return tx.executeSql(query, [
      String(episode.id),
      String(episode.title),
      Number(episode.anime_id),
      String(episode.image),
      Number(episode.episode_number),
      String(episode.next_episode_id),
      Number(episode.watched),
      Number(episode.watched_percentage),
    ]);
  });
};

export const updateTable = async (episode: SQLUpdateEpisodeData) => {
  const query = `UPDATE episodes SET watched = ?, watched_percentage = ?, watchedAt = CURRENT_TIMESTAMP WHERE id = ?`;

  return await sqlDB.transaction(tx => {
    return tx.executeSql(query, [
      episode.watched,
      episode.watched_percentage,
      episode.id,
    ]);
  });
};

export const selectFromAnimeId = async (id: string) => {
  const query =
    'SELECT * FROM episodes WHERE anime_id = ? ORDER by episode_number DESC';

  const promise = new Promise((resolve, reject) => {
    sqlDB.transaction(tx => {
      tx.executeSql(
        query,
        [id],
        (_, {rows: {raw}}) => {
          resolve(raw());
        },
        (_, error) => reject(error),
      );
    });
  });

  return promise;
};

export const selectFromEpisodeId = async (id: string) => {
  const query = `SELECT * FROM episodes WHERE id = ?`;

  const promise = new Promise((resolve, reject) => {
    sqlDB.transaction(tx => {
      tx.executeSql(
        query,
        [id],
        (_, {rows: {raw}}) => {
          resolve(raw());
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const selectAllWatched = async (id: string) => {
  const query = `SELECT * FROM episodes WHERE anime_id = ? AND watched = 1`;

  const promise = new Promise((resolve, reject) => {
    sqlDB.transaction(tx => {
      return tx.executeSql(
        query,
        [id],
        (_, {rows: {raw}}) => {
          resolve(raw());
        },
        (_, error) => reject(error),
      );
    });
  });

  return promise;
};

export const SelectAll = async () => {
  const query = 'SELECT * FROM episodes';

  const promise = new Promise((resolve, reject) => {
    sqlDB.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, {rows: {raw}}) => {
          resolve(raw());
        },
        (_, error) => reject(error),
      );
    });
  });

  return promise;
};

export const deleteEpisode = async (id: string) => {
  const query = `DELETE FROM episodes WHERE id = ?`;

  return await sqlDB.transaction(tx => {
    return tx.executeSql(query, [id]);
  });
};

export const deleteAllFromSameAnime = async (id: string) => {
  const query = `DELETE FROM episodes WHERE anime_id = ?`;

  return await sqlDB.transaction(tx => {
    return tx.executeSql(query, [id]);
  });
};
