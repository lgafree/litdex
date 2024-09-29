import { useParams } from "@remix-run/react";
import { useState, useEffect, Fragment } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getUser } from "~/lib/api";
import { escapeHtml, fetchImage } from "~/lib/utils";
import { FaMars, FaVenus } from 'react-icons/fa'; 

import InfoTab from "~/components/user/InfoTab";
import FeedTab from "~/components/user/FeedTab";
import MiscTab from "~/components/user/MiscTab";
import PartnerTab from "~/components/user/PartnerTab";
import TransactionsTab from "~/components/user/TransactionsTab";

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
    <div className="h-screen flex flex-col">
      {/*header*/}
      <div className="h-1/6 relative mb-20">
        {/* cover photo */}
        <Fragment>
        {user.cover_photo ? (
          <div className="w-full h-full bg-gray-300 cursor-pointer" onClick={() => openFullscreen(`${BASE_IMAGE_URL}/${user.cover_photo}`)}>
            <img 
              src={`${BASE_IMAGE_URL}/${user.cover_photo}`} 
              alt="Cover" 
              className="w-full h-full object-cover cursor-pointer" 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Add your click handler function here
                }
              }}
            />
          </div>
        ) : (
          <div 
            className="w-full h-full bg-gray-300 cursor-pointer" 
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // Add your click handler function here
              }
            }}
          />
        )}
        </Fragment>
        {/* cover photo */}

        {/* avatar */}
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <div className="w-36 h-36 bg-white rounded-full border-4 border-white overflow-hidden cursor-pointer" onClick={() => openFullscreen(avatar)}>
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

      <div className="h-5/6 bg-dark">
        <div className="mb-6 px-4">
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
                dangerouslySetInnerHTML={{
                  __html: user.bio.replace(
                    /@\(name:(.*?),id:(.*?)\)/g,
                    (_, name, id) => `<a href="/user/${id}" class="text-blue-500 hover:underline font-semibold">${name}</a>`
                  )
                }}
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

        <Card className="rounded-b-none rounded-t-xl h-full">
          <CardContent className="p-0">
            <Tabs defaultValue="info" className="w-full ">
              <TabsList className="flex w-full rounded-b-none ps-5 overflow-x-auto">
                <TabsTrigger value="info" className="flex-shrink-0">Info</TabsTrigger>
                <TabsTrigger value="feed" className="flex-shrink-0">Feed</TabsTrigger>
                <TabsTrigger value="misc" className="flex-shrink-0">Misc</TabsTrigger>
                <TabsTrigger value="partner" className="flex-shrink-0">Partner</TabsTrigger>
                <TabsTrigger value="transactions" className="flex-shrink-0">Transactions</TabsTrigger>
              </TabsList>
              <TabsContent value="info"><InfoTab user={user} /></TabsContent>
              <TabsContent value="feed"><FeedTab /></TabsContent>
              <TabsContent value="misc"><MiscTab user={user} openFullscreen={openFullscreen} /></TabsContent>
              <TabsContent value="partner"><PartnerTab /></TabsContent>
              <TabsContent value="transactions"><TransactionsTab user={user} /></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
}