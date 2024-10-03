import { useParams } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { getRoom, getUser } from "~/lib/api";
import { escapeHtml, fetchImage, processContent } from "~/lib/utils";
import { Room } from "~/types/room";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export const loader: LoaderFunction = async ({ params }) => {
  return json({ roomId: params.roomId });
};

export default function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room>();
  const [avatar, setAvatar] = useState<string>("👤");
  const [recentChangeRule, setRecentChangeRule] = useState<string>();
  const [recentChangeName, setRecentChangeName] = useState<string>();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const BASE_IMAGE_URL = "https://baishan.ksztagent.com/api/sns/v1/lit/image";

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomId) {
        return;
      }

      const roomData = await getRoom(roomId);
      
      if (roomData && roomData.change_rules_user_id) {
        const recentChangeRuleData = await getUser(roomData.change_rules_user_id);
        setRecentChangeRule(recentChangeRuleData);
      }
      
      if (roomData && roomData.change_name_user_id) {
        const recentChangeNameData = await getUser(roomData.change_name_user_id);
        setRecentChangeName(recentChangeNameData);
      }

      setRoom(roomData);

      try {
        const imageUrl = `${BASE_IMAGE_URL}/${roomData.host.avatar}`;
        const base64data = await fetchImage(imageUrl);
        setAvatar(base64data);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="container mx-auto mt-16 p-4 space-y-4">
      {room ? (
        <Card>
          <CardHeader>
            <CardTitle><span dangerouslySetInnerHTML={{ __html: processContent(room.name) }}/></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <img 
                src={avatar} 
                alt="Host Avatar" 
                className="w-16 h-16 rounded-full cursor-pointer" 
                onClick={() => openFullscreen(avatar)}
              />
              <span className="font-bold text-primary rounded" dangerouslySetInnerHTML={{ __html: escapeHtml(room.host.nickname || '') }}></span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="flex flex-col space-y-2">
              <strong>Party Rules</strong>
              <span className="text-xs" dangerouslySetInnerHTML={{ __html: processContent(room.party_rule) }}/>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <strong>Recent Change Rules:</strong>
                {recentChangeRule ? (
                  <>
                    <img 
                      src={recentChangeRule.avatar ? `${BASE_IMAGE_URL}/${recentChangeRule.avatar}` : avatar} 
                      alt="Recent Change Rules Avatar" 
                      className="w-16 h-16 rounded-full cursor-pointer" 
                      onClick={() => openFullscreen(recentChangeRule.avatar ? `${BASE_IMAGE_URL}/${recentChangeRule.avatar}` : avatar)}
                    />
                    <span className="font-bold text-primary rounded" dangerouslySetInnerHTML={{ __html: escapeHtml(recentChangeRule.nickname || '') }}></span>
                  </>
                ) : (
                  <span>No recent changes</span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <strong>Recent Change Name:</strong>
                {recentChangeName ? (
                  <>
                    <img 
                      src={recentChangeName.avatar ? `${BASE_IMAGE_URL}/${recentChangeName.avatar}` : avatar} 
                      alt="Recent Change Name Avatar" 
                      className="w-16 h-16 rounded-full cursor-pointer" 
                      onClick={() => openFullscreen(recentChangeName.avatar ? `${BASE_IMAGE_URL}/${recentChangeName.avatar}` : avatar)}
                    />
                    <span className="font-bold text-primary rounded" dangerouslySetInnerHTML={{ __html: escapeHtml(recentChangeName.nickname || '') }}></span>
                  </>
                ) : (
                  <span>No recent changes</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>Loading room details...</p>
      )}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={closeFullscreen}
          onKeyDown={(e) => e.key === 'Escape' && closeFullscreen()}
          role="button"
          tabIndex={0}
        >
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
}
