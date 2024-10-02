import React, { Fragment } from 'react';
import { formatEpochToDateTime } from '~/lib/utils';

interface MiscTabProps {
  user: any; // Replace 'any' with a proper user type
  openFullscreen: (imageUrl: string) => void; // Add this line
}

const MiscTab: React.FC<MiscTabProps> = ({ user, openFullscreen }) => {
    const BASE_IMAGE_URL = "https://baishan.ksztagent.com/api/sns/v1/lit/image";
  return (
    <div className="p-4">
      <div className="grid gap-4 text-sm">
        <p><strong>Lit Admin: </strong> {user.admin === true ? 'Yes' : 'No'}</p>
        <p><strong>Lit Chatbot: </strong> {user.is_chat_bot === true ? 'Yes' : 'No'}</p>
        <p><strong>On Mic: </strong> {user.on_mic === true ? 'Yes' : 'No'}</p>
        <p><strong>Last Payment:</strong> {user.last_pay_ts ? formatEpochToDateTime(user.last_pay_ts) : 'Unknown'}</p>
        {/*mood*/}
        {user.mood_status_info && user.mood_status_info.is_show && (
        <Fragment>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <h3 className="text-lg font-semibold mb-2">Mood</h3>
            <p><strong>Mood: </strong>
            <img 
                src={`${BASE_IMAGE_URL}/${user.mood_status_info.icon}`} 
                alt="Mood icon" 
                className="w-4 h-4 object-cover cursor-pointer inline-block mr-1" 
                onClick={() => {/* Add your click handler function here */}}
              />
            <span className="mr-1">{user.mood_status_info.mood_name}</span></p>
            <p><strong>Expiry: </strong> <span>{formatEpochToDateTime(user.mood_status_info.expire_time)}</span></p>
        </Fragment>
        )}
        {/*mood*/}

        {/* frame */}
        {user.frame_id && (
            <Fragment>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <h3 className="text-lg font-semibold mb-2">Frame</h3>
                <div className="w-fit h-fit cursor-pointer" onClick={() => openFullscreen(`${BASE_IMAGE_URL}/${user.frame_fileid}`)}>
                <img 
                    src={`${BASE_IMAGE_URL}/${user.frame_fileid}`} 
                    alt="Frame" 
                    className="max-w-20 h-auto object-contain cursor-pointer" 
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        openFullscreen(`${BASE_IMAGE_URL}/${user.frame_fileid}`);
                    }
                    }}
                />
                </div>
                <p><strong>Expiry:</strong> {formatEpochToDateTime(user.frame_expire_time)}</p>
            </Fragment>
        )}
        {/* frame */}

        {/* vip */}
        {user.is_vip && (
            <Fragment>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <h3 className="text-lg font-semibold mb-2">VIP</h3>
                <p><strong>Level: </strong> {user.vip_info.level}</p>
                <p><strong>Status Visibility: </strong> {user.vip_info.show_vip_status === true ? 'Visible' : 'Hidden'}</p>
                <p><strong>Expiry:</strong> {formatEpochToDateTime(user.vip_info.expire_time)}</p>
                <p><strong>Checkpoint Expiry:</strong> {formatEpochToDateTime(user.vip_info.expire_time_checkpoint)}</p>
                <p><strong>Lvl Maintain Remaining: </strong> {formatEpochToDateTime(user.vip_info.level_maintain_review_time)}</p>
            </Fragment>
        )}
        {/* vip */}
      </div>
    </div>
  );
};

export default MiscTab;
