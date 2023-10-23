export type SettingsOptions = {
  title: string;
  value: string;
  onPress: () => void;
};

export type SettingsOptionsGroup = {
  title: string;
  options: SettingsOptions[];
};

export type SettingsSectionsType = {
  name: string;
  value: string;
  iconName?: string;
  selectedOption: string;
  setOption?: (value: any) => void;
  onPress?: () => void;

  hasSubOptions?: boolean;
  optionType?: 'option' | 'subOption' | 'slider' | 'pressable';
  minValue?: number;
  maxValue?: number;
  options?: {
    value: string;
    label: string;
  }[];
};

export type VideoSettingsOptions =
  | 'auto_skip_intro'
  | 'auto_skip_outro'
  | 'auto_next_episode'
  | 'prefered_voice'
  | 'prefered_quality'
  | 'source_provider'
  | 'skip_forward_time'
  | 'skip_behind_time'
  | 'play_in_background'
  | 'play_when_inactive';

export type MangaSettingsOptions = 'source_provider_manga';

export type SyncingSettingsOptions = 'private_mode';

export type MiscSettingsOptions = 'auto_update';

export type Settings =
  | VideoSettingsOptions
  | MangaSettingsOptions
  | SyncingSettingsOptions
  | MiscSettingsOptions;
