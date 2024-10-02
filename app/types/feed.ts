export interface Feed {
  anonymous_mood: string;
  audios: string[];
  comment_num: number;
  content: string;
  coordinates: any[];
  create_time: {
    time: number;
    time_desc: string;
  };
  dislike_num: number;
  disliked: boolean;
  extras: Record<string, any>;
  feed_banner_dict: Record<string, any>;
  feed_effects: any[];
  feed_type: number;
  id: string;
  is_love_story: boolean;
  is_vote: boolean;
  labels: any[];
  like_num: number;
  liked: boolean;
  location: string;
  love_story_ring_id: string;
  other_info: Record<string, any>;
  pics: string[];
  pics_shape: any[];
  quoted_feed_id: string;
  reaction_num: number;
  reactions: {
    caring: number;
    heart: number;
    surprise: number;
  };
  reference_num: number;
  repost_num: number;
  similar_feeds: any[];
  source: string;
  tags: any[];
  user_id: string;
  user_info: {
    age: number;
    avatar: string;
    bio: string;
    birthdate: string;
    city_card_expire_time: number;
    country: string;
    cover_photo: string;
    create_time: number;
    ext_info: {
      cca_id: string | null;
      last_light_expired_ts: number;
      last_light_id: string;
    };
    frame_bag_version: string;
    frame_expire_time: number;
    frame_fileid: string;
    frame_id: string;
    gender: string;
    huanxin_id: string;
    ip_city: string;
    ip_country: string;
    is_official_push_account: boolean;
    is_vip: boolean;
    last_pay_ts: number;
    // Add other necessary fields
  };
}
