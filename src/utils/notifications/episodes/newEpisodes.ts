import {API_BASE} from '@env';

export class NewEpisodes {
  media_id: string;
  current_episodes: number;
  new_episodes: number = 0;

  has_checked: boolean = false;

  constructor(media_id: string, current_episode: number) {
    this.media_id = media_id;
    this.current_episodes = current_episode;
  }

  async check() {
    const response = await fetch(
      `${API_BASE}/anilist/episodes/${this.media_id}`,
    );

    const data = await response.json();

    if (data.length > this.current_episodes) {
      this.new_episodes = data.length - this.current_episodes;
      return data.pop();
    }

    return null;
  }
}
