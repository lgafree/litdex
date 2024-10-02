import { useParams } from "@remix-run/react";
import { useState, useEffect, Fragment } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getUser } from "~/lib/api";
import { escapeHtml, fetchImage, processContent } from "~/lib/utils";
import { FaMars, FaVenus } from 'react-icons/fa'; 
import CoverPhoto from "~/components/user/CoverPhoto";

import UserTabs from "~/components/user/UserTabs";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState<string | null>(null);
  const BASE_IMAGE_URL = "https://baishan.ksztagent.com/api/sns/v1/lit/image";
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      const userData = await getUser(userId);
      setUser(userData);

      try {
        const imageUrl = `${BASE_IMAGE_URL}/${userData.avatar}`;
        const base64data = await fetchImage(imageUrl);
        setAvatar(base64data);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      {/*header*/}
      <div className="h-64 relative mb-20 flex-shrink-0">
        <CoverPhoto coverPhoto={user.cover_photo} baseImageUrl={BASE_IMAGE_URL} openFullscreen={openFullscreen}/>

        {/* avatar */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <div className="w-36 h-36 bg-white rounded-full border-2 border-white overflow-hidden cursor-pointer" onClick={() => openFullscreen(avatar)}>
            <img src={avatar} alt={`${user.name}'s avatar`} className="w-full h-full object-cover" />
          </div> 
        </div>
        {/* avatar */}

        {/* active_info */}
        {user.active_info && user.active_info.time_desc && (
          <Badge variant="secondary" className="absolute bottom-8 right-2">
            {user.active_info.time_desc}
          </Badge>
        )}
        {/* active_info */}
        
        {/* lit_id */}
        <Badge variant="secondary" className="absolute bottom-2 right-2">
          #{user.lit_id}
        </Badge>
        {/* lit_id */}
      </div>
      {/*header*/}

      <div className="flex-grow flex flex-col">
        <div className="mb-6 px-4 flex-shrink-0">
          {/* name age gender*/}
          <div className="mt-2">
            <span className="font-bold text-primary rounded" dangerouslySetInnerHTML={{ __html: escapeHtml(user.nickname || '') }}></span>
            <span className="gender-age-quote">
              {user.gender && (
                <div className="inline">
                  <span className={`ml-1.5 text-xs px-1 py-0.5 rounded-full ${
                    user.gender === 'girl' ? 'text-pink-500 bg-pink-100' : 'text-blue-500 bg-blue-100'
                  }`}>
                    {user.gender === 'girl' ? <FaVenus className="inline mr-1" /> : <FaMars className="inline mr-1" />}
                    {user.age}
                  </span>
                </div>
              )}
            </span>
          </div>
          {/* name age gender*/}
          {/* mood */}
          {user.mood_status_info && user.mood_status_info.is_show && (
            <div className="mt-1 text-xs">
              <img 
                src={`${BASE_IMAGE_URL}/${user.mood_status_info.icon}`} 
                alt="Mood icon" 
                className="w-4 h-4 object-cover cursor-pointer inline-block mr-1" 
                onClick={() => {/* Add your click handler function here */}}
              />
              <span className="mr-1">{user.mood_status_info.mood_name}</span>
            </div>
          )}
          {/* mood */}

          {/* bio */}
          <div className="text-xs mb-2 pe-4">
            {user.bio && (
              <p
                className="user-bio"
                dangerouslySetInnerHTML={{ __html: processContent(user.bio) }}
              />
            )}
          </div>
          {/* bio */}
          {/* tags */}
          {user.tags && user.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {user.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag.tag_name}
                </Badge>
              ))}
            </div>
          )}
          {/* tags */}
        </div>

        <UserTabs user={user} userId={userId} openFullscreen={openFullscreen} />
      </div>

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
}