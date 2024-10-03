interface AdminInfo {
  num: number;
  top_users: Array<{
    avatar: string;
    frame_fileid: string;
  }>;
}

interface FanClubInfo {
  club_badge_fileid: string;
  club_name: string;
  fan_num: number;
  fans_club_attr_info: {
    badge_file_id: string;
    badge_file_id_dk: string;
    bg_file_id: string;
    bg_file_id_dk: string;
    group_name: string;
    last_changed_ts: number;
    level: number;
    next_change_ts: number;
    text_color: string;
    text_color_dk: string;
  };
  intimacy_score: number;
  is_active: boolean;
  level: number;
}

interface Host {
  age: number;
  avatar: string;
  bio: string;
  birthdate: string;
  country: string;
  create_time: number;
  gender: string;
  huanxin_id: string;
  ip_city: string;
  ip_country: string;
  nickname: string;
  user_id: string;
  // Add other properties as needed
}

interface RoomLevelInfo {
  exp: number;
  is_full_level: boolean;
  level: number;
  level_up_required_exp: number;
  pre_level: number;
  required_exp: number;
  task_info: {
    desc: string;
    details: Array<{
      desc: string;
      exp_gained_limit_per_day: number;
      exp_party_gained_today: number;
      exp_per_segment: number;
      name: string;
      segment_value: number;
      today: string;
      type: string;
    }>;
  };
}

interface Room {
  data: {
    admin_info: AdminInfo;
    admins: string[];
    affiliations_count: number;
    block_chat: boolean;
    change_name_user_id: string;
    change_rules_user_id: string;
    dynamic_background_fileid: string;
    dynamic_background_type: number;
    entry_message_merged: boolean;
    family_id: string;
    fan_club_info: FanClubInfo;
    follower_info: {
      num: number;
      top_users: Array<{
        avatar: string;
        frame_fileid: string;
      }>;
    };
    game_mode: boolean;
    game_name: string;
    host: Host;
    host_id: string;
    id: string;
    is_active: boolean;
    is_changed_tag: boolean;
    is_family_party: boolean;
    is_hot: boolean;
    is_locked: boolean;
    is_manual_recommend: boolean;
    is_new: boolean;
    main_tag: string;
    membership_setting: {
      enter_room_freely_level: number;
      enter_room_freely_switch: number;
      max_enter_room_freely_level: number;
      max_membership_fee: number;
      max_take_mic_freely_level: number;
      membership_fee: number;
      min_enter_room_freely_level: number;
      min_membership_fee: number;
      min_take_mic_freely_level: number;
      modifiable: boolean;
      take_mic_freely_level: number;
      take_mic_freely_switch: number;
    };
    mic_waiting_open: boolean;
    mode: string;
    name: string;
    off_mic_bar_open: boolean;
    party_age: number;
    party_background_fileid: string;
    party_background_pag_fileid: string;
    party_frame: Record<string, unknown>;
    party_layout_fileid: string;
    party_pictures: null;
    party_rule: string;
    party_welcome: string;
    party_welcome_see_all: boolean;
    region: string;
    room_fans_club_attr_info: {
      badge_file_id: string;
      badge_file_id_dk: string;
      bg_file_id: string;
      bg_file_id_dk: string;
      group_name: string;
      last_changed_ts: number;
      level: number;
      next_change_ts: number;
      next_level_info: {
        badge_file_id: string;
        badge_file_id_dk: string;
        bg_file_id: string;
        bg_file_id_dk: string;
        level: number;
        text_color: string;
        text_color_dk: string;
      };
      required_members_count: number;
      text_color: string;
      text_color_dk: string;
    };
    room_level_info: RoomLevelInfo;
    room_mode: number;
    sub_tag: string;
    tag_name: string;
  };
  result: number;
  success: boolean;
}

export {Room, RoomLevelInfo, Host, FanClubInfo, AdminInfo}
