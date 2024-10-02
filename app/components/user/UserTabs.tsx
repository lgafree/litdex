import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import Info from "~/components/user/Tabs/Info";
import Feed from "~/components/user/Tabs/Feed";
import Misc from "~/components/user/Tabs/Misc";
import Partner from "~/components/user/Tabs/Partner";

interface UserTabsProps {
  user: any;
  userId: string | undefined;
  openFullscreen: (imageUrl: string) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ user, userId, openFullscreen }) => {
  return (
    <Card className="rounded-b-none rounded-t-xl flex-grow flex flex-col overflow-hidden">
      <CardContent className="p-0 flex-grow flex flex-col overflow-hidden">
        <Tabs defaultValue="info" className="w-full h-full flex flex-col">
          <TabsList className="flex w-full rounded-b-none ps-5 overflow-x-auto flex-shrink-0">
            <TabsTrigger value="info" className="flex-shrink-0">Info</TabsTrigger>
            <TabsTrigger value="feed" className="flex-shrink-0">Feed</TabsTrigger>
            <TabsTrigger value="misc" className="flex-shrink-0">Misc</TabsTrigger>
            <TabsTrigger value="partner" className="flex-shrink-0">Partner</TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-y-auto">
            <TabsContent value="info" className="h-full"><Info user={user} /></TabsContent>
            <TabsContent value="feed" className="h-full"><Feed userId={userId} openFullscreen={openFullscreen} /></TabsContent>
            <TabsContent value="misc" className="h-full"><Misc user={user} openFullscreen={openFullscreen} /></TabsContent>
            <TabsContent value="partner" className="h-full"><Partner /></TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserTabs;
