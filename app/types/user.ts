export interface User {
    active_info: {
      time: number;
      time_desc: string;
    };
    admin: boolean;
    age: number;
    avatar: string;
    be_followed: boolean;
    bio: string;
    birthdate: string;
    blocked: boolean;
    city_card_expire_time: number;
    country: string;
    cover_photo: string;
    create_time: number;
    cross_region: boolean;
    ext_info: Record<string, unknown>;
    followed: boolean;
    frame_bag_version: string;
    frame_expire_time: number;
    frame_fileid: string;
    frame_id: string;
    gender: string;
    huanxin_id: string;
    ip_city: string;
    ip_country: string;
    is_chat_bot: boolean;
    is_official_push_account: boolean;
    is_vip: boolean;
    last_pay_ts: number;
    lit_id: number;
    lover_info: Record<string, unknown>;
    mood_status_info: {
      expire_time: number;
      icon: string;
      is_show: boolean;
      mood_name: string;
      name: string;
    };
    new_party: string;
    nickname: string;
    on_mic: boolean;
    party_level_info: {
      received: {
        accelerate_diamonds: number;
        avatar: string;
        diamonds: number;
        level: number;
        new_diamonds: number;
      };
      sent: {
        avatar: string;
        diamonds: number;
        level: number;
        new_diamonds: number;
      };
    };
    party_top_three: number;
    precious_no_info: Record<string, unknown>;
    recommend_feed_img: string;
    region: string;
    register_time: number;
    removed: boolean;
    role: number;
    starred: boolean;
    tag_str: string;
    tags: Array<{
      tag_id: string;
      tag_name: string;
      tag_type: string;
    }>;
    user_id: string;
    vip_info: {
      expire_time: number;
      expire_time_checkpoint: number;
      init_flag: boolean;
      level: number;
      level_maintain_review_time: number;
      show_vip_status: number;
    };
    vip_time: number;
    wealth_level_info: {
      exp: number;
      level: number;
      level_badge: string;
    };
    wearing_badges: Array<{
      awarded: boolean;
      badge_unique_key: string;
      fileid: string;
    }>;
}
